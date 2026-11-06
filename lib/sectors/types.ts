import type { FaqItem } from "@/lib/content";

/**
 * Configuration d'une page secteur (route /[secteur]). Une page = un fichier
 * de config dans lib/sectors/ + une entrée dans lib/sectors/index.ts : la
 * route, le sitemap et le lien du pied de page suivent automatiquement.
 */
export type SectorConfig = {
  /** Segment d'URL (/<slug>), porteur du mot-clé. */
  slug: string;
  /** Libellé court pour les liens internes (pied de page). */
  navLabel: string;
  /** <title> (le template « — Biome » est ajouté automatiquement). */
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  /** H1 unique de la page. */
  h1: string;
  intro: string;
  problemsTitle: string;
  problems: { title: string; text: string }[];
  changesTitle: string;
  changes: string[];
  /** Slug d'un exemple de lib/examples.ts mis en avant (optionnel). */
  exampleSlug?: string;
  exampleText?: string;
  /** FAQ propre à la page (schéma FAQPage). */
  faq: FaqItem[];
};
