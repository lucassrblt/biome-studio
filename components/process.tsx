import {
  Search,
  PenLine,
  RefreshCw,
  ChartColumn,
  type LucideIcon,
} from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/reveal";
import { Section } from "@/components/section";
import { ProcessConnector } from "@/components/process-connector";
import { process } from "@/lib/content";

const icons: LucideIcon[] = [Search, PenLine, RefreshCw, ChartColumn];

/**
 * Section « Comment ça marche » (fond clair) : 4 étapes alignées, reliées par
 * une frise fine qui se dessine, chacune avec son icône, numéro, titre et desc.
 */
export function Process() {
  return (
    <Section
      id="process"
      eyebrow="Comment ça marche"
      title="4 étapes pour être trouvé — et choisi — sur Google."
      width="wide"
    >
      <div className="relative">
        <ProcessConnector />
        <RevealGroup className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((step, i) => {
            const Icon = icons[i] ?? Search;
            return (
              <RevealItem key={step.number}>
                <div className="flex flex-col items-start lg:items-center lg:text-center">
                  <span className="relative z-10 inline-flex size-14 items-center justify-center rounded-full border border-border bg-card text-primary shadow-soft">
                    <Icon className="size-6" strokeWidth={1.75} />
                  </span>
                  <p className="mt-5 text-sm font-bold text-muted-foreground">
                    {step.number}
                  </p>
                  <h3 className="mt-1 text-lg font-bold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-[15rem] text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </Section>
  );
}
