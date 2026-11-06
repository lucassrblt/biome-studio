import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { LandingHeader } from "@/components/landing-header";
import { SiteFooter } from "@/components/site-footer";
import { AuditForm } from "@/components/audit-form";
import { auditPage } from "@/lib/content";

const path = "/audit-gratuit";

export const metadata: Metadata = {
  title: auditPage.metaTitle,
  description: auditPage.metaDescription,
  alternates: { canonical: path },
  openGraph: {
    title: `${auditPage.metaTitle} — Biome`,
    description: auditPage.metaDescription,
    url: path,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${auditPage.metaTitle} — Biome`,
    description: auditPage.metaDescription,
  },
};

/**
 * Page « Audit gratuit » (lien des emails de prospection) : promesse + ce que
 * contient l'audit, et le formulaire (Server Action → email via Resend).
 */
export default function AuditGratuitPage() {
  return (
    <>
      <LandingHeader />
      <main className="flex-1">
        <section className="px-6 pt-16 pb-24 sm:pt-24 sm:pb-32">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
            <Reveal>
              <p className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                <span aria-hidden className="h-px w-6 bg-current" />
                {auditPage.eyebrow}
              </p>
              <h1 className="font-display text-[clamp(2.2rem,5vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight text-balance">
                {auditPage.h1}
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
                {auditPage.intro}
              </p>

              <p className="mt-8 text-sm font-bold uppercase tracking-wide text-primary">
                Ce que je regarde
              </p>
              <ul className="mt-3 space-y-3 text-foreground/80">
                {auditPage.checks.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-muted-foreground">{auditPage.reassurance}</p>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="relative rounded-2xl border border-border bg-card p-6 shadow-soft-lg sm:p-8">
                <h2 className="font-display text-2xl font-extrabold tracking-tight">
                  Demander mon audit
                </h2>
                <p className="mt-1 mb-6 text-sm text-muted-foreground">
                  Quelques informations suffisent.
                </p>
                <AuditForm />
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
