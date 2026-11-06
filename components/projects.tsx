import { RevealGroup, RevealItem } from "@/components/reveal";
import { Section } from "@/components/section";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/content";

/**
 * Section Réalisations : grille uniforme (2×2 sur desktop) — le projet client
 * réel + des exemples de sites vitrines pour des commerces fictifs.
 */
export function Projects() {
  return (
    <Section
      id="realisations"
      eyebrow="Réalisations"
      title={
        <>
          Des sites pensés
          <br className="hidden sm:block" /> pour{" "}
          <span className="text-primary">faire venir des clients</span>.
        </>
      }
      lead="Un projet client, et des exemples de sites d'une page — comme celui inclus dans l'abonnement — pour des commerces fictifs."
      width="wide"
    >
      <RevealGroup className="grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <RevealItem key={project.title} className="h-full">
            <ProjectCard project={project} />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
