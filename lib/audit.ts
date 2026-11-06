/**
 * Logique serveur du formulaire « Audit gratuit » : validation, anti-spam
 * (honeypot + temps minimal + limitation par IP) et envoi de l'email via
 * l'API HTTP de Resend (pas de dépendance). Importé uniquement par la Server
 * Action (app/audit-gratuit/actions.ts) : rien ici n'est envoyé au navigateur.
 *
 * Variables d'environnement (cf. docs/env.md) :
 * - RESEND_API_KEY   clé API Resend
 * - AUDIT_TO_EMAIL   destinataire des demandes (jamais exposé au client)
 * - AUDIT_FROM_EMAIL expéditeur (optionnel, défaut ci-dessous)
 */

import "server-only";
import {
  HONEYPOT_FIELD,
  MIN_FILL_MS,
  type AuditField,
  type AuditRequest,
  type AuditState,
} from "@/lib/audit-shared";

const DEFAULT_FROM = "Biome Studio <onboarding@resend.dev>";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+0-9 ().-]{6,25}$/;

function text(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

/** Valide les champs ; renvoie soit la demande propre, soit les erreurs par champ. */
export function validateAudit(formData: FormData):
  | { ok: true; data: AuditRequest }
  | { ok: false; errors: Partial<Record<AuditField, string>>; values: AuditState["values"] } {
  const data: AuditRequest = {
    business: text(formData, "business"),
    city: text(formData, "city"),
    gbp: text(formData, "gbp"),
    email: text(formData, "email"),
    phone: text(formData, "phone"),
  };
  const errors: Partial<Record<AuditField, string>> = {};

  if (data.business.length < 2) errors.business = "Indiquez le nom de votre commerce.";
  else if (data.business.length > 120) errors.business = "120 caractères maximum.";

  if (data.city.length < 2) errors.city = "Indiquez la ville de votre commerce.";
  else if (data.city.length > 80) errors.city = "80 caractères maximum.";

  if (data.gbp.length < 2) errors.gbp = "Indiquez le lien ou le nom de votre fiche Google.";
  else if (data.gbp.length > 300) errors.gbp = "300 caractères maximum.";

  if (!data.email) errors.email = "Indiquez votre adresse email.";
  else if (data.email.length > 200 || !EMAIL_RE.test(data.email))
    errors.email = "Cette adresse email ne semble pas valide.";

  if (data.phone && !PHONE_RE.test(data.phone))
    errors.phone = "Ce numéro de téléphone ne semble pas valide.";

  if (formData.get("consent") !== "on")
    errors.consent = "Merci d'accepter l'utilisation de vos données pour réaliser l'audit.";

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors, values: { ...data } };
  }
  return { ok: true, data };
}

/** Vrai si l'envoi ressemble à un robot (honeypot rempli). */
export function isHoneypotFilled(formData: FormData) {
  return text(formData, HONEYPOT_FIELD) !== "";
}

/** Vrai si le formulaire a été envoyé trop vite (ou sans horodatage). */
export function isTooFast(formData: FormData, now = Date.now()) {
  const startedAt = Number(text(formData, "startedAt"));
  if (!Number.isFinite(startedAt) || startedAt <= 0) return true;
  return now - startedAt < MIN_FILL_MS;
}

/* ------------------------------------------------------------------ *
 * Limitation basique : 3 envois / heure / IP, en mémoire.
 * Volontairement simple : la mémoire est propre à chaque instance serveur
 * (et remise à zéro à chaque redémarrage) — suffisant contre les abus légers.
 * ------------------------------------------------------------------ */
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 60 * 60 * 1000;
const hits = new Map<string, number[]>();

/** Enregistre une tentative ; renvoie false si la limite est atteinte. */
export function takeRateLimit(ip: string, now = Date.now()) {
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    hits.set(ip, recent);
    return false;
  }
  recent.push(now);
  hits.set(ip, recent);
  // Ménage pour éviter que la Map grossisse indéfiniment.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key);
    }
  }
  return true;
}

/** Échappe le HTML (contenu saisi par l'utilisateur injecté dans l'email). */
export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildEmail(data: AuditRequest) {
  const rows: [string, string][] = [
    ["Commerce", data.business],
    ["Ville", data.city],
    ["Fiche Google", data.gbp],
    ["Email", data.email],
    ["Téléphone", data.phone || "—"],
  ];
  const subject = `Demande d'audit gratuit — ${data.business} (${data.city})`.replace(/[\r\n]+/g, " ");
  const html = `<h2>Nouvelle demande d'audit gratuit</h2><table cellpadding="6" style="border-collapse:collapse">${rows
    .map(
      ([label, value]) =>
        `<tr><td style="font-weight:bold;vertical-align:top">${escapeHtml(label)}</td><td>${escapeHtml(value)}</td></tr>`,
    )
    .join("")}</table><p>Répondre à cet email écrit directement au prospect.</p>`;
  const textBody = `Nouvelle demande d'audit gratuit\n\n${rows
    .map(([label, value]) => `${label} : ${value}`)
    .join("\n")}\n`;
  return { subject, html, text: textBody };
}

/**
 * Envoie la demande par email. Sans configuration : en développement, log +
 * succès simulé ; en production, échec (le formulaire affiche une erreur propre).
 */
export async function sendAuditEmail(data: AuditRequest): Promise<{ ok: boolean }> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.AUDIT_TO_EMAIL;
  const from = process.env.AUDIT_FROM_EMAIL || DEFAULT_FROM;
  const email = buildEmail(data);

  if (!apiKey || !to) {
    if (process.env.NODE_ENV !== "production") {
      console.info(
        "[audit-gratuit] RESEND_API_KEY ou AUDIT_TO_EMAIL absent — envoi simulé (dev).",
        { subject: email.subject, replyTo: data.email, text: email.text },
      );
      return { ok: true };
    }
    console.error("[audit-gratuit] RESEND_API_KEY ou AUDIT_TO_EMAIL manquant en production.");
    return { ok: false };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject: email.subject,
        html: email.html,
        text: email.text,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error("[audit-gratuit] Resend a répondu", res.status, await res.text());
      return { ok: false };
    }
    return { ok: true };
  } catch (error) {
    console.error("[audit-gratuit] échec de l'appel Resend", error);
    return { ok: false };
  }
}
