"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  isHoneypotFilled,
  isTooFast,
  sendAuditEmail,
  takeRateLimit,
  validateAudit,
} from "@/lib/audit";
import type { AuditState } from "@/lib/audit-shared";
import { site } from "@/lib/content";

/**
 * Server Action du formulaire « Audit gratuit » (endpoint public : tout est
 * revalidé ici, rien n'est supposé côté client).
 * Succès → redirection vers /audit-gratuit/merci.
 */
export async function submitAudit(
  _prev: AuditState,
  formData: FormData,
): Promise<AuditState> {
  // Robot (honeypot rempli) : on fait comme si tout allait bien, sans envoyer.
  if (isHoneypotFilled(formData)) {
    redirect("/audit-gratuit/merci");
  }

  const result = validateAudit(formData);
  if (!result.ok) {
    return {
      status: "error",
      message: "Certains champs sont à corriger.",
      fieldErrors: result.errors,
      values: result.values,
      consent: formData.get("consent") === "on",
    };
  }

  if (isTooFast(formData)) {
    return {
      status: "error",
      message:
        "Le formulaire a été envoyé un peu trop vite. Patientez quelques secondes puis réessayez.",
      values: result.data,
      consent: true,
    };
  }

  const h = await headers();
  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "inconnue";
  if (!takeRateLimit(ip)) {
    return {
      status: "error",
      message: `Vous avez déjà envoyé plusieurs demandes. Réessayez dans une heure ou écrivez-moi à ${site.email}.`,
      values: result.data,
      consent: true,
    };
  }

  const sent = await sendAuditEmail(result.data);
  if (!sent.ok) {
    return {
      status: "error",
      message: `L'envoi n'a pas pu aboutir. Réessayez plus tard ou écrivez-moi directement à ${site.email}.`,
      values: result.data,
      consent: true,
    };
  }

  redirect("/audit-gratuit/merci");
}
