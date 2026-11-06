"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { MagneticButton } from "@/components/magnetic";
import { site } from "@/lib/content";

const navItems = [
  { id: "offres", label: "Offres" },
  { id: "realisations", label: "Réalisations" },
  { id: "tarifs", label: "Tarifs" },
  { id: "contact", label: "Contact" },
];

const navIds = navItems.map((item) => item.id);

/**
 * Suit la section actuellement à l'écran (scroll-spy) pour surligner le bon
 * lien de nav. IntersectionObserver avec une marge haute = hauteur du header,
 * et une marge basse qui ne retient que la bande supérieure → la section
 * « active » est celle qu'on est vraiment en train de lire.
 */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const visible = new Map<string, boolean>();
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible.set(entry.target.id, entry.isIntersecting);
        }
        const current = ids.find((id) => visible.get(id));
        if (current) setActive(current);
      },
      { rootMargin: "-72px 0px -55% 0px" },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return active;
}

/**
 * Header « Biome » : wordmark bold, nav, gros bouton « Audit gratuit ».
 * Une bordure franche apparaît au scroll. Pas de theme-toggle (thème clair).
 * La nav met en avant la section active (pastille teal qui glisse).
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(navIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors",
        scrolled
          ? "border-b border-border bg-background/90 backdrop-blur-md"
          : "border-b border-transparent bg-background/70 backdrop-blur",
      )}
    >
      <div className="mx-auto grid h-16 max-w-6xl grid-cols-[1fr_auto] items-center px-6 md:grid-cols-[1fr_auto_1fr]">
        <Link
          href="#top"
          aria-label={`${site.name} — accueil`}
          className="justify-self-start transition-opacity hover:opacity-70"
        >
          {/* h-18 dépasse la hauteur du header (h-16) : le logo grandit
              visuellement en débordant, centré, sans pousser la barre. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/biome.svg"
            alt={site.name}
            className="block h-18 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-1 text-sm font-semibold md:flex md:justify-self-center">
          {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <Link
                key={item.id}
                href={`#${item.id}`}
                aria-current={isActive ? "true" : undefined}
                className="relative rounded-full px-3 py-1.5"
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-full bg-primary/10"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span
                  className={cn(
                    "transition-colors",
                    isActive
                      ? "text-primary"
                      : "text-foreground/70 hover:text-foreground",
                  )}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <MagneticButton
          href="/audit-gratuit"
          className={cn(
            buttonVariants(),
            "h-10 justify-self-end rounded-full bg-primary px-5 text-sm font-bold text-primary-foreground shadow-soft hover:bg-primary",
          )}
        >
          Audit gratuit
        </MagneticButton>
      </div>
    </header>
  );
}
