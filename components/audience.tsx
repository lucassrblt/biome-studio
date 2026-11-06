import {
  Utensils,
  Hammer,
  Store,
  Scissors,
  Croissant,
  Coffee,
  ShoppingBag,
  Sparkles,
  Leaf,
  type LucideIcon,
} from "lucide-react";
import { Marquee } from "@/components/marquee";
import { audiences } from "@/lib/content";

/** Picto associé à chaque type de commerce (même ordre que lib/content.ts). */
const icons: LucideIcon[] = [
  Utensils, // Restaurants
  Hammer, // Artisans
  Store, // Commerces
  Scissors, // Coiffeurs & barbiers
  Croissant, // Boulangeries
  Coffee, // Cafés & Bars
  ShoppingBag, // Boutiques
  Sparkles, // Bien-être
  Leaf, // Produits locaux
];

/**
 * Bandeau « Pour qui » : bloc foncé avec un marquee des types de commerces qui
 * défile, chacun précédé de son picto. Casse le rythme entre hero et offres.
 */
export function Audience() {
  const items = audiences.map((label, i) => {
    const Icon = icons[i] ?? Store;
    return (
      <span key={label} className="inline-flex items-center gap-4">
        <Icon className="size-7 text-accent sm:size-8" strokeWidth={1.75} />
        {label}
      </span>
    );
  });

  return (
    <section
      aria-label="Pour qui"
      className="overflow-hidden border-y border-border bg-foreground py-7 text-background sm:py-8 [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]"
    >
      <Marquee
        items={items}
        className="inline-flex items-center font-display text-3xl font-extrabold uppercase tracking-tight sm:text-4xl"
      />
    </section>
  );
}
