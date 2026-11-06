import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { PlaceholderImage } from "@/components/placeholder-image";
import { about } from "@/lib/content";

/**
 * « Qui suis-je » : courte présentation de Lucas (interlocuteur unique) avec
 * l'emplacement de sa photo (placeholder visible tant qu'elle n'est pas fournie).
 */
export function About() {
  return (
    <Section id="qui-suis-je" eyebrow={about.eyebrow} width="wide">
      <div className="grid items-center gap-10 md:grid-cols-[16rem_1fr] lg:gap-16">
        <Reveal>
          <PlaceholderImage
            label={about.photoLabel}
            rounded="rounded-2xl"
            className="aspect-[4/5] w-full max-w-64 border border-border shadow-soft"
          />
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display text-[clamp(1.9rem,3.8vw,3rem)] font-extrabold leading-[1.05] tracking-tight text-balance">
            {about.title}
          </h2>
          <div className="mt-5 max-w-2xl space-y-4 text-lg leading-relaxed text-muted-foreground">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
