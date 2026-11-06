import type { Metadata } from "next";
import type { ComponentType } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/reveal";
import { LandingHeader } from "@/components/landing-header";
import { Faq } from "@/components/faq";
import { SiteFooter } from "@/components/site-footer";
import { Offers } from "@/components/offers";
import { Pricing } from "@/components/pricing";
import { Process } from "@/components/process";
import { Guarantees } from "@/components/guarantees";
import { Projects } from "@/components/projects";
import { Contact } from "@/components/contact";
import { About } from "@/components/about";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { landingPages, hero, type LandingSection } from "@/lib/content";

/** Sections du one-page réutilisables, indexées par clé. */
const sectionComponents: Record<LandingSection, ComponentType> = {
  offers: Offers,
  pricing: Pricing,
  process: Process,
  guarantees: Guarantees,
  projects: Projects,
  about: About,
};

type PageProps = { params: Promise<{ slug: string }> };

/** Génère une page statique par landing page connue. */
export function generateStaticParams() {
  return landingPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = landingPages.find((p) => p.slug === slug);
  if (!page) return {};

  const path = `/offres/${page.slug}`;
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      title: `${page.metaTitle} — Biome`,
      description: page.metaDescription,
      url: path,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${page.metaTitle} — Biome`,
      description: page.metaDescription,
    },
  };
}

export default async function LandingPage({ params }: PageProps) {
  const { slug } = await params;
  const page = landingPages.find((p) => p.slug === slug);
  if (!page) notFound();

  return (
    <>
      <LandingHeader />
      <main className="flex-1">
        {/* Hero propre à la page : eyebrow + H1 + intro UNIQUES (porteurs du
            mot-clé et garants d'un contenu non dupliqué). */}
        <section className="px-6 pt-16 pb-4 sm:pt-24">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <p className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                <span aria-hidden className="h-px w-6 bg-current" />
                {page.eyebrow}
              </p>
              <h1 className="font-display text-[clamp(2.2rem,5vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight text-balance">
                {page.h1}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                {page.intro}
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
                <Link
                  href="/"
                  className="text-sm font-semibold text-foreground/70 underline-offset-4 transition-colors hover:text-foreground hover:underline"
                >
                  Découvrir Biome
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Sections du one-page réutilisées, dans l'ordre choisi pour la page. */}
        {page.sections.map((key) => {
          const SectionComponent = sectionComponents[key];
          return <SectionComponent key={key} />;
        })}

        <Faq items={page.faq} />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
