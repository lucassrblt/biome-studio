import Link from "next/link";
import { Mail, CalendarCheck, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { BookingButton } from "@/components/booking-button";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { contact, resolveBookingEvent, site } from "@/lib/content";

/**
 * Section Contact : bloc teal foncé arrondi avec forme organique en fond,
 * gros titre, CTA (magnétique) vers l'appel de 15 min, puis l'audit gratuit et
 * l'email en liens secondaires.
 */
export function Contact() {
  const intro = resolveBookingEvent("intro");
  return (
    <section id="contact" className="scroll-mt-24 px-6 pb-20 sm:pb-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-[#17403e] px-8 py-14 text-background sm:px-14 sm:py-16">
            {/* Forme organique en fond */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 size-72 rounded-[42%_58%_60%_40%/45%_45%_55%_55%] bg-primary/30"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-20 right-1/3 size-56 rounded-full bg-secondary/20 blur-2xl"
            />

            <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-accent">
                  <span aria-hidden className="h-px w-6 bg-current" />
                  Contact
                </p>
                <h2 className="max-w-xl font-display text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-[1.05] tracking-tight">
                  {contact.title}
                </h2>
                <p className="mt-4 max-w-md leading-relaxed text-background/75">
                  {contact.subtitle}
                </p>

                <div className="mt-8 flex flex-col gap-4">
                  <BookingButton
                    magnetic
                    className={cn(
                      buttonVariants(),
                      "h-auto min-h-12 self-start rounded-full bg-background px-7 py-2.5 text-base font-bold whitespace-normal text-foreground shadow-soft-lg hover:bg-background",
                    )}
                  >
                    <CalendarCheck className="size-5" />
                    {intro.label}
                  </BookingButton>
                  <p className="text-sm text-background/60">{intro.note}</p>
                </div>
              </div>

              <ul className="flex flex-col gap-3 text-sm font-semibold lg:items-end">
                <li>
                  <Link
                    href="/audit-gratuit"
                    className="inline-flex items-center gap-2 text-background/85 transition-colors hover:text-background"
                  >
                    <ArrowRight className="size-4" strokeWidth={2} />
                    Demander l&apos;audit gratuit de ma fiche Google
                  </Link>
                </li>
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="inline-flex items-center gap-2 text-background/85 transition-colors hover:text-background"
                  >
                    <Mail className="size-4" strokeWidth={2} />
                    {site.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
