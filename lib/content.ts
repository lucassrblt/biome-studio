/**
 * Contenu éditable du site « Biome » — visibilité locale pour commerçants et
 * artisans (fiche Google, avis, site web), par Lucas.
 * Tout est centralisé ici : pour faire évoluer le site, on modifie ces
 * objets/tableaux sans toucher aux composants. Voix « je » (Lucas).
 */

export const site = {
  name: "Biome",
  role: "Visibilité Google pour commerçants et artisans",
  email: "contact@biomestudio.fr",
  /** Prénom seul sur le site ; le nom complet n'apparaît que dans les mentions légales. */
  founder: "Lucas",
  website: "https://www.biomestudio.fr",
  location: "France",
  city: "Asnières-sur-Seine",
} as const;

/**
 * Données des pages légales (/mentions-legales, /confidentialite, /cgv).
 * Les champs `[À COMPLÉTER : …]` sont volontairement visibles sur le site tant
 * qu'ils ne sont pas renseignés (aucune donnée inventée).
 */
export const legal = {
  entityName: "[À COMPLÉTER : nom]",
  status: "[À COMPLÉTER : statut micro-entreprise]",
  siret: "[À COMPLÉTER : SIRET]",
  address: "[À COMPLÉTER : adresse]",
  email: "[À COMPLÉTER : email]",
  publicationDirector: "[À COMPLÉTER : nom]",
  vatNote: "TVA non applicable, art. 293 B du CGI", // franchise en base micro
  host: {
    name: "Vercel Inc.",
    address: "340 S Lemon Avenue #4133, Walnut, CA 91789, États-Unis",
    url: "https://vercel.com",
  },
  /** Durée de conservation des demandes d'audit (politique de confidentialité). */
  auditRetention: "[À COMPLÉTER : durée de conservation]",
  updatedAt: "[À COMPLÉTER : date de mise à jour]",
} as const;

/** Liens vers les pages légales (pied de page + navigation croisée). */
export const legalLinks = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/confidentialite", label: "Politique de confidentialité" },
  { href: "/cgv", label: "CGV" },
] as const;

/** Données d'un mockup de site affiché dans un cadre navigateur. */
export type SitePreviewData = {
  brand: string;
  domain: string;
  nav: string[];
  navCta: string;
  headline: string;
  heroCta: string;
  imageLabel: string;
};


/** Hero — promesse, CTA, réassurance, mockup vitrine + stats flottantes. */
export const hero = {
  badge: "Commerçants & artisans",
  /** H1 en deux temps : début + fin surlignée (cf. <Hero>). */
  titleLead: "Plus de clients,",
  titleAccent: "grâce à Google.",
  title: "Plus de clients, grâce à Google.",
  subtitle:
    "Je m'occupe de votre fiche Google, de vos avis et de votre site pour que les clients près de chez vous vous trouvent — et vous choisissent. Un abonnement simple, sans rien de technique à gérer.",
  ctaPrimary: { label: "Audit gratuit de votre fiche Google", href: "/audit-gratuit" },
  ctaSecondary: { label: "Réserver un appel (15 min)" },
  reassurance: ["59 €/mois tout compris", "Vous restez propriétaire", "Un seul interlocuteur"],
} as const;

/** Meta description de l'accueil (≤ 160 caractères). */
export const homeDescription =
  `Basé à ${site.city}, je rends les commerçants et artisans visibles sur Google : fiche optimisée, réponses aux avis, site inclus. 59 €/mois, audit gratuit.`;

/**
 * Cartes de stats flottantes du hero — faits sur l'offre elle-même (pas de
 * résultat client inventé).
 */
export const heroStats = [
  { to: 59, prefix: "", suffix: " €", label: "par mois, tout compris" },
  { to: 100, prefix: "", suffix: " %", label: "de vos avis avec une réponse" },
] as const;

