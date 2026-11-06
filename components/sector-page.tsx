import Link from "next/link";
import { Check, CircleAlert } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";
import { Section } from "@/components/section";
import { LandingHeader } from "@/components/landing-header";
import { SiteFooter } from "@/components/site-footer";
import { ProjectCard } from "@/components/project-card";
import { Pricing } from "@/components/pricing";
import { Faq } from "@/components/faq";
import { Contact } from "@/components/contact";
import { BookingButton } from "@/components/booking-button";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { hero, projects } from "@/lib/content";
import type { SectorConfig } from "@/lib/sectors";

/**
 * Page secteur pilotée par données (lib/sectors/*) : hero (H1 unique),
 * problèmes typiques du métier, ce que l'abonnement change + exemple de
 * réalisation, tarifs, FAQ propre, contact. Réutilise les sections du site.
 */
export function SectorPage({ sector }: { sector: SectorConfig }) {
  const example = sector.exampleSlug
    ? projects.find((p) => p.href === `/exemples/${sector.exampleSlug}`)
    : undefined;

  return (
    <>
      <LandingHeader />
      <main className="flex-1">
        <section className="px-6 pt-16 pb-4 sm:pt-24">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <p className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                <span aria-hidden className="h-px w-6 bg-current" />
                {sector.eyebrow}
              </p>
              <h1 className="font-display text-[clamp(2.2rem,5vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight text-balance">
                {sector.h1}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                {sector.intro}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Link
                  href={hero.ctaPrimary.href}
                  className={cn(
                    buttonVariants(),
                    "h-auto min-h-12 rounded-full bg-primary px-7 py-2.5 text-center text-base font-bold whitespace-normal text-primary-foreground shadow-soft hover:bg-primary",
                  )}
                >
                  {hero.ctaPrimary.label}
                </Link>
                <BookingButton className="text-sm font-semibold text-foreground/70 underline-offset-4 transition-colors hover:text-foreground hover:underline" />
              </div>
            </Reveal>
          </div>
        </section>

        <Section eyebrow="Le constat" title={sector.problemsTitle} width="wide">
          <RevealGroup className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {sector.problems.map((problem) => (
              <RevealItem key={problem.title} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-soft">
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-accent text-foreground">
                    <CircleAlert className="size-5" strokeWidth={2} />
                  </span>
                  <h3 className="mt-4 text-base font-bold tracking-tight">{problem.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {problem.text}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Section>

        <Section eyebrow="La solution" title={sector.changesTitle} width="wide">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <Reveal>
              <ul className="space-y-4 text-foreground/80">
                {sector.changes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            {example ? (
              <Reveal delay={0.08}>
                <ProjectCard project={example} />
                {sector.exampleText ? (
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {sector.exampleText}
                  </p>
                ) : null}
              </Reveal>
            ) : null}
          </div>
        </Section>

        <Pricing />
        <Faq items={sector.faq} />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
