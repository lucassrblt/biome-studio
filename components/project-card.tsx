import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { SitePreview } from "@/components/site-preview";
import { TiltCard } from "@/components/tilt-card";
import type { Project } from "@/lib/content";

/**
 * Carte réalisation (taille uniforme) : capture du site conçu (SitePreview) +
 * pastille de fonctionnalité + légende. Toute la carte mène au site en ligne
 * (projet client, nouvel onglet) ou à la page d'exemple interne.
 * Léger tilt 3D au survol.
 */
export function ProjectCard({ project }: { project: Project }) {
  const { feature } = project;
  const isClient = project.kind === "client";
  const label = isClient
    ? `Voir le site ${project.title} (nouvel onglet)`
    : `Voir l'exemple de réalisation ${project.title}`;
  const linkProps = isClient ? { target: "_blank", rel: "noreferrer" } : {};

  return (
    <div className="group flex h-full flex-col">
      <TiltCard max={4} className="relative">
        <SitePreview data={project.preview} image={project.image} />

        {/* Badge honnêteté : projet client réel vs exemple (commerce fictif) */}
        <span
          className={`pointer-events-none absolute left-4 top-4 z-20 rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide shadow-soft-lg ${
            isClient
              ? "bg-primary text-primary-foreground"
              : "bg-card/90 text-muted-foreground ring-1 ring-border backdrop-blur"
          }`}
        >
          {isClient ? "Projet client" : "Exemple de réalisation"}
        </span>

        {/* Lien superposé : toute la preview mène au site */}
        <Link
          href={project.href}
          {...linkProps}
          aria-label={label}
          className="absolute inset-0 z-10 rounded-2xl"
        />

        {/* Pastille fonctionnalité (décorative) */}
        <div className="pointer-events-none absolute bottom-4 right-4 z-20 inline-flex items-center gap-1.5 rounded-2xl bg-primary px-3.5 py-2 text-primary-foreground shadow-soft-lg">
          <Sparkles className="size-3.5 shrink-0" aria-hidden />
          <p className="font-display text-sm font-bold leading-tight tracking-tight">
            {feature}
          </p>
        </div>
      </TiltCard>

      {/* Légende */}
      <div className="mt-5">
        <Link
          href={project.href}
          {...linkProps}
          className="inline-flex items-center gap-1.5 font-display text-lg font-bold tracking-tight transition-colors hover:text-primary"
        >
          {project.title}
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
        <p className="text-sm text-muted-foreground">{project.sector}</p>
      </div>
    </div>
  );
}
