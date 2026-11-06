import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectorPage } from "@/components/sector-page";
import { sectors, getSector } from "@/lib/sectors";

type PageProps = { params: Promise<{ secteur: string }> };

/**
 * Pages secteur à la racine (/coiffeurs-barbiers…). Seuls les slugs déclarés
 * dans lib/sectors sont générés ; tout autre segment → 404 (dynamicParams =
 * false). Les routes statiques (/audit-gratuit, /cgv, /sitemap.xml…) restent
 * prioritaires sur ce segment dynamique.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return sectors.map((sector) => ({ secteur: sector.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { secteur } = await params;
  const sector = getSector(secteur);
  if (!sector) return {};
  const path = `/${sector.slug}`;
  return {
    title: sector.metaTitle,
    description: sector.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      title: `${sector.metaTitle} — Biome`,
      description: sector.metaDescription,
      url: path,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${sector.metaTitle} — Biome`,
      description: sector.metaDescription,
    },
  };
}

export default async function SecteurPage({ params }: PageProps) {
  const { secteur } = await params;
  const sector = getSector(secteur);
  if (!sector) notFound();
  return <SectorPage sector={sector} />;
}