/** Mockup de vitrine affiché dans le hero (capture du site mise en avant). */
export const heroPreview: SitePreviewData = {
  brand: "Cabinet Rimbault",
  domain: "cabinet-rimbault.fr",
  nav: ["Accueil", "Acheter", "Louer", "L'agence", "Contact"],
  navCta: "Estimer mon bien",
  headline: "Trouver chez nous, votre futur chez vous.",
  heroCta: "Voir les biens",
  imageLabel: "Capture Cabinet Rimbault",
};
export const heroImage = "/realisations/cabinet-rimbault.webp";


/** « Pour qui » — types de commerces, défilent en marquee (avec picto). */
export const audiences: string[] = [
  "Restaurants",
  "Artisans",
  "Commerces",
  "Coiffeurs & barbiers",
  "Boulangeries",
  "Cafés & Bars",
  "Boutiques",
  "Bien-être",
  "Produits locaux",
];

export type Offer = {
  title: string;
  description: string;
};

/** Ce que je fais pour vous — les 4 piliers de l'abonnement Visibilité locale. */
export const offers: Offer[] = [
  {
    title: "Fiche Google optimisée",
    description:
      "Votre fiche Google complète et à jour chaque mois : horaires, photos, services, publications. C'est elle que vos clients voient en premier.",
  },
  {
    title: "Avis clients",
    description:
      "Je réponds à tous vos avis Google et je vous donne un kit simple (QR code en caisse + modèle de SMS) pour en recevoir de vrais, de vrais clients.",
  },
  {
    title: "Site vitrine inclus",
    description:
      "Un site d'une page, rapide et pensé pour le mobile, avec nom de domaine, hébergement, HTTPS et email professionnel.",
  },
  {
    title: "Suivi mensuel",
    description:
      "Chaque mois, un rapport simple : appels, demandes d'itinéraire, nouveaux avis. Et les petites modifications sont incluses.",
  },
];

export type Project = {
  title: string;
  /** Métier, affiché en légende. */
  sector: string;
  /**
   * Honnêteté : vrai projet client vs exemple de réalisation (commerce fictif,
   * page hébergée sur /exemples/<slug>).
   */
  kind: "client" | "example";
  /** Lien : site en ligne (client) ou page d'exemple interne. */
  href: string;
  /** Capture du hero du site, dans /public (sinon mockup sans image). */
  image?: string;
  /**
   * Fonctionnalité réelle mise en avant (pastille) — décrit ce que le site
   * propose vraiment, sans résultat chiffré inventé.
   */
  feature: string;
  /** Contenu du mockup de site (barre d'adresse : jamais de faux domaine). */
  preview: SitePreviewData;
};

export const projects: Project[] = [
  {
    title: "Cabinet Rimbault",
    sector: "Immobilier",
    kind: "client",
    href: "https://cabinet-rimbault.fr?preview=lucas",
    image: "/realisations/cabinet-rimbault.webp",
    feature: "Estimation en ligne",
    preview: {
      brand: "Cabinet Rimbault",
      domain: "cabinet-rimbault.fr",
      nav: ["Accueil", "Biens", "À propos", "Contact"],
      navCta: "Estimer mon bien",
      headline: "Votre partenaire immobilier de confiance.",
      heroCta: "Voir les biens",
      imageLabel: "Capture Cabinet Rimbault",
    },
  },
  {
    title: "Maison Fauve",
    sector: "Barbier · commerce fictif",
    kind: "example",
    href: "/exemples/maison-fauve",
    image: "/realisations/maison-fauve.webp",
    feature: "Prestations & horaires",
    preview: {
      brand: "Maison Fauve",
      domain: "",
      nav: ["Prestations", "La maison", "Infos pratiques"],
      navCta: "Réserver un créneau",
      headline: "Coupe nette, barbe soignée, rasage à l'ancienne.",
      heroCta: "Réserver un créneau",
      imageLabel: "Maison Fauve — exemple fictif",
    },
  },
  {
    title: "Fournil Céladon",
    sector: "Boulangerie · commerce fictif",
    kind: "example",
    href: "/exemples/fournil-celadon",
    image: "/realisations/fournil-celadon.webp",
    feature: "Commande la veille",
    preview: {
      brand: "Fournil Céladon",
      domain: "",
      nav: ["Nos incontournables", "Le fournil", "Infos pratiques"],
      navCta: "Commander pour demain",
      headline: "Du pain au levain, cuit chaque matin.",
      heroCta: "Commander pour demain",
      imageLabel: "Fournil Céladon — exemple fictif",
    },
  },
  {
    title: "Table Orpiment",
    sector: "Restaurant · commerce fictif",
    kind: "example",
    href: "/exemples/table-orpiment",
    image: "/realisations/table-orpiment.webp",
    feature: "Ardoise de la semaine",
    preview: {
      brand: "Table Orpiment",
      domain: "",
      nav: ["L'ardoise", "La maison", "Infos pratiques"],
      navCta: "Réserver une table",
      headline: "Une cuisine de saison, une ardoise qui change chaque semaine.",
      heroCta: "Réserver une table",
      imageLabel: "Table Orpiment — exemple fictif",
    },
  },
];

