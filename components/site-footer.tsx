import Link from "next/link";
import { site, landingPages, legalLinks } from "@/lib/content";

/**
 * Footer « biome » : wordmark, liens vers les landing pages SEO (présents sur
 * tout le site → maillage interne qui les rend crawlables), liens légaux,
 * signature discrète.
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-6 py-8 text-sm">
        <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-muted-foreground">
          <Link
            href="/audit-gratuit"
            className="transition-colors hover:text-foreground"
          >
            Audit gratuit
          </Link>
          {landingPages.map((page) => (
            <Link
              key={page.slug}
              href={`/offres/${page.slug}`}
              className="transition-colors hover:text-foreground"
            >
              {page.navLabel}
            </Link>
          ))}
        </nav>
        <div className="flex w-full flex-col items-center justify-between gap-3 border-t border-border pt-5 sm:flex-row">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/biome.svg" alt={site.name} className="h-10 w-auto" />
          <nav className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <span className="text-muted-foreground">
            {site.name.toUpperCase()} — Studio web
          </span>
        </div>
      </div>
    </footer>
  );
}
