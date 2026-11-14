# État du projet Factorealm

## Rôle

Ce document permet de reprendre le travail.

Il distingue le code fourni, les résultats transmis,
les validations rapportées et les travaux encore ouverts.

Il ne remplace pas le cahier des charges.

## Identification

- Projet : Factorealm.
- Auteur initial : Thibstudio24.
- Dépôt déclaré : Thibstudio24/FACTOREALM.
- Branche locale : à confirmer.
- Date de mise à jour : 2026-11-14.
- Phase : étape 1, socle compilable.
- Dernier lot applicatif validé : 1.6-C.
- Lot courant : 1.7, suivi documentaire.
- Intégration du lot courant : à confirmer.

Les dates exactes de réalisation des lots antérieurs ne sont pas établies.
Les anciennes dates des 7 et 8 novembre ne constituent pas des preuves.

## Références et accès au dépôt

Le cahier des charges complet a été fourni dans la conversation.
L'utilisateur indique l'avoir également placé dans docs.
Son nom exact reste à confirmer.

Les fichiers courants proviennent des livraisons de la conversation
et des confirmations de l'utilisateur.

Ne pas supposer que le dépôt distant est synchronisé.
Les anciennes affirmations non étayées de consultation du dépôt
ne sont pas retenues comme vérifications.

## Environnement rapporté

| Composant | Version ou situation |
|---|---|
| Windows | Windows 11 Professionnel, 10.0.26300, build 26300 |
| Architecture Go | windows/amd64 |
| PowerShell | 5.1.26100.9711 |
| Go | 1.27.3 |
| Git | 2.54.0.windows.1 |
| Node.js | 22.23.2 |
| npm | 12.2.2 |
| VS Code | Présent, version non renseignée |
| Visual Studio Build Tools 2022 | 17.14.37806.7 |
| Visual Studio Community 2026 | 18.12.12324.72, outils C++ x86/x64 détectés |
| Rust, Cargo, rustup | Non trouvés dans le PATH lors du diagnostic |
| PostgreSQL et CMake | Non trouvés dans le PATH lors du diagnostic |
| VM Windows et Linux | Réservées aux tests serveur ultérieurs |

Les absences du PATH ne prouvent pas l'absence d'installation.
Versions et architectures des VM à préciser avant leurs essais.

## Versions intégrées

### Backend

- Module : github.com/Thibstudio24/FACTOREALM/backend.
- Directive Go : 1.27.3.
- Dépendances externes : aucune.
- Version affichée : dev.

### Frontend

| Paquet | Version |
|---|---|
| react | 19.3.1 |
| react-dom | 19.3.1 |
| typescript | 7.0.2 |
| vite | 8.3.8 |
| @vitejs/plugin-react | 6.3.0 |
| @types/node | 22.20.5 |
| @types/react | 19.3.0 |
| @types/react-dom | 19.3.0 |
| vitest | 5.1.0 |
| @testing-library/react | 16.3.3 |
| @testing-library/dom | 10.4.2 |
| jsdom | 31.0.1 |

Versions directes confirmées par npm ls transmis par l'utilisateur.

Le lockfile a été généré et actualisé par npm.
Son contenu complet n'a pas été examiné dans la conversation.
Sa présence dans un commit reste à confirmer.

Ces versions ne sont pas qualifiées de dernières versions disponibles.

## Architecture retenue comme orientation

- Une entreprise par installation.
- Monolithe modulaire.
- Go pour le moteur et l'API.
- React, TypeScript et Vite pour l'interface.
- Tauri envisagé pour le bureau.
- PostgreSQL privilégié pour le serveur.
- SQLCipher envisagé pour l'autonome et les copies locales.

Tauri et les stockages ne sont pas intégrés.
Chiffrement PostgreSQL et gestion des clés restent à décider.

## Invariants de périmètre

- Pas de serveur central Factorealm nécessaire au métier.
- Pas d'abonnement obligatoire.
- Aucun plafond commercial artificiel.
- Pas de travail métier hors connexion dans la PWA.
- Pas de finalisation hors connexion dans un client.
- Finalisation locale possible en autonome.
- Chiffrement des données stockées et sauvegardes toujours chiffrées.
- Permissions contrôlées côté moteur/API.
- Décimaux exacts pour les calculs financiers.
- Autorité unique pour les documents définitifs.
- Identifiants stables, versions et idempotence pour la synchronisation.
- Aucun écrasement silencieux de conflit.
- Provenance historique conservée.
- Données fictives uniquement dans les prototypes.
- Aucune conformité ou performance non démontrée annoncée.

Ces invariants ne sont pas tous implémentés.

## Structure applicative actuelle

Backend :

- backend/.gitignore
- backend/go.mod
- backend/cmd/factorealm/main.go
- backend/cmd/factorealm/main_test.go
- backend/internal/localapi/server.go
- backend/internal/localapi/server_test.go

Frontend :

- frontend/.gitignore
- frontend/package.json
- frontend/package-lock.json
- frontend/tsconfig.json
- frontend/vite.config.ts
- frontend/index.html
- frontend/src/main.tsx
- frontend/src/App.tsx
- frontend/src/App.test.tsx
- frontend/src/health.ts
- frontend/src/health.test.ts

Les styles sont encore dans index.html.

## Lots réalisés et preuves

### Lots documentaires initiaux

Documents de cadrage, architecture, menaces, clés et restauration fournis.
Leur présence a été confirmée.

