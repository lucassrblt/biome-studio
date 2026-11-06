# Variables d'environnement

Le site fonctionne sans aucune variable. Seul le formulaire **/audit-gratuit**
en a besoin pour envoyer réellement les demandes par email (via l'API HTTP de
[Resend](https://resend.com), sans dépendance npm).

| Variable           | Obligatoire | Rôle |
|--------------------|-------------|------|
| `RESEND_API_KEY`   | oui (prod)  | Clé API Resend (`re_…`). |
| `AUDIT_TO_EMAIL`   | oui (prod)  | Adresse qui reçoit les demandes d'audit. Lue uniquement côté serveur, jamais envoyée au navigateur. |
| `AUDIT_FROM_EMAIL` | non         | Expéditeur. Défaut : `Biome Studio <onboarding@resend.dev>` (adresse de test Resend, qui ne délivre qu'à l'adresse du compte Resend). Pour envoyer depuis `@biomestudio.fr`, vérifier le domaine dans Resend puis mettre par ex. `Biome Studio <audit@biomestudio.fr>`. |

L'email reçu a pour `reply_to` l'adresse du prospect : « Répondre » lui écrit directement.

## Comportement sans configuration

- **Développement** (`npm run dev`) : si `RESEND_API_KEY` ou `AUDIT_TO_EMAIL`
  manque, la demande est affichée dans la console du serveur et le formulaire
  simule un succès (redirection vers `/audit-gratuit/merci`).
- **Production** (`next start`, Vercel) : le formulaire affiche une erreur propre
  invitant à écrire à `contact@biomestudio.fr`, et l'erreur est journalisée.

## Où les définir

- En local : copier `.env.example` en `.env.local` et remplir.
- Sur Vercel : *Project → Settings → Environment Variables* (Production, et
  Preview si l'on veut tester le formulaire sur les previews).

## Anti-spam (rappel)

Champ piège invisible, délai minimal de 3 s entre l'affichage et l'envoi, et
3 envois maximum par heure et par IP. Cette limite est gardée **en mémoire**
(par instance serveur, remise à zéro au redémarrage) : c'est une protection
basique, suffisante contre les abus légers.
