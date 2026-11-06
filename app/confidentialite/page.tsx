import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal-layout";
import { site, legal } from "@/lib/content";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: `Politique de confidentialité et traitement des données personnelles du site ${site.name}.`,
  alternates: { canonical: "/confidentialite" },
  robots: { index: false, follow: true },
};

export default function ConfidentialitePage() {
  return (
    <LegalLayout
      title="Politique de confidentialité"
      updatedAt={legal.updatedAt}
      current="/confidentialite"
    >
      <section>
        <p>
          Cette politique explique comment je traite les données personnelles
          collectées sur le site {site.name} ({site.website}), conformément au
          Règlement général sur la protection des données (RGPD) et à la loi
          « Informatique et Libertés ».
        </p>
      </section>

      <section>
        <h2>Responsable du traitement</h2>
        <p>
          {legal.entityName}, {legal.status} — {legal.address}. Pour toute
          question relative à vos données :{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </section>

      <section>
        <h2>Formulaire « Audit gratuit »</h2>
        <p>
          <strong>Données collectées :</strong> nom du commerce, ville, lien ou
          nom de la fiche Google, adresse email et, si vous le renseignez,
          numéro de téléphone.
        </p>
        <p>
          <strong>Finalité :</strong> réaliser l’audit gratuit de votre fiche
          Google que vous demandez, vous en envoyer les résultats et vous
          recontacter à ce sujet. Vos données ne servent à rien d’autre et ne
          sont jamais vendues.
        </p>
        <p>
          <strong>Base légale :</strong> votre consentement, donné en cochant la
          case prévue dans le formulaire, et les mesures précontractuelles
          prises à votre demande.
        </p>
        <p>
          <strong>Destinataires :</strong> moi uniquement. Le contenu du
          formulaire m’est transmis par email via le prestataire d’envoi{" "}
          <a href="https://resend.com" target="_blank" rel="noreferrer">
            Resend
          </a>
          , et le site est hébergé par {legal.host.name} (
          <a href={legal.host.url} target="_blank" rel="noreferrer">
            {legal.host.url}
          </a>
          ).
        </p>
        <p>
          <strong>Durée de conservation :</strong> {legal.auditRetention}.
        </p>
        <p>
          <strong>Protection contre les abus :</strong> l’adresse IP de l’envoi
          est utilisée temporairement, en mémoire, pour limiter le nombre de
          demandes ; elle n’est pas enregistrée.
        </p>
      </section>

      <section>
        <h2>Prise de rendez-vous</h2>
        <p>
          Les rendez-vous se réservent via Cal.com (cal.eu). Les informations
          que vous y saisissez sont traitées par Cal.com pour organiser le
          rendez-vous, selon sa propre politique de confidentialité.
        </p>
      </section>

      <section>
        <h2>Mesure d’audience</h2>
        <p>
          Le site utilise Vercel Web Analytics pour connaître sa fréquentation
          (pages vues, provenance, type d’appareil). Cet outil ne dépose aucun
          cookie et produit des statistiques agrégées, sans identifier les
          visiteurs.
        </p>
      </section>

      <section>
        <h2>Cookies</h2>
        <p>
          Le site ne dépose aucun cookie publicitaire ni de suivi.
        </p>
      </section>

      <section>
        <h2>Vos droits</h2>
        <p>
          Vous disposez d’un droit d’accès, de rectification, d’effacement,
          d’opposition, de limitation et de portabilité de vos données, et vous
          pouvez retirer votre consentement à tout moment. Pour exercer ces
          droits, écrivez-moi à{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
        <p>
          Vous pouvez également introduire une réclamation auprès de la CNIL (
          <a href="https://www.cnil.fr" target="_blank" rel="noreferrer">
            www.cnil.fr
          </a>
          ).
        </p>
      </section>
    </LegalLayout>
  );
}
