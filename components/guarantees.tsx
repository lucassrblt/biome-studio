import {
  KeyRound,
  CalendarClock,
  RefreshCw,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/reveal";
import { Section } from "@/components/section";
import { guarantees } from "@/lib/content";

const icons: LucideIcon[] = [KeyRound, CalendarClock, RefreshCw, UserRound];

/**
 * Section « Mes engagements » : 4 réassurances pour lever les freins,
 * placée juste avant les tarifs pour dédramatiser le passage à l'acte.
 */
export function Guarantees() {
  return (
    <Section
      eyebrow="Mes engagements"
      title="Avec moi, pas de mauvaise surprise."
      width="wide"
    >
      <RevealGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {guarantees.map((g, i) => {
          const Icon = icons[i] ?? KeyRound;
          return (
            <RevealItem key={g.title} className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-5 shadow-soft">
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-accent text-foreground">
                  <Icon className="size-5" strokeWidth={2} />
                </span>
                <h3 className="mt-4 text-base font-bold tracking-tight">
                  {g.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {g.description}
                </p>
              </div>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
