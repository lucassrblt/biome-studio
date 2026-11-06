import Link from "next/link";
import { ArrowRight, Check, KeyRound } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { Section } from "@/components/section";
import { BadgeSticker } from "@/components/badge-sticker";
import { BookingButton } from "@/components/booking-button";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { subscription, paidOptions, includedAll, legal } from "@/lib/content";

/**
 * Section Tarifs : l'abonnement « Visibilité locale » au centre (carte teal
 * mise en avant), un bandeau « toujours compris », puis les options en paiement
 * unique, volontairement discrètes. Mention TVA sous les prix.
 */
export function Pricing() {
  return (
    <Section
      id="tarifs"
      eyebrow="Tarifs"
      title="Un abonnement simple, tout compris."
      lead="Une seule offre, pensée pour faire venir des clients : votre fiche Google, vos avis et votre site, pris en charge chaque mois."
      width="wide"
    >
      {/* Socle « toujours compris » */}
      <Reveal>
        <div className="mb-8 rounded-2xl border border-border bg-muted/50 p-5 sm:p-6">
          <p className="text-sm font-bold uppercase tracking-wide text-primary">
            Toujours compris
          </p>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-foreground/80">
            {includedAll.map((item) => (
              <li key={item} className="inline-flex items-center gap-1.5">
                <Check className="size-4 shrink-0 text-primary" strokeWidth={3} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* Offre principale */}
      <Reveal>
        <div className="relative mx-auto max-w-3xl rounded-2xl bg-primary p-6 text-primary-foreground shadow-soft-lg sm:p-10">
          <BadgeSticker
            tone="ink"
            className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px]"
          >
            L&apos;offre
          </BadgeSticker>

          <div className="grid gap-8 md:grid-cols-[1fr_1.25fr]">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wide">
                {subscription.name}
              </h3>
              <p className="mt-1 text-sm text-primary-foreground/80">
                {subscription.tagline}
              </p>
              <p className="mt-4 font-display text-5xl font-extrabold tracking-tight">
                {subscription.price}
                <span className="text-xl font-bold">{subscription.period}</span>
              </p>
              <ul className="mt-4 space-y-1.5 text-sm text-primary-foreground/90">
                {subscription.setup.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <p className="mt-2 text-xs text-primary-foreground/70">
                {subscription.afterCommitment}
              </p>

              <div className="mt-8 flex flex-col gap-3">
                <Link
                  href="/audit-gratuit"
                  className={cn(
                    buttonVariants(),
                    "h-auto min-h-11 rounded-full bg-background px-5 py-2.5 text-center text-sm font-bold whitespace-normal text-foreground hover:bg-background",
                  )}
                >
                  Demander l&apos;audit gratuit
                  <ArrowRight className="size-4" />
                </Link>
                <BookingButton className="text-center text-sm font-semibold text-primary-foreground/85 underline-offset-4 transition-colors hover:text-primary-foreground hover:underline" />
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-primary-foreground/80">
                Inclus chaque mois
              </p>
              <ul className="mt-3 space-y-3 text-sm text-primary-foreground/90">
                {subscription.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-primary-foreground"
                      strokeWidth={3}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              <p className="mt-6 flex items-start gap-2.5 rounded-xl bg-primary-foreground/10 p-3 text-sm font-semibold">
                <KeyRound className="mt-0.5 size-4 shrink-0" strokeWidth={2.5} />
                {subscription.ownership}
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Options en paiement unique — discrètes */}
      <div className="mx-auto mt-10 max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
          Besoin de plus ? Options en paiement unique
        </p>
        <RevealGroup className="mt-3 grid gap-3 sm:grid-cols-2">
          {paidOptions.map((option) => (
            <RevealItem key={option.name} className="h-full">
              <div className="flex h-full items-start justify-between gap-4 rounded-xl border border-border bg-card px-4 py-3">
                <div>
                  <p className="text-sm font-bold">{option.name}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                    {option.description}
                  </p>
                </div>
                <p className="shrink-0 text-sm font-semibold text-foreground/80">
                  {option.price}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
        <p className="mt-4 text-xs text-muted-foreground">{legal.vatNote}</p>
      </div>
    </Section>
  );
}
