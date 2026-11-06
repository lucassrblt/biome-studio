import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/lib/content";

/**
 * Header allégé pour les landing pages SEO (/offres/[slug] et pages autonomes).
 * Pas de nav scroll-spy (les ancres #offres, #tarifs… n'existent pas hors du
 * one-page) : juste le logo qui ramène à l'accueil + le CTA audit gratuit.
 */
export function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          aria-label={`${site.name} — accueil`}
          className="transition-opacity hover:opacity-70"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/biome.svg" alt={site.name} className="block h-18 w-auto" />
        </Link>

        <Link
          href="/audit-gratuit"
          className={cn(
            buttonVariants(),
            "h-10 rounded-full bg-primary px-5 text-sm font-bold text-primary-foreground shadow-soft hover:bg-primary",
          )}
        >
          Audit gratuit
        </Link>
      </div>
    </header>
  );
}
