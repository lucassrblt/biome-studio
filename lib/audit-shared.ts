/**
 * Types et constantes du formulaire « Audit gratuit » partagés entre le
 * composant client (<AuditForm>) et la logique serveur (lib/audit.ts).
 * Aucun secret ici : ce fichier est inclus dans le bundle navigateur.
 */

export const AUDIT_FIELDS = ["business", "city", "gbp", "email", "phone", "consent"] as const;
export type AuditField = (typeof AUDIT_FIELDS)[number];

export type AuditRequest = {
  business: string;
  city: string;
  gbp: string;
  email: string;
  phone: string;
};

export type AuditState = {
  status: "idle" | "error";
  message?: string;
  fieldErrors?: Partial<Record<AuditField, string>>;
  /** Valeurs saisies, renvoyées pour pré-remplir le formulaire après une erreur. */
  values?: Partial<Record<Exclude<AuditField, "consent">, string>>;
};

/** Nom du champ piège (invisible pour un humain, rempli par les robots). */
export const HONEYPOT_FIELD = "website";
/** Délai minimal (ms) entre l'affichage du formulaire et l'envoi. */
export const MIN_FILL_MS = 3000;