export type Step = {
  number: string;
  title: string;
  description: string;
};

/** Comment ça marche — 4 étapes concrètes. */
export const process: Step[] = [
  {
    number: "01",
    title: "Audit gratuit",
    description:
      "J'analyse votre fiche Google et votre présence en ligne, puis je vous dis concrètement ce qui vous fait perdre des clients.",
  },
  {
    number: "02",
    title: "Mise en place",
    description:
      "Je complète votre fiche, je crée votre site d'une page, votre nom de domaine et votre email pro, et je vous remets le kit avis.",
  },
  {
    number: "03",
    title: "Chaque mois",
    description:
      "Je mets à jour votre fiche (horaires, photos, publications), je réponds à vos avis et je fais les petites modifications demandées.",
  },
  {
    number: "04",
    title: "Rapport mensuel",
    description:
      "Vous recevez un rapport simple : appels, demandes d'itinéraire, nouveaux avis. Vous voyez ce que ça vous rapporte.",
  },
];

/** Bandeau « toujours compris » au-dessus des tarifs. */
export const includedAll: string[] = [
  "Vous restez propriétaire du site et du domaine",
  "Pas de frais cachés",
  "Un seul interlocuteur : moi",
  "Audit gratuit avant de vous engager",
];

/** Offre principale : l'abonnement Visibilité locale (au centre des tarifs). */
export const subscription = {
  name: "Visibilité locale",
  tagline: "Pour être trouvé — et choisi — sur Google",
  price: "59 €",
  period: "/mois",
  setup: [
    "Mise en place offerte (0 €) avec un engagement de 6 mois",
    "ou 190 € de mise en place, sans engagement",
  ],
  afterCommitment: "Après 6 mois : mensuel, résiliable à tout moment.",
  features: [
    "Fiche Google complète et optimisée, mise à jour chaque mois (horaires, photos, publications)",
    "Réponse à tous les avis Google",
    "Kit de collecte de vrais avis (QR code à poser en caisse + modèle de SMS)",
    "Site vitrine 1 page inclus",
    "Nom de domaine, hébergement, HTTPS et email professionnel",
    "Petites modifications incluses",
    "Rapport mensuel simple (appels, demandes d'itinéraire, nouveaux avis)",
  ],
  ownership:
    "Vous êtes propriétaire de votre site et de votre nom de domaine : si vous arrêtez, vous repartez avec tout.",
} as const;

export type PaidOption = { name: string; description: string; price: string };

/** Options en paiement unique — volontairement discrètes (non mises en avant). */
export const paidOptions: PaidOption[] = [
  {
    name: "Site multi-pages",
    description: "Plusieurs pages, avec réservation ou click & collect.",
    price: "dès 1 099 €",
  },
  {
    name: "Sur-mesure",
    description: "E-commerce, intégrations métier, site multilingue.",
    price: "Sur devis",
  },
];

/** Une question/réponse de FAQ (accueil ou landing page). */
export type FaqItem = { question: string; answer: string };

/**
 * FAQ de l'accueil — orientée **conversion** (lève les freins d'un commerçant
 * juste avant le CTA Contact), distincte des FAQ SEO des landing pages.
 * Affichée toujours visible + schéma FAQPage (cf. <Faq>).
 */
