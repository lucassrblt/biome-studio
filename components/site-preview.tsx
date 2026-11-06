import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import { PlaceholderImage } from "@/components/placeholder-image";
import { cn } from "@/lib/utils";

export type SitePreviewData = {
  /** Marque affichée dans la barre de nav du faux site. */
  brand: string;
  /** URL affichée dans le chrome du navigateur (vide → barre d'adresse sans texte). */
  domain: string;
  /** Items de nav factices du faux site. */
  nav: string[];
  /** Libellé du bouton de la barre de nav (ex. « Commander »). */
  navCta: string;
  /** Gros titre du hero du faux site. */
  headline: string;
  /** CTA du hero du faux site (ex. « Découvrir la boutique »). */
  heroCta: string;
  /** Label du placeholder photo (à remplacer par un vrai visuel). */
  imageLabel: string;
  /** Petite rangée de réassurance optionnelle (hero du studio uniquement). */
  features?: { icon: LucideIcon; title: string; sub: string }[];
};

/**
 * Mockup d'un site de commerce dans un cadre navigateur : chrome + barre de nav
 * factice + hero (photo placeholder assombrie + titre + CTA) + features
 * optionnelles. Décoratif (aria-hidden). Le visuel se remplace via PlaceholderImage.
 */
export function SitePreview({
  data,
  className,
  compact = false,
  image,
}: {
  data: SitePreviewData;
  className?: string;
  /** Version réduite (hauteur d'image plus basse) pour les cartes secondaires. */
  compact?: boolean;
  /** Vraie capture du hero (depuis /public) ; sinon placeholder. */
  image?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-card shadow-soft-lg",
        className,
      )}
    >
      {/* Chrome navigateur */}
      <div className="flex items-center gap-1.5 border-b border-border bg-muted/70 px-3 py-2">
        <span className="size-2 rounded-full bg-foreground/15" />
        <span className="size-2 rounded-full bg-foreground/15" />
        <span className="size-2 rounded-full bg-foreground/15" />
        {data.domain ? (
          <span className="ml-3 truncate rounded-full bg-background px-3 py-0.5 text-[9px] font-medium text-muted-foreground">
            {data.domain}
          </span>
        ) : null}
      </div>

      {image ? (
        /* Capture réelle : on garde juste le chrome + le screenshot (qui
           contient déjà la vraie nav du site). */
        <div className={cn("relative", compact ? "aspect-[2/1]" : "aspect-[16/9]")}>
          <Image
            src={image}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 600px"
            className="object-cover object-top"
          />
        </div>
      ) : (
        <>
          {/* Barre de nav du faux site */}
          <div className="flex items-center justify-between gap-2 px-4 py-2.5">
            <span className="font-display text-[10px] font-extrabold uppercase tracking-wide">
              {data.brand}
            </span>
            <nav className="hidden items-center gap-3 text-[9px] text-muted-foreground sm:flex">
              {data.nav.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </nav>
            <span className="rounded-md bg-primary px-2 py-1 text-[8px] font-bold text-primary-foreground">
              {data.navCta}
            </span>
          </div>

          {/* Hero du faux site : placeholder assombri + titre + CTA */}
          <div className={cn("relative", compact ? "aspect-[2/1]" : "aspect-[16/9]")}>
            <PlaceholderImage
              label={data.imageLabel}
              rounded="rounded-none"
              className="absolute inset-0 h-full w-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/35 to-transparent" />
            <div
              className={cn(
                "absolute inset-x-0 bottom-0 flex flex-col items-start gap-2 text-background",
                compact ? "p-3" : "p-4",
              )}
            >
              <h3
                className={cn(
                  "max-w-[80%] font-display font-extrabold leading-tight",
                  compact ? "text-sm" : "text-base sm:text-lg",
                )}
              >
                {data.headline}
              </h3>
              <span className="rounded-md bg-primary px-2.5 py-1 text-[9px] font-bold text-primary-foreground">
                {data.heroCta}
              </span>
            </div>
          </div>

          {/* Rangée de réassurance (optionnelle) */}
          {data.features?.length ? (
            <div className="grid grid-cols-3 divide-x divide-border border-t border-border">
              {data.features.map(({ icon: Icon, title, sub }) => (
                <div key={title} className="flex items-center gap-2 px-3 py-3">
                  <Icon className="size-4 shrink-0 text-primary" strokeWidth={1.75} />
                  <div className="min-w-0">
                    <p className="truncate text-[9px] font-semibold">{title}</p>
                    <p className="truncate text-[8px] text-muted-foreground">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
