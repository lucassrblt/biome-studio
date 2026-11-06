import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExampleSite } from "@/components/example-site";
import { examples, getExample } from "@/lib/examples";

type PageProps = { params: Promise<{ slug: string }> };

/** Une page statique par exemple ; tout autre slug → 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return examples.map((example) => ({ slug: example.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const example = getExample(slug);
  if (!example) return {};
  const title = `${example.name} — exemple de site (${example.sector.toLowerCase()} fictif)`;
  const description = `Exemple de site vitrine d'une page réalisé par Biome pour un commerce fictif (${example.sector.toLowerCase()}) : ce que comprend l'abonnement Visibilité locale.`;
  return {
    title,
    description,
    alternates: { canonical: `/exemples/${example.slug}` },
    robots: { index: false, follow: true },
    openGraph: { title, description, url: `/exemples/${example.slug}`, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ExamplePage({ params }: PageProps) {
  const { slug } = await params;
  const example = getExample(slug);
  if (!example) notFound();
  return <ExampleSite data={example} />;
}
