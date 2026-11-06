import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { site, legalLinks } from "@/lib/content";

/**
 * Coquille des pages légales (mentions légales, confidentialité, CGV).
 * Volontairement sobre : lien « Retour à l'accueil » en haut, liens croisés
 * vers les autres pages légales en bas, puis le pied de page du site.
 * Typographie calée sur les tokens du site (pas de plugin prose).
 */
export function LegalLayout({
  title,
  updatedAt,
  children,
  current,
}: {
  title: string;
  updatedAt: string;
  children: ReactNode;
  /** Chemin de la page courante (exclu des liens croisés). */
  current: (typeof legalLinks)[number]["href"];
}) {
  return (
    <>
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16 sm:py-24">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Retour à l’accueil
        </Link>

        <header className="mt-8">
          <p className="font-display text-xl font-extrabold lowercase tracking-tight">
            {site.name}
            <span className="text-primary">.</span>
          </p>
          <h1 className="mt-3 font-display text-[clamp(1.9rem,3.8vw,2.6rem)] font-extrabold leading-[1.05] tracking-tight">
            {title}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Dernière mise à jour : {updatedAt}
          </p>
        </header>

        {/* Contenu : sections en h2 font-display, corps en muted-foreground */}
        <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-muted-foreground [&_a]:font-medium [&_a]:text-primary [&_a:hover]:underline [&_h2]:mb-2 [&_h2]:font-display [&_h2]:text-lg [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-foreground [&_strong]:font-semibold [&_strong]:text-foreground [&_ul]:mt-2 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_p+p]:mt-2">
          {children}
        </div>

        <nav className="mt-16 flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-6">
          {legalLinks
            .filter((link) => link.href !== current)
            .map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            ))}
        </nav>
      </main>
      <SiteFooter />
    </>
  );
}