Le résultat détaillé du contrôle des 62 identifiants n'a pas été transmis.
La présence des documents ne vaut pas adoption de chaque proposition.

### Lot 1.1 — Exécutable Go

Commandes help et version, erreurs d'arguments et tests.

Compilation, tests et go vet déclarés réussis par l'utilisateur.
Version Go transmise.

### Lot 1.2 — API locale

- Commande serve.
- Écoute sur 127.0.0.1:8080.
- GET /healthz.
- Refus des autres méthodes et chemins.
- Délais HTTP.
- Arrêt sur Ctrl+C.
- Tests de route, démarrage, erreurs et arrêt.

Sortie HTTP transmise :

    HTTP 200
    Content-Type: application/json; charset=utf-8
    Cache-Control: no-store
    {"status":"ok"}

Tests Go, compilation et arrêt déclarés réussis.
Les sorties détaillées de ces commandes n'ont pas été transmises.

### Lot 1.3 — Documentation

Documents alignés sur le serveur local.
Validation rapportée par l'utilisateur.

### Lot 1.4 — Métadonnées frontend

Versions, contraintes et dépendances facultatives examinées
à partir des sorties npm view transmises.

Cela ne constitue pas un audit complet des licences.

### Lot 1.5 — Interface technique

- React et TypeScript.
- Vite sur 127.0.0.1:5173.
- Relais de développement limité à /healthz vers Go.
- Vérification manuelle par bouton.
- Aucun cache métier ni requête automatique à l'ouverture.

Versions, typecheck et construction confirmés par sorties.
Fonctionnement manuel confirmé par l'utilisateur.

### Lot 1.6-B — Module HTTP

Requête extraite dans health.ts.

15 tests couvrent notamment :

- succès et options de requête ;
- erreurs HTTP ;
- contenu et structure incorrects ;
- erreur réseau et lecture interrompue ;
- expiration du délai ;
- nettoyage du minuteur.

Sortie transmise : 15 tests réussis.
Typecheck et construction réussis.

### Lot 1.6-C — Composant React

Composant App séparé du point de démarrage.

6 tests couvrent :

- état initial sans requête ;
- bouton désactivé pendant l'attente ;
- succès ;
- remplacement du succès par une indisponibilité ;
- réponse inattendue ;
- nouvelle tentative après erreur interne.

Sortie transmise :

    Test Files: 2 passed
    Tests: 21 passed

Typecheck et construction réussis.
Fonctionnement manuel confirmé par l'utilisateur.

Les simulations sont limitées aux tests.
L'application utilise une véritable requête HTTP.

### Lot 1.7 — Suivi documentaire

README, PROJECT_STATE et KNOWN_LIMITS actualisés.
Aucun changement du code.
Intégration et validation : en attente.

## Portée des vérifications

Les commandes et tests ont été exécutés chez l'utilisateur.
Aucun test n'a été exécuté par l'assistant.

Les tests React utilisent jsdom, pas un navigateur réel.
La chaîne navigateur/Vite/Go a été vérifiée manuellement.

npm a rapporté zéro vulnérabilité lors des installations transmises.
Ce constat est limité à ces contrôles et ne constitue pas un audit global.

Aucun test Linux, ARM64, restauration ou charge n'est réalisé.

## Limites actuelles

- Aucun métier, stockage, compte ou permission.
- Aucun chiffrement applicatif.
- Aucun TLS.
- Aucun service système.
- Aucune intégration Tauri.
- Aucune distribution intégrée du frontend construit.
- Aucune synchronisation.
- Aucun installateur ou mécanisme de mise à jour.
- Pas de tests automatisés dans un vrai navigateur.
- Pas d'audit d'accessibilité.
- Pas de validation comptable ou réglementaire.

La santé technique ne prouve pas une disponibilité métier.
La boucle locale ne remplace pas l'authentification.

## Licence et publications

AGPL-3.0 envisagée, non formellement adoptée.
Le frontend indique provisoirement UNLICENSED.

Inventaire des composants, licences transitives et notices à compléter.
release.md reste à créer sans inventer de publication.

Aucune référence de commit n'a été transmise.

## Priorités suivantes

1. Valider ce lot documentaire.
2. Formaliser l'inventaire des composants directs et les licences déclarées.
3. Ajouter release.md avec une section non publiée.
4. Préparer un essai limité d'intégration bureau.
5. Vérifier Rust, Tauri, les prérequis Windows et leurs licences.
6. Éprouver tôt la compilation native et SQLCipher.
7. Finaliser la stratégie des clés avant toute donnée sensible.
8. Ajouter ultérieurement les tests navigateur et la CI.

Ne pas multiplier les raffinements de l'écran de santé.
Le prochain jalon technique doit réduire les risques du mode bureau
et du stockage local.

Les comptes, sauvegardes et migrations devront être introduits
avant tout usage avec des données sensibles.

## Reprise du travail

Fournir :

- cahier des charges original ;
- ce fichier ;
- matrice fonctionnelle et limites connues ;
- décisions concernées ;
- fichiers actuels à modifier ;
- résultats récents.

Ne pas transmettre de secrets ou données personnelles réelles.
Ne pas supposer que le dépôt distant correspond au travail local.

Après chaque lot, consigner versions, preuves, limites et prochaines actions.
Ne jamais transformer un résultat attendu en résultat constaté.
