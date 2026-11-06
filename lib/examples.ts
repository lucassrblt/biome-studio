/**
 * Exemples de réalisation — commerces **fictifs** (aucun lien avec un commerce
 * réel, aucune ville, aucun avis inventé). Chaque entrée alimente une page
 * /exemples/<slug> : un vrai mini site vitrine d'une page, comme celui inclus
 * dans l'abonnement Visibilité locale. Pages en noindex, hors sitemap.
 *
 * Pour ajouter un exemple : un objet de plus ici (+ une carte dans
 * `projects` de lib/content.ts si on veut le montrer en page d'accueil).
 */

export type ExampleTheme = {
  /** Fond de page. */
  bg: string;
  /** Fond des blocs (cartes). */
  surface: string;
  /** Texte principal. */
  fg: string;
  /** Texte secondaire. */
  muted: string;
  /** Couleur d'accent (boutons, prix). */
  accent: string;
  /** Texte sur l'accent. */
  accentFg: string;
};

export type ExampleSite = {
  slug: string;
  name: string;
  /** Métier, affiché dans la carte « Réalisations ». */
  sector: string;
  theme: ExampleTheme;
  /** Petite accroche au-dessus du H1. */
  kicker: string;
  /** H1 du mini site. */
  headline: string;
  intro: string;
  cta: string;
  highlights: { title: string; text: string }[];
  menuTitle: string;
  menu: { name: string; detail?: string; price: string }[];
  menuNote?: string;
  aboutTitle: string;
  about: string[];
  hours: { days: string; time: string }[];
  /** Coordonnées volontairement factices. */
  address: string;
  phone: string;
  reviewText: string;
};

