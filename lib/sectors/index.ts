import { coiffeursBarbiers } from "@/lib/sectors/coiffeurs-barbiers";
import type { SectorConfig } from "@/lib/sectors/types";

export type { SectorConfig } from "@/lib/sectors/types";

/** Toutes les pages secteur (route /[secteur], sitemap, pied de page). */
export const sectors: SectorConfig[] = [coiffeursBarbiers];

export function getSector(slug: string) {
  return sectors.find((sector) => sector.slug === slug);
}
