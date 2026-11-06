import type { Metadata } from "next";
import Link from "next/link";
import { CircleCheck } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { LandingHeader } from "@/components/landing-header";
import { SiteFooter } from "@/components/site-footer";
import { BookingButton } from "@/components/booking-button";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { resolveBookingEvent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Demande d'audit envoyée",
  description: "Votre demande d'audit gratuit de fiche Google a bien été envoyée.",
  alternates: { canonical: "/audit-gratuit/merci" },
  robots: { index: false, follow: true },
};

/** Confirmation après l'envoi du formulaire d'audit (noindex, hors sitemap). */
export default function AuditMerciPage() {
  const event = resolveBookingEvent("audit");
  return (
    <>
      <LandingHeader />
      <main className="flex-1">
        <section className="px-6 pt-16 pb-24 sm:pt-24 sm:pb-32">
          <div className="mx-auto max-w-2xl">
            <Reveal>
              <span className="inline-flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <CircleCheck className="size-6" />
              </span>
              <h1 className="mt-6 font-display text-[clamp(2.2rem,5vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight text-balance">
                Merci, c&apos;est bien reçu !
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                Je regarde votre fiche Google et je reviens vers vous par email
                avec mes recommandations. Pensez à vérifier vos courriers
                indésirables si vous ne voyez rien arriver.
              </p>
              <p className="mt-8 font-semibold">
                Vous préférez en parler de vive voix ?
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{event.note}</p>
              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
                <BookingButton
                  event="audit"
                  className={cn(
                    buttonVariants(),
                    "h-auto min-h-12 rounded-full bg-primary px-7 py-2.5 text-center text-base font-bold whitespace-normal text-primary-foreground shadow-soft hover:bg-primary",
                  )}
                />
                <Link
                  href="/"
                  className="text-sm font-semibold text-foreground/70 underline-offset-4 transition-colors hover:text-foreground hover:underline"
                >
                  Retour à l&apos;accueil
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