export const homeFaq: FaqItem[] = [
  {
    question: "Combien ça coûte ?",
    answer:
      "59 € par mois. La mise en place est offerte si vous vous engagez 6 mois, ou facturée 190 € si vous préférez rester sans engagement. Si vous avez besoin d'un site plus complet, les options en paiement unique démarrent à 1 099 €. TVA non applicable, art. 293 B du CGI.",
  },
  {
    question: "Y a-t-il un abonnement ?",
    answer:
      "Oui, et c'est voulu. Pour 59 €/mois, je tiens votre fiche Google à jour (horaires, photos, publications), je réponds à tous vos avis, j'héberge votre site d'une page avec votre nom de domaine et votre email pro, je fais les petites modifications et je vous envoie un rapport chaque mois. Une fiche Google et des avis, ça s'entretient dans la durée : un site livré une fois puis oublié ne fait pas venir de clients.",
  },
  {
    question: "Puis-je arrêter ?",
    answer:
      "Oui. Si la mise en place vous a été offerte, vous vous engagez pour 6 mois ; ensuite l'abonnement devient mensuel et résiliable à tout moment. Si vous avez payé la mise en place (190 €), vous êtes sans engagement dès le départ. Dans tous les cas, vous gardez votre site, votre nom de domaine et votre fiche Google.",
  },
  {
    question: "Comment obtenez-vous des avis ?",
    answer:
      "Uniquement de vrais avis, laissés par vos vrais clients. Je vous fournis un kit simple — un QR code à poser en caisse et un modèle de SMS à envoyer après une prestation — pour qu'ils pensent à vous laisser un avis. Je n'achète jamais d'avis et je n'en écris jamais de faux : c'est interdit, et ça finit toujours par se retourner contre le commerce.",
  },
  {
    question: "Que se passe-t-il si j'ai déjà un site ?",
    answer:
      "Deux possibilités : je peux reprendre votre site existant, ou m'occuper uniquement de votre fiche Google et de vos avis en gardant votre site actuel. Je vous aide à choisir pendant l'audit gratuit.",
  },
  {
    question: "Suis-je propriétaire de mon site et de mon domaine ?",
    answer:
      "Oui, à 100 %. Le site et le nom de domaine sont à vous. Si vous arrêtez l'abonnement, vous repartez avec tout : vous n'êtes jamais prisonnier d'un prestataire.",
  },
  {
    question: "Je n'ai pas de logo ni de belles photos, est-ce un problème ?",
    answer:
      "Pas du tout. Je pars de ce que vous avez et je vous conseille pour prendre des photos simples et efficaces de votre commerce, qui serviront à la fois pour votre fiche Google et pour votre site.",
  },
  {
    question: "Et si le rendu ne me plaît pas ?",
    answer:
      "Vous voyez votre site et votre fiche avant publication, et j'ajuste jusqu'à ce qu'ils vous ressemblent vraiment. C'est mon engagement « satisfait ou ajusté ».",
  },
];

export type Guarantee = { title: string; description: string };

/** « Mes engagements » — réassurance pour lever les freins. */
export const guarantees: Guarantee[] = [
  {
    title: "Vous restez propriétaire",
    description:
      "Site et nom de domaine sont à vous. Si vous arrêtez, vous repartez avec tout.",
  },
  {
    title: "Un engagement clair",
    description:
      "6 mois si la mise en place est offerte, aucun si vous la payez (190 €). Ensuite, résiliable à tout moment.",
  },
  {
    title: "Satisfait ou ajusté",
    description:
      "Vous validez le site et la fiche avant publication ; j'ajuste jusqu'à ce que ça vous ressemble.",
  },
  {
    title: "Un interlocuteur unique",
    description: "Toujours moi, du premier échange au rapport mensuel.",
  },
];

