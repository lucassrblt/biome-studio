import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal-layout";
import { site, legal, subscription, paidOptions } from "@/lib/content";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  description: `Conditions générales de vente de ${site.name} : abonnement Visibilité locale, engagement, résiliation, propriété du site et du nom de domaine, paiement.`,
  alternates: { canonical: "/cgv" },
  robots: { index: false, follow: true },
};

export default function CgvPage() {
  return (
    <LegalLayout
      title="Conditions générales de vente"
      updatedAt={legal.updatedAt}
      current="/cgv"
    >
      <section>
        <h2>1. Objet</h2>
        <p>
          Les présentes conditions générales de vente (CGV) s’appliquent aux
          prestations vendues sous le nom {site.name} par{" "}
          <strong>{legal.entityName}</strong>, {legal.status}, SIRET{" "}
          {legal.siret}, {legal.address} (ci-après « le prestataire »), à ses
          clients professionnels — commerçants, artisans et indépendants
          (ci-après « le client »). Toute commande implique l’acceptation
          des présentes CGV.
        </p>
      </section>

      <section>
        <h2>2. Prestations</h2>
        <p>
          <strong>Abonnement « {subscription.name} »</strong>, qui comprend :
        </p>
        <ul>
          {subscription.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
        <p>
          <strong>Options en paiement unique</strong>, sur devis préalable
          accepté par le client :
        </p>
        <ul>
          {paidOptions.map((option) => (
            <li key={option.name}>
              {option.name} ({option.description.replace(/\.$/, "")}) :{" "}
              {option.price}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>3. Prix</h2>
        <p>
          L’abonnement {subscription.name} est facturé{" "}
          <strong>
            {subscription.price} par mois
          </strong>
          . Les frais de mise en place sont de <strong>0 €</strong> si le
          client choisit l’engagement de 6 mois, ou de <strong>190 €</strong>{" "}
          s’il choisit la formule sans engagement. Le prix des options est celui
          indiqué dans le devis accepté.
        </p>
        <p>{legal.vatNote}.</p>
      </section>

      <section>
        <h2>4. Durée, engagement et résiliation</h2>
        <p>
          <strong>Mise en place offerte :</strong> le client s’engage pour une
          durée de 6 mois à compter de [À COMPLÉTER : point de départ de
          l’engagement]. À l’issue de ces 6 mois, l’abonnement se poursuit au
          mois le mois et peut être résilié à tout moment.
        </p>
        <p>
          <strong>Mise en place payée (190 €) :</strong> l’abonnement est sans
          engagement et peut être résilié à tout moment.
        </p>
        <p>
          Modalités de résiliation : [À COMPLÉTER : forme et préavis de la
          résiliation]. Résiliation avant la fin de l’engagement de 6 mois :
          [À COMPLÉTER : conditions en cas de résiliation anticipée].
        </p>
      </section>

      <section>
        <h2>5. Paiement</h2>
        <p>
          Modalités de paiement : [À COMPLÉTER : moyen de paiement et date
          d’échéance].
        </p>
        <p>
          Conformément à l’article L.441-10 du Code de commerce, tout retard
          de paiement entraîne de plein droit des pénalités de retard au taux
          d’intérêt appliqué par la Banque centrale européenne à son opération
          de refinancement la plus récente, majoré de 10 points, ainsi qu’une
          indemnité forfaitaire pour frais de recouvrement de 40 €.
        </p>
      </section>

      <section>
        <h2>6. Propriété du site et du nom de domaine</h2>
        <p>
          Le client est propriétaire de son site et de son nom de domaine. En
          cas de résiliation, quelle qu’en soit la raison, il repart avec tout :
          le prestataire lui remet le nom de domaine (transfert ou code
          d’autorisation), les fichiers et contenus du site, ainsi que les
          accès nécessaires. La fiche Google appartient au client ; les accès
          de gestion confiés au prestataire lui sont retirés à la fin de
          l’abonnement.
        </p>
      </section>

      <section>
        <h2>7. Obligations du client</h2>
        <p>
          Le client fournit des informations exactes sur son activité (horaires,
          services, prix, coordonnées) et dispose des droits sur les contenus
          qu’il transmet (textes, photos, logo). Il donne au prestataire les
          accès nécessaires à la gestion de sa fiche Google.
        </p>
      </section>

      <section>
        <h2>8. Avis clients</h2>
        <p>
          Le prestataire ne publie, n’achète et ne rédige jamais de faux avis.
          Le kit de collecte d’avis sert uniquement à inviter les vrais clients
          du commerce à laisser un avis sincère. Le client s’engage à ne pas
          demander de faux avis.
        </p>
      </section>

      <section>
        <h2>9. Responsabilité</h2>
        <p>
          Le prestataire est tenu à une obligation de moyens. Le classement
          d’une fiche ou d’un site dans les résultats de Google dépend
          d’algorithmes sur lesquels le prestataire n’a pas la main : aucun
          positionnement ni volume de clients n’est garanti.
        </p>
      </section>

      <section>
        <h2>10. Données personnelles</h2>
        <p>
          Le traitement des données personnelles est décrit dans la{" "}
          <a href="/confidentialite">politique de confidentialité</a>.
        </p>
      </section>

      <section>
        <h2>11. Droit applicable et litiges</h2>
        <p>
          Les présentes CGV sont soumises au droit français. En cas de
          différend, les parties recherchent d’abord une solution amiable ; à
          défaut, le litige est porté devant les tribunaux compétents.
        </p>
      </section>
    </LegalLayout>
  );
}
