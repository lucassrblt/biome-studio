import { MapPin, Star, Store, ChartColumn, type LucideIcon } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/reveal";
import { Section } from "@/components/section";
import { TiltCard } from "@/components/tilt-card";
import { offers } from "@/lib/content";

const icons: LucideIcon[] = [MapPin, Star, Store, ChartColumn];

/**
 * Section « Ce que je fais » : les 4 piliers de l'abonnement en 4 cartes.
 * Cartes blanches sobres, léger tilt 3D au survol.
 */
export function Offers() {
  return (
    <Section
      id="offres"
      eyebrow="Ce que je fais"
      title={
        <>
          Tout ce qu&apos;il faut pour être{" "}
          <span className="text-primary">trouvé sur Google</span>.
        </>
      }
      width="wide"
    >
      <RevealGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {offers.map((offer, i) => {
          const Icon = icons[i] ?? Store;
          return (
            <RevealItem key={offer.title} className="h-full">
              <TiltCard
                max={5}
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-soft"
              >
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-accent text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-5" strokeWidth={2} />
                </span>
                <h3 className="mt-4 text-base font-bold tracking-tight">
                  {offer.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {offer.description}
                </p>
              </TiltCard>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
