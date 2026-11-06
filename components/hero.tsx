import { ArrowRight, Check } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { BadgeSticker } from "@/components/badge-sticker";
import { HeroVisual } from "@/components/hero-visual";
import { BookingButton } from "@/components/booking-button";
import { MagneticButton } from "@/components/magnetic";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { hero } from "@/lib/content";

/**
 * Hero « biome » (v4) : promesse affirmée en grande typo, double CTA
 * (audit gratuit magnétique + appel de 15 min), réassurance, et une vitrine soignée
 * (mockup de site + 2 cartes de stats flottantes sur forme organique teal).
 */
export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 sm:py-28 lg:grid-cols-[1.02fr_0.98fr]">
        {/* Colonne texte */}
        <div>
          <Reveal>
            <BadgeSticker tone="ink">{hero.badge}</BadgeSticker>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="mt-6 font-display text-[clamp(2.6rem,6.5vw,5rem)] leading-[1.02] font-extrabold tracking-tight">
              {hero.titleLead}
              <br />
              <span className="text-primary">{hero.titleAccent}</span>
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
              {hero.subtitle}
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <MagneticButton
                href={hero.ctaPrimary.href}
                className={cn(
                  buttonVariants(),
                  "h-auto min-h-12 rounded-full bg-primary px-7 py-2.5 text-center text-base font-bold whitespace-normal text-primary-foreground shadow-soft hover:bg-primary",
                )}
              >
                {hero.ctaPrimary.label}
                <ArrowRight className="size-5 shrink-0" />
              </MagneticButton>
              <BookingButton
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "h-12 rounded-full border-border bg-card px-7 text-base font-semibold text-foreground transition-transform hover:-translate-y-0.5",
                )}
              >
                {hero.ctaSecondary.label}
              </BookingButton>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
              {hero.reassurance.map((item) => (
                <li key={item} className="inline-flex items-center gap-1.5">
                  <span className="inline-flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Colonne visuel */}
        <Reveal delay={0.16} className="relative">
          <HeroVisual />
        </Reveal>
      </div>
    </section>
  );
}
