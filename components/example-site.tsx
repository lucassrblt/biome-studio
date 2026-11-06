import type { CSSProperties } from "react";
import Link from "next/link";
import { Clock, MapPin, Phone, Star, ArrowUpRight } from "lucide-react";
import type { ExampleSite as ExampleSiteData } from "@/lib/examples";

/**
 * Mini site vitrine d'une page pour un commerce **fictif** (route
 * /exemples/[slug]) : ce que le client obtient avec l'abonnement. Chaque
 * exemple a sa propre ambiance (couleurs passées en variables CSS), mais la
 * structure est commune : bandeau d'avertissement, header, hero, points forts,
 * prestations/carte, présentation, infos pratiques, appel aux avis.
 */
export function ExampleSite({ data }: { data: ExampleSiteData }) {
  const { theme } = data;
  const style = {
    "--ex-bg": theme.bg,
    "--ex-surface": theme.surface,
    "--ex-fg": theme.fg,
    "--ex-muted": theme.muted,
    "--ex-accent": theme.accent,
    "--ex-accent-fg": theme.accentFg,
  } as CSSProperties;

  const button =
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-2.5 text-center text-sm font-bold transition-opacity hover:opacity-90";

  return (
    <div style={style} className="flex flex-1 flex-col bg-[var(--ex-bg)] text-[var(--ex-fg)]">
      {/* Bandeau d'honnêteté — toujours visible */}
      <div className="sticky top-0 z-50 bg-foreground px-4 py-2.5 text-center text-xs font-semibold text-background sm:text-sm">
        Exemple de réalisation — commerce fictif.{" "}
        <Link href="/#tarifs" className="underline underline-offset-4 hover:no-underline">
          Voir l&apos;offre Biome
        </Link>
      </div>

      {/* Header du mini site */}
      <header className="border-b border-[var(--ex-fg)]/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-6">
          <a href="#accueil" className="font-display text-xl font-extrabold tracking-tight">
            {data.name}
          </a>
          <nav className="hidden items-center gap-6 text-sm text-[var(--ex-muted)] md:flex">
            <a href="#carte" className="hover:text-[var(--ex-fg)]">{data.menuTitle}</a>
            <a href="#maison" className="hover:text-[var(--ex-fg)]">{data.aboutTitle}</a>
            <a href="#infos" className="hover:text-[var(--ex-fg)]">Infos pratiques</a>
          </nav>
          <a
            href="#infos"
            className="rounded-full bg-[var(--ex-accent)] px-4 py-2 text-xs font-bold text-[var(--ex-accent-fg)] sm:text-sm"
          >
            {data.cta}
          </a>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section id="accueil" className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 left-1/3 size-72 rounded-full bg-[var(--ex-accent)] opacity-10 blur-2xl"
          />
          <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 sm:px-6 sm:py-28 lg:grid-cols-[1.25fr_0.75fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--ex-accent)]">
                {data.kicker}
              </p>
              <h1 className="mt-5 max-w-3xl font-display text-[clamp(2.4rem,6vw,4.5rem)] font-extrabold leading-[1.02] tracking-tight text-balance">
                {data.headline}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--ex-muted)]">
                {data.intro}
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href="#infos" className={`${button} bg-[var(--ex-accent)] text-[var(--ex-accent-fg)]`}>
                  {data.cta}
                </a>
                <a
                  href="#carte"
                  className={`${button} border border-[var(--ex-fg)]/20 text-[var(--ex-fg)]`}
                >
                  Voir {data.menuTitle.toLowerCase()}
                </a>
              </div>
              <p className="mt-8 inline-flex items-center gap-2 text-sm text-[var(--ex-muted)]">
                <Clock className="size-4 text-[var(--ex-accent)]" />
                {data.hours[0].days} · {data.hours[0].time}
              </p>
            </div>

            {/* Visuel décoratif : monogramme + extrait de la carte */}
            <div aria-hidden className="relative hidden lg:block">
              <div className="flex aspect-[4/5] items-center justify-center rounded-[42%_58%_60%_40%/45%_45%_55%_55%] bg-[var(--ex-accent)]">
                <span className="font-display text-[9rem] font-extrabold leading-none tracking-tighter text-[var(--ex-accent-fg)]">
                  {monogram(data.name)}
                </span>
              </div>
              <div className="absolute -bottom-6 -left-10 w-64 rounded-2xl bg-[var(--ex-surface)] p-5 shadow-2xl">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--ex-accent)]">
                  {data.menuTitle}
                </p>
                <ul className="mt-3 space-y-2 text-sm">
                  {data.menu.slice(0, 3).map((item) => (
                    <li key={item.name} className="flex justify-between gap-3">
                      <span className="truncate">{item.name}</span>
                      <span className="shrink-0 font-semibold text-[var(--ex-accent)]">{item.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Points forts */}
        <section className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="grid gap-4 md:grid-cols-3">
            {data.highlights.map((item) => (
              <div key={item.title} className="rounded-2xl bg-[var(--ex-surface)] p-6">
                <span aria-hidden className="block h-1 w-8 rounded-full bg-[var(--ex-accent)]" />
                <h3 className="mt-4 font-display text-lg font-bold tracking-tight">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--ex-muted)]">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Carte / prestations */}
        <section id="carte" className="scroll-mt-16 mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-28">
          <div className="grid gap-10 lg:grid-cols-[18rem_1fr] lg:gap-16">
            <div>
              <h2 className="font-display text-[clamp(1.9rem,3.8vw,2.8rem)] font-extrabold leading-[1.05] tracking-tight">
                {data.menuTitle}
              </h2>
              {data.menuNote ? (
                <p className="mt-4 text-sm leading-relaxed text-[var(--ex-muted)]">{data.menuNote}</p>
              ) : null}
            </div>
            <ul className="divide-y divide-[var(--ex-fg)]/10">
              {data.menu.map((item) => (
                <li key={item.name} className="flex items-baseline gap-4 py-4">
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold">{item.name}</p>
                    {item.detail ? (
                      <p className="mt-0.5 text-sm text-[var(--ex-muted)]">{item.detail}</p>
                    ) : null}
                  </div>
                  <p className="shrink-0 font-display text-lg font-bold text-[var(--ex-accent)]">
                    {item.price}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* La maison */}
        <section id="maison" className="scroll-mt-16 bg-[var(--ex-surface)]">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-6 sm:py-28 lg:grid-cols-[18rem_1fr] lg:gap-16">
            <h2 className="font-display text-[clamp(1.9rem,3.8vw,2.8rem)] font-extrabold leading-[1.05] tracking-tight">
              {data.aboutTitle}
            </h2>
            <div className="max-w-2xl space-y-4 text-lg leading-relaxed text-[var(--ex-muted)]">
              {data.about.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* Infos pratiques */}
        <section id="infos" className="scroll-mt-16 mx-auto max-w-6xl px-5 py-20 sm:px-6 sm:py-28">
          <h2 className="font-display text-[clamp(1.9rem,3.8vw,2.8rem)] font-extrabold leading-[1.05] tracking-tight">
            Infos pratiques
          </h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl bg-[var(--ex-surface)] p-6 sm:p-8">
              <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-[var(--ex-accent)]">
                <Clock className="size-4" /> Horaires
              </p>
              <dl className="mt-4 divide-y divide-[var(--ex-fg)]/10">
                {data.hours.map((h) => (
                  <div key={h.days} className="flex justify-between gap-4 py-3 text-sm">
                    <dt className="text-[var(--ex-muted)]">{h.days}</dt>
                    <dd className="font-semibold">{h.time}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 space-y-3 text-sm">
                <p className="flex items-center gap-2">
                  <MapPin className="size-4 shrink-0 text-[var(--ex-accent)]" />
                  {data.address}
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="size-4 shrink-0 text-[var(--ex-accent)]" />
                  {data.phone}
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <span className={`${button} bg-[var(--ex-accent)] text-[var(--ex-accent-fg)]`}>
                  {data.cta}
                </span>
                <span className={`${button} border border-[var(--ex-fg)]/20`}>
                  Itinéraire
                  <ArrowUpRight className="size-4" />
                </span>
              </div>
            </div>

            {/* Plan stylisé (pas de vraie carte : commerce fictif) */}
            <div
              aria-hidden
              className="relative min-h-64 overflow-hidden rounded-2xl bg-[var(--ex-surface)] bg-[linear-gradient(var(--ex-bg)_2px,transparent_2px),linear-gradient(90deg,var(--ex-bg)_2px,transparent_2px)] [background-size:56px_56px] opacity-90"
            >
              <span className="absolute inset-y-0 left-[38%] w-5 bg-[var(--ex-bg)]" />
              <span className="absolute inset-x-0 top-[55%] h-5 bg-[var(--ex-bg)]" />
              <span className="absolute left-[38%] top-[55%] -translate-x-1/2 -translate-y-full">
                <MapPin className="size-10 fill-[var(--ex-accent)] text-[var(--ex-accent-fg)]" />
              </span>
            </div>
          </div>
        </section>

        {/* Avis — illustre le kit de collecte (QR code), sans faux avis */}
        <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-6 sm:pb-28">
          <div className="flex flex-col items-start gap-8 rounded-3xl bg-[var(--ex-accent)] p-8 text-[var(--ex-accent-fg)] sm:flex-row sm:items-center sm:justify-between sm:p-12">
            <div className="max-w-xl">
              <p className="inline-flex gap-1" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-5 fill-current" />
                ))}
              </p>
              <h2 className="mt-4 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
                Laissez-nous un avis sur Google
              </h2>
              <p className="mt-3 leading-relaxed opacity-85">{data.reviewText}</p>
            </div>
            {/* QR code stylisé (illustration du kit avis) */}
            <div
              aria-hidden
              className="grid size-32 shrink-0 grid-cols-7 gap-1 rounded-xl bg-[var(--ex-accent-fg)] p-3"
            >
              {QR_PATTERN.map((on, i) => (
                <span key={i} className={on ? "rounded-[2px] bg-[var(--ex-accent)]" : ""} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--ex-fg)]/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-sm text-[var(--ex-muted)] sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="font-display font-bold text-[var(--ex-fg)]">{data.name}</p>
          <p>
            Commerce fictif — exemple réalisé par{" "}
            <Link href="/" className="font-semibold text-[var(--ex-fg)] underline underline-offset-4">
              Biome
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}

/** Initiales du commerce (ex. « Maison Fauve » → « MF »). */
function monogram(name: string) {
  return name
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/** Motif 7×7 évoquant un QR code (purement décoratif). */
const QR_PATTERN = [
  1, 1, 1, 0, 1, 1, 1,
  1, 0, 1, 0, 1, 0, 1,
  1, 1, 1, 0, 1, 1, 1,
  0, 0, 0, 1, 0, 1, 0,
  1, 0, 1, 1, 0, 0, 1,
  0, 1, 0, 0, 1, 1, 0,
  1, 1, 1, 0, 1, 0, 1,
].map(Boolean);