export const examples: ExampleSite[] = [
  {
    slug: "maison-fauve",
    name: "Maison Fauve",
    sector: "Barbier",
    theme: {
      bg: "#161311",
      surface: "#221c18",
      fg: "#f3ece4",
      muted: "#b3a596",
      accent: "#c8742f",
      accentFg: "#161311",
    },
    kicker: "Barbier · coiffure homme",
    headline: "Coupe nette, barbe soignée, rasage à l'ancienne.",
    intro:
      "Un salon de quartier où l'on prend le temps : coupes classiques et modernes, taille de barbe sur mesure et rasage à la serviette chaude.",
    cta: "Réserver un créneau",
    highlights: [
      { title: "Avec ou sans rendez-vous", text: "Réservez en ligne, ou passez : on vous prend dès qu'un fauteuil se libère." },
      { title: "Serviette chaude", text: "Le rasage traditionnel au coupe-chou, comme il se doit." },
      { title: "Conseils produits", text: "Huiles, baumes et cires sélectionnés, en vente au salon." },
    ],
    menuTitle: "Prestations",
    menu: [
      { name: "Coupe homme", detail: "Shampoing, coupe, coiffage", price: "25 €" },
      { name: "Coupe + barbe", detail: "La totale, sans compromis", price: "38 €" },
      { name: "Taille de barbe", detail: "Contours au rasoir", price: "18 €" },
      { name: "Rasage traditionnel", detail: "Serviette chaude, coupe-chou", price: "30 €" },
      { name: "Coupe enfant", detail: "Moins de 12 ans", price: "18 €" },
      { name: "Contours seuls", price: "10 €" },
    ],
    aboutTitle: "La maison",
    about: [
      "Deux fauteuils, des ciseaux bien affûtés et du temps pour chaque client. Ici, pas de chaîne ni de cadence : on écoute ce que vous voulez, on vous conseille, et on soigne les finitions.",
      "Café offert pendant l'attente, playlist choisie avec soin, et le même barbier d'une visite à l'autre si vous le souhaitez.",
    ],
    hours: [
      { days: "Mardi – vendredi", time: "10h – 19h30" },
      { days: "Samedi", time: "9h – 18h" },
      { days: "Dimanche – lundi", time: "Fermé" },
    ],
    address: "12 rue de l'Exemple",
    phone: "01 00 00 00 00",
    reviewText:
      "Vous êtes reparti satisfait ? Un avis Google nous aide énormément à nous faire connaître dans le quartier.",
  },
  {
    slug: "fournil-celadon",
    name: "Fournil Céladon",
    sector: "Boulangerie",
    theme: {
      bg: "#f7f1e6",
      surface: "#fffaf1",
      fg: "#2b2118",
      muted: "#6f6152",
      accent: "#4f806c",
      accentFg: "#fffaf1",
    },
    kicker: "Boulangerie · pâtisserie",
    headline: "Du pain au levain, cuit chaque matin.",
    intro:
      "Pains au levain, viennoiseries pur beurre et gâteaux du week-end, préparés sur place dès l'aube avec des farines de meunier.",
    cta: "Commander pour demain",
    highlights: [
      { title: "Levain maison", text: "Une fermentation lente pour un pain qui se garde plusieurs jours." },
      { title: "Pur beurre", text: "Croissants et pains au chocolat feuilletés à la main, chaque jour." },
      { title: "Commande la veille", text: "Commandez avant 18h, retirez le lendemain matin sans attendre." },
    ],
    menuTitle: "Nos incontournables",
    menu: [
      { name: "Baguette tradition", price: "1,30 €" },
      { name: "Pain de campagne au levain", detail: "500 g", price: "4,20 €" },
      { name: "Croissant pur beurre", price: "1,30 €" },
      { name: "Pain au chocolat", price: "1,40 €" },
      { name: "Flan pâtissier", detail: "La part", price: "3,50 €" },
      { name: "Tarte aux fruits de saison", detail: "6 personnes", price: "22 €" },
    ],
    menuNote: "Gâteaux d'anniversaire et pièces sur commande, 48h à l'avance.",
    aboutTitle: "Le fournil",
    about: [
      "Le pétrin tourne avant le lever du jour. Nos pains sont façonnés à la main et cuits sur sole, en petites fournées, pour qu'il y en ait du chaud toute la matinée.",
      "Les fruits des tartes suivent les saisons, et la vitrine change avec eux.",
    ],
    hours: [
      { days: "Mardi – samedi", time: "7h – 20h" },
      { days: "Dimanche", time: "7h – 13h30" },
      { days: "Lundi", time: "Fermé" },
    ],
    address: "12 rue de l'Exemple",
    phone: "01 00 00 00 00",
    reviewText:
      "Notre pain vous plaît ? Dites-le sur Google : c'est comme ça que les voisins nous découvrent.",
  },
  {
    slug: "table-orpiment",
    name: "Table Orpiment",
    sector: "Restaurant",
    theme: {
      bg: "#1d2924",
      surface: "#26352f",
      fg: "#f6efe0",
      muted: "#b8b29f",
      accent: "#e2b33c",
      accentFg: "#1d2924",
    },
    kicker: "Bistrot · cuisine de saison",
    headline: "Une cuisine de saison, une ardoise qui change chaque semaine.",
    intro:
      "Des produits frais, des plats mijotés, quelques vins bien choisis et une salle où l'on se sent bien. Midi et soir, du mardi au samedi.",
    cta: "Réserver une table",
    highlights: [
      { title: "Tout est fait maison", text: "Des fonds aux desserts, tout est préparé dans notre cuisine." },
      { title: "Formule midi", text: "Entrée + plat ou plat + dessert, servie rapidement pour les pauses courtes." },
      { title: "Privatisation", text: "La salle se privatise le soir pour vos repas de groupe." },
    ],
    menuTitle: "L'ardoise de la semaine",
    menu: [
      { name: "Velouté de potimarron", detail: "Noisettes torréfiées", price: "8 €" },
      { name: "Œuf parfait", detail: "Champignons des bois, mouillettes", price: "10 €" },
      { name: "Joue de bœuf braisée", detail: "Purée maison, jus réduit", price: "22 €" },
      { name: "Filet de lieu", detail: "Beurre blanc, poireaux fondants", price: "21 €" },
      { name: "Tarte fine aux pommes", detail: "Crème crue", price: "8 €" },
      { name: "Formule midi", detail: "Entrée + plat ou plat + dessert", price: "19 €" },
    ],
    menuNote: "L'ardoise évolue selon le marché. Options végétariennes chaque jour.",
    aboutTitle: "La maison",
    about: [
      "Une petite salle de trente couverts, une cuisine ouverte et une carte courte : c'est le meilleur moyen de travailler des produits frais, tous les jours.",
      "Le midi, on va à l'essentiel ; le soir, on prend le temps.",
    ],
    hours: [
      { days: "Mardi – samedi midi", time: "12h – 14h30" },
      { days: "Mardi – samedi soir", time: "19h – 22h30" },
      { days: "Dimanche – lundi", time: "Fermé" },
    ],
    address: "12 rue de l'Exemple",
    phone: "01 00 00 00 00",
    reviewText:
      "Vous avez passé un bon moment ? Quelques mots sur Google nous font toujours plaisir — et aident les prochains convives.",
  },
];

export function getExample(slug: string) {
  return examples.find((example) => example.slug === slug);
}