/** « Qui suis-je » — courte présentation de Lucas. */
export const about = {
  eyebrow: "Qui suis-je",
  title: "Lucas, votre interlocuteur unique.",
  paragraphs: [
    `Je m'appelle ${site.founder}. Je suis développeur et je suis basé à ${site.city}.`,
    "Avec Biome, j'aide les commerçants et les artisans à être trouvés sur Google : fiche, avis, site. Pas d'agence, pas de chef de projet qui change en cours de route : vous avez affaire à moi, du premier échange au rapport mensuel.",
  ],
  photoLabel: "[À COMPLÉTER : photo]",
} as const;

/**
 * Prise de RDV via **Cal.com**. Chaque événement stocke son lien au format
 * « compte/event » (sans le domaine) : c'est ce qu'attend l'embed Cal.com
 * (`data-cal-link`). Les boutons ouvrent le lien en popup (cf. <BookingButton>).
 * Un événement sans lien ("") retombe proprement sur l'appel de 15 min.
 */
export type BookingEvent = "intro" | "audit";

export const booking = {
  /** Région Cal.com : "https://cal.eu" (compte EU) ou "https://cal.com" (US). */
  calOrigin: "https://cal.eu",
  events: {
    intro: {
      calLink: "biomestudio/15min",
      label: "Réserver un appel (15 min)",
      note: "15 min, gratuit et sans engagement : vous me parlez de votre commerce, je vous dis ce que je peux faire.",
    },
    audit: {
      // [À COMPLÉTER : lien 30 min] — ex. "biomestudio/30min". Tant que vide,
      // les boutons « audit commenté » ouvrent l'appel de 15 min.
      calLink: "",
      label: "Réserver l'audit commenté (30 min)",
      note: "30 min en visio : je vous montre votre fiche Google et ce que je changerais.",
    },
  },
} as const;

/** Événement réellement utilisable (repli sur l'appel de 15 min si lien vide). */
export function resolveBookingEvent(event: BookingEvent = "intro") {
  const wanted = booking.events[event];
  return wanted.calLink ? wanted : booking.events.intro;
}

/** Bloc d'appel à l'action de la section contact. */
export const contact = {
  title: "Parlons de votre commerce",
  subtitle:
    "Une question, une envie d'être mieux trouvé sur Google ? Je vous réponds sous 24h.",
} as const;

/** Page /audit-gratuit (lien utilisé dans les emails de prospection). */
export const auditPage = {
  metaTitle: "Audit gratuit de votre fiche Google",
  metaDescription:
    "Commerçant ou artisan ? Je vérifie gratuitement votre fiche Google (infos, photos, avis) et je vous envoie des recommandations concrètes. Sans engagement.",
  eyebrow: "Gratuit, sans engagement",
  h1: "Audit gratuit de votre fiche Google",
  intro:
    "Votre fiche Google est souvent la première chose que vos futurs clients voient de votre commerce. Je l'analyse gratuitement et je vous envoie par email ce qui vous fait perdre des clients — et comment y remédier.",
  checks: [
    "Les informations de base : horaires, catégories, coordonnées, services",
    "Les photos : quantité, qualité, fraîcheur",
    "Les avis : nombre, ancienneté, réponses apportées",
    "Votre site web (ou son absence) et le lien avec la fiche",
  ],
  reassurance:
    "Aucune obligation ensuite : l'audit est à vous, que vous fassiez appel à moi ou non.",
} as const;

/* ------------------------------------------------------------------ *
 * Landing pages SEO (route /offres/[slug])
 *
 * Pages d'entrée Google HORS de la nav one-page : invisibles pour le visiteur
 * du scroll, mais accessibles et indexables pour qui arrive depuis une
 * recherche. Chacune a un H1 + une intro + une FAQ UNIQUES (garde-fou
 * anti-contenu-dupliqué / doorway) et ne réutilise que quelques sections du
 * one-page, dans un ordre qui sert son intention.
 *
 * Pour ajouter une page : un objet de plus ici, c'est tout (route + sitemap +
 * liens footer se mettent à jour automatiquement).
 * ------------------------------------------------------------------ */

/** Sections du one-page réutilisables dans une landing page. */
export type LandingSection =
  | "offers"
  | "pricing"
  | "process"
  | "guarantees"
  | "projects"
  | "about";

