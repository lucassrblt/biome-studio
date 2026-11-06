"use client";

import { useActionState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { submitAudit } from "@/app/audit-gratuit/actions";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HONEYPOT_FIELD, type AuditField, type AuditState } from "@/lib/audit-shared";

const initialState: AuditState = { status: "idle" };

const inputClass =
  "mt-1.5 block h-12 w-full rounded-xl border border-border bg-background px-4 text-base text-foreground shadow-soft outline-none transition-colors placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive";

type TextField = {
  name: Exclude<AuditField, "consent">;
  label: string;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  hint?: string;
  optional?: boolean;
};

const fields: TextField[] = [
  { name: "business", label: "Nom du commerce", autoComplete: "organization" },
  { name: "city", label: "Ville", autoComplete: "address-level2" },
  {
    name: "gbp",
    label: "Lien ou nom de votre fiche Google",
    placeholder: "https://maps.app.goo.gl/… ou « Nom du commerce, ville »",
    hint: "Le lien de partage de votre fiche, ou simplement le nom tel qu'il apparaît sur Google.",
  },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  { name: "phone", label: "Téléphone", type: "tel", autoComplete: "tel", optional: true },
];

/**
 * Formulaire « Audit gratuit » : Server Action + useActionState (erreurs par
 * champ, valeurs conservées). Anti-spam : champ piège invisible + horodatage
 * d'affichage (ajouté à l'envoi) contrôlés côté serveur.
 */
export function AuditForm() {
  const [state, formAction, pending] = useActionState(submitAudit, initialState);
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  function action(formData: FormData) {
    formData.set("startedAt", String(startedAt.current));
    formAction(formData);
  }

  const errors = state.fieldErrors ?? {};

  return (
    <form action={action} noValidate className="space-y-5">
      {fields.map((field) => {
        const error = errors[field.name];
        const describedBy = [
          field.hint ? `${field.name}-hint` : null,
          error ? `${field.name}-error` : null,
        ]
          .filter(Boolean)
          .join(" ");
        return (
          <div key={field.name}>
            <label htmlFor={field.name} className="text-sm font-semibold">
              {field.label}
              {field.optional ? (
                <span className="font-normal text-muted-foreground"> (facultatif)</span>
              ) : null}
            </label>
            <input
              id={field.name}
              name={field.name}
              type={field.type ?? "text"}
              autoComplete={field.autoComplete}
              placeholder={field.placeholder}
              required={!field.optional}
              defaultValue={state.values?.[field.name] ?? ""}
              aria-invalid={error ? true : undefined}
              aria-describedby={describedBy || undefined}
              className={inputClass}
            />
            {field.hint ? (
              <p id={`${field.name}-hint`} className="mt-1.5 text-xs text-muted-foreground">
                {field.hint}
              </p>
            ) : null}
            {error ? (
              <p id={`${field.name}-error`} className="mt-1.5 text-sm font-medium text-destructive">
                {error}
              </p>
            ) : null}
          </div>
        );
      })}

      {/* Champ piège : invisible et ignoré par les humains, rempli par les robots. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={HONEYPOT_FIELD}>Ne pas remplir ce champ</label>
        <input
          id={HONEYPOT_FIELD}
          name={HONEYPOT_FIELD}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
          <input
            type="checkbox"
            name="consent"
            required
            defaultChecked={state.consent ?? false}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            className="mt-1 size-4 shrink-0 accent-primary"
          />
          <span>
            J&apos;accepte que ces informations soient utilisées pour réaliser
            l&apos;audit et me recontacter à ce sujet. Détails dans la{" "}
            <Link href="/confidentialite" className="font-medium text-primary hover:underline">
              politique de confidentialité
            </Link>
            .
          </span>
        </label>
        {errors.consent ? (
          <p id="consent-error" className="mt-1.5 text-sm font-medium text-destructive">
            {errors.consent}
          </p>
        ) : null}
      </div>

      <p aria-live="polite" className="text-sm font-medium text-destructive empty:hidden">
        {state.status === "error" ? state.message : ""}
      </p>

      <button
        type="submit"
        disabled={pending}
        className={cn(
          buttonVariants(),
          "h-auto min-h-12 w-full rounded-full bg-primary px-7 py-2.5 text-base font-bold whitespace-normal text-primary-foreground shadow-soft hover:bg-primary sm:w-auto",
        )}
      >
        {pending ? (
          <>
            <LoaderCircle className="size-5 animate-spin" />
            Envoi en cours…
          </>
        ) : (
          <>
            Recevoir mon audit gratuit
            <ArrowRight className="size-5" />
          </>
        )}
      </button>
    </form>
  );
}
