import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout } from "@/components/legal-layout";
import { site, legal } from "@/lib/content";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: `Mentions légales du site ${site.name} (biomestudio.fr).`,
  alternates: { canonical: "/mentions-legales" },
  robots: { index: false, follow: true },
};

export default function MentionsLegalesPage() {
  return (
    <LegalLayout
      title="Mentions légales"
      updatedAt={legal.updatedAt}
      current="/mentions-legales"
    >
      <section>
        <h2>Éditeur du site</h2>
        <p>
          Le site <strong>{site.name}</strong> ({site.website}) est édité par{" "}
          <strong>{legal.entityName}</strong>, {legal.status}.
        </p>
        <ul>
          <li>SIRET : {legal.siret}</li>
          <li>Adresse : {legal.address}</li>
          <li>Email : {legal.email}</li>
          <li>{legal.vatNote}</li>
        </ul>
      </section>

      <section>
        <h2>Directeur de la publication</h2>
        <p>{legal.publicationDirector}</p>
      </section>

      <section>
        <h2>Hébergeur</h2>
        <p>
          Le site est hébergé par <strong>{legal.host.name}</strong>,{" "}
          {legal.host.address} —{" "}
          <a href={legal.host.url} target="_blank" rel="noreferrer">
            {legal.host.url}
          </a>
          .
        </p>
      </section>

      <section>
        <h2>Propriété intellectuelle</h2>
        <p>
          L’ensemble des contenus présents sur ce site (textes, visuels,
          maquettes, mise en page, code) est protégé par le droit de la
          propriété intellectuelle. Toute reproduction ou représentation,
          totale ou partielle, sans l’accord écrit de l’éditeur est interdite.
        </p>
        <p>
          Les exemples de réalisation présentés sur le site concernent des
          commerces fictifs, créés pour illustrer l’offre.
        </p>
      </section>

      <section>
        <h2>Données personnelles</h2>
        <p>
          Le traitement des données personnelles est détaillé dans la{" "}
          <Link href="/confidentialite">politique de confidentialité</Link>.
        </p>
      </section>
    </LegalLayout>
  );
}