export type LandingPage = {
  /** Segment d'URL : /offres/<slug>. Doit contenir le mot-clé. */
  slug: string;
  /** <title> (le template «  — Biome » est ajouté automatiquement). */
  metaTitle: string;
  metaDescription: string;
  /** Petit intitulé en capitales au-dessus du H1. */
  eyebrow: string;
  /** H1 unique, porteur du mot-clé. */
  h1: string;
  /** Accroche sous le H1 (1-2 phrases). */
  intro: string;
  /** Libellé court pour les liens internes (footer). */
  navLabel: string;
  /** Sections du one-page à réafficher, dans l'ordre. */
  sections: LandingSection[];
  /** FAQ unique → contenu propre + schéma FAQPage (résultats enrichis). */
  faq: FaqItem[];
};

export const landingPages: LandingPage[] = [
  {
    slug: "site-internet-tous-budgets",
    metaTitle: "Site internet tous budgets : visibilité locale dès 59 €/mois",
    metaDescription:
      "Un site internet et une fiche Google soignés, adaptés à tous les budgets : abonnement 59 €/mois tout compris, mise en place offerte avec engagement 6 mois.",
    eyebrow: "Pour tous les budgets",
    h1: "Un site internet de qualité, adapté à tous les budgets",
    intro:
      "Pas besoin de sortir plusieurs milliers d'euros d'un coup pour être bien présent en ligne. Avec l'abonnement Visibilité locale à 59 €/mois, je m'occupe de votre site vitrine, de votre fiche Google et de vos avis, mois après mois. Et si votre projet demande plus, des options en paiement unique restent possibles.",
    navLabel: "Tous budgets",
    sections: ["pricing", "offers", "guarantees"],
    faq: [
      {
        question: "Un site internet de qualité est-il possible avec un petit budget ?",
        answer:
          "Oui. Avec l'abonnement Visibilité locale, vous payez 59 € par mois au lieu d'un gros montant au départ, et la mise en place est offerte si vous vous engagez 6 mois. Le site reste soigné, rapide et pensé pour le mobile : c'est le budget qui s'étale, pas la qualité qui baisse.",
      },
      {
        question: "Pourquoi un abonnement plutôt qu'un paiement unique ?",
        answer:
          "Parce qu'un site seul ne suffit pas à faire venir des clients. Ce qui compte au quotidien, c'est une fiche Google à jour, des avis récents avec une réponse et un site qui reste en ligne et correct. L'abonnement couvre tout ce suivi, chaque mois.",
      },
      {
        question: "Qu'est-ce qui est inclus dans les 59 € par mois ?",
        answer:
          "Votre fiche Google complète et mise à jour chaque mois, la réponse à tous vos avis, un kit pour récolter de vrais avis, un site vitrine d'une page, le nom de domaine, l'hébergement, le HTTPS, l'email professionnel, les petites modifications et un rapport mensuel simple.",
      },
      {
        question: "Et si j'ai besoin d'un site plus complet ?",
        answer:
          "Un site multi-pages avec réservation ou click & collect démarre à 1 099 € en paiement unique, et les projets sur-mesure (e-commerce, intégrations, multilingue) se font sur devis.",
      },
      {
        question: "Y a-t-il des frais cachés ?",
        answer:
          "Non. 59 € par mois, une mise en place à 0 € (avec 6 mois d'engagement) ou à 190 € (sans engagement), et c'est tout. TVA non applicable, art. 293 B du CGI.",
      },
    ],
  },
  {
    slug: "prix-site-internet",
    metaTitle: "Prix d'un site internet : combien ça coûte vraiment ?",
    metaDescription:
      "Le prix d'un site internet pour un commerce, expliqué simplement : 59 €/mois avec fiche Google et avis inclus, ou options en paiement unique dès 1 099 €.",
    eyebrow: "Tarifs transparents",
    h1: "Combien coûte un site internet ?",
    intro:
      "Le prix d'un site internet dépend surtout du nombre de pages, des fonctionnalités et du suivi dont vous avez besoin. Chez moi, les repères sont simples : 59 €/mois pour un site vitrine d'une page avec votre fiche Google et vos avis pris en charge, ou un paiement unique dès 1 099 € pour un site multi-pages avec réservation.",
    navLabel: "Prix",
    sections: ["pricing", "process", "guarantees"],
    faq: [
      {
        question: "Quel est le prix d'un site vitrine pour un commerce ?",
        answer:
          "Avec l'abonnement Visibilité locale, un site vitrine d'une page est inclus pour 59 € par mois, avec l'hébergement, le nom de domaine, l'email pro et la gestion de votre fiche Google. Pour un site multi-pages avec réservation ou click & collect, comptez dès 1 099 € en paiement unique.",
      },
      {
        question: "Pourquoi les prix varient-ils autant d'un prestataire à l'autre ?",
        answer:
          "Parce que le périmètre change : nombre de pages, fonctionnalités, contenus à créer, suivi inclus ou non — et les frais de structure de chacun. Je travaille seul et en direct avec vous, ce qui me permet d'afficher des prix clairs, sans intermédiaire.",
      },
      {
        question: "Faut-il payer chaque mois ?",
        answer:
          "Pour l'offre Visibilité locale, oui : 59 € par mois, parce que la fiche Google, les avis et le site demandent un suivi régulier. Les options (site multi-pages, sur-mesure) se règlent en paiement unique.",
      },
      {
        question: "Combien coûte la mise en place ?",
        answer:
          "0 € si vous vous engagez pour 6 mois, ou 190 € si vous préférez rester sans engagement. Après les 6 mois, l'abonnement est mensuel et résiliable à tout moment.",
      },
      {
        question: "Qu'est-ce qui fait monter le prix d'un site internet ?",
        answer:
          "Principalement les fonctionnalités avancées (e-commerce, prise de rendez-vous, intégrations métier, multilingue) et le volume de contenu à créer. Pour ces projets, je vous fais un devis détaillé.",
      },
    ],
  },
  {
    slug: "creer-site-internet-commerce",
    metaTitle: "Créer un site internet pour son commerce",
    metaDescription:
      "Créer le site internet de votre commerce sans rien gérer : site vitrine, fiche Google et avis pris en charge par un interlocuteur unique, dès 59 €/mois.",
    eyebrow: "Votre présence en ligne",
    h1: "Créer le site internet de votre commerce, sans prise de tête",
    intro:
      "Vous avez un commerce et vous voulez (enfin) être bien présent en ligne ? Je crée votre site, je complète votre fiche Google et je m'occupe de vos avis. Vous gardez votre métier, je gère le reste — pour que vos clients vous trouvent quand ils cherchent près de chez eux.",
    navLabel: "Créer mon site",
    sections: ["process", "offers", "projects"],
    faq: [
      {
        question: "Comment créer un site internet pour mon commerce ?",
        answer:
          "Le plus simple : commencer par l'audit gratuit de votre fiche Google. Ensuite je crée votre site d'une page, je complète votre fiche et je mets tout en ligne. Vous n'avez rien de technique à gérer.",
      },
      {
        question: "Ai-je besoin de compétences techniques ?",
        answer:
          "Aucune. Je m'occupe du nom de domaine, de l'hébergement, du site, de l'email pro et de la mise en ligne. Vous me donnez les infos sur votre commerce, je fais le reste.",
      },
      {
        question: "Un site suffit-il pour être trouvé sur Google ?",
        answer:
          "Rarement. Quand quelqu'un cherche un commerce près de chez lui, c'est souvent la fiche Google qui apparaît en premier, avec ses avis et ses photos. C'est pour ça que je m'occupe des deux : le site et la fiche.",
      },
      {
        question: "Pourrai-je demander des modifications ?",
        answer:
          "Oui. Les petites modifications (horaires, textes, photos, prix) sont incluses dans l'abonnement : vous me les envoyez, je m'en occupe.",
      },
      {
        question: "Mon commerce n'a pas encore de fiche Google, est-ce un problème ?",
        answer:
          "Non. Je la crée avec vous et je vous guide pour l'étape de validation demandée par Google.",
      },
    ],
  },
];
