import { site, hero, homeDescription } from "@/lib/content";
import { siteUrl } from "@/lib/site-url";

/**
 * Données structurées schema.org (JSON-LD) injectées dans le <head> via un
 * <script> natif (recommandation Next pour le JSON-LD : pas next/script).
 *
 * Graphe : Organization (l'entreprise — nom, logo, fondateur, zone) + WebSite
 * (le site lui-même). Pas de LocalBusiness : pas d'adresse physique publiée
 * (aucune adresse inventée) → Organization est le type correct.
 *
 * À tester après déploiement : https://search.google.com/test/rich-results
 */
export function JsonLd() {
  const orgId = `${siteUrl}/#organization`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: site.name,
        alternateName: "Biome Studio",
        legalName: site.founder,
        url: siteUrl,
        logo: `${siteUrl}/biome-icon.svg`,
        image: `${siteUrl}/opengraph-image`,
        email: site.email,
        description: homeDescription,
        slogan: hero.title,
        founder: {
          "@type": "Person",
          name: site.founder,
          jobTitle: "Développeur",
        },
        areaServed: {
          "@type": "Country",
          name: site.location,
        },
        knowsAbout: [
          "Fiche Google Business Profile",
          "Référencement local",
          "Gestion des avis Google",
          "Visibilité en ligne des commerçants et artisans",
          "Création de site vitrine",
          "Développement web",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: site.name,
        description: homeDescription,
        inLanguage: "fr-FR",
        publisher: { "@id": orgId },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // JSON-LD = données, pas du code exécutable → <script> natif. On échappe
      // « < » en unicode pour neutraliser toute injection XSS via le contenu.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
