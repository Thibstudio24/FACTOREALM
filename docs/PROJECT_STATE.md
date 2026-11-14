# État du projet Factorealm

## Usage

Ce fichier permet de reprendre le projet dans une nouvelle conversation
ou avec un autre contributeur.

Il distingue :

- décisions et propositions ;
- code fourni et intégration confirmée ;
- résultats transmis et réussite simplement rapportée ;
- protections prévues et protections implémentées.

Il ne remplace pas le cahier des charges original.

## Identification

- Projet : Factorealm
- Auteur initial : Thibstudio24
- Dépôt déclaré : Thibstudio24/FACTOREALM
- Branche locale : à confirmer
- Date de cette mise à jour : 2026-11-14
- Phase : étape 1, socle compilable
- Dernier lot applicatif validé par l'utilisateur : 1.2
- Lot courant : 1.3, synchronisation documentaire
- Statut du lot courant : fourni, intégration à confirmer

Les dates exactes de réalisation des premiers lots ne sont pas établies.
Les anciennes dates des 7 et 8 novembre ne doivent pas être utilisées
comme preuves de réalisation.

## Sources de référence

Le cahier des charges complet a été fourni dans la conversation initiale.
L'utilisateur indique également l'avoir placé dans docs.
Son nom exact reste à confirmer.

L'utilisateur a confirmé que README.md, PROJECT_STATE.md
et KNOWN_LIMITS.md correspondent aux dernières versions fournies
avant ce lot.

Les anciennes affirmations de consultation du dépôt n'étaient pas étayées
dans les échanges concernés. Elles ne constituent pas des vérifications.

Ne pas supposer que le dépôt distant contient les dernières versions locales.

## Environnement rapporté

| Élément | Information | Limites |
|---|---|---|
| Windows | Windows 11 Professionnel, 10.0.26300, build 26300 | Poste de développement initial |
| Architecture Go | windows/amd64 | Sortie de go version transmise |
| PowerShell | 5.1.26100.9711 | Version du diagnostic |
| VS Code | Présent | Version non renseignée |
| Git | 2.54.0.windows.1 | Accessible lors du diagnostic |
| Go | 1.27.3 | Version exacte transmise |
| Node.js | 22.23.2 | Pas encore validé pour le frontend |
| npm | 12.2.2 | Pas encore validé pour le frontend |
| Visual Studio Build Tools 2022 | 17.14.37806.7 | Composants détaillés non vérifiés |
| Visual Studio Community 2026 | 18.12.12324.72 | Outils C++ x86/x64 détectés |
| Rust, Cargo, rustup | Non trouvés dans le PATH | Installation ailleurs non exclue |
| Client PostgreSQL | Non trouvé dans le PATH | État d'un éventuel serveur inconnu |
| CMake | Non trouvé dans le PATH | Installation ailleurs non exclue |
| VM Windows | Réservée aux tests serveur ultérieurs | Version à préciser au moment des essais |
| VM Linux | Réservée aux tests serveur ultérieurs | Distribution et version à préciser |
| Expérience utilisateur | Intermédiaire | Aucun complément nécessaire |

Sortie transmise :

    go version go1.27.3 windows/amd64

Ces informations ne valident pas la compatibilité de toute la pile.

## Versions intégrées

- Module Go : github.com/Thibstudio24/FACTOREALM/backend
- Directive go.mod : go 1.27.3
- Version Go utilisée chez l'utilisateur : 1.27.3
- Dépendances Go externes : aucune
- Bibliothèques utilisées : bibliothèque standard Go
- Version affichée de l'application : dev
- Frontend, Tauri, PostgreSQL et SQLCipher : non intégrés

La version installée est consignée sans être qualifiée
de dernière version disponible.

## Décisions de périmètre

- Une entreprise par installation.
- Modes serveur, client installé et autonome.
- Moteur métier commun autant que possible.
- Interface française, web et bureau.
- Adaptation mobile via web/PWA, sans application native initiale.
- Pas de travail métier hors connexion dans la PWA.
- Pas de finalisation de facture hors connexion dans un client.
- Finalisation locale autorisée en autonome.
- Pas de serveur central nécessaire au métier.
- Pas d'abonnement obligatoire.
- Chiffrement des données stockées.
- Sauvegardes toujours chiffrées.
- Autorisations côté moteur/API.
- Aucun plafond commercial artificiel.
- Aucune capacité ou conformité non vérifiée annoncée.
- Petits lots avec validation intermédiaire.
- Identifiants fonctionnels d'origine conservés.
- Données fictives uniquement dans les prototypes.

## Architecture de travail

- Monolithe modulaire.
- Métier et API en Go.
- Interface envisagée : TypeScript, React et Vite.
- Bureau envisagé : Tauri.
- Rust limité autant que possible à l'intégration système.
- PostgreSQL privilégié pour le serveur.
- SQLCipher envisagé pour l'autonome et le cache client.

La compatibilité complète et les licences restent à examiner.

Le chiffrement PostgreSQL, le déverrouillage des clés
et l'intégration SQLCipher ne sont pas définitivement décidés.

## Invariants à préserver

- Métier indépendant de l'interface.
- Permissions vérifiées par le moteur/API.
- Montants en représentation décimale exacte.
- Identifiants stables pour la synchronisation.
- Idempotence des opérations rejouables.
- Autorité unique pour les documents définitifs.
- Migrations propres à chaque moteur de stockage.
- Aucun écrasement silencieux de conflit.
- Provenance des documents historiques préservée.
- Boucle locale non assimilée à une authentification.
- Santé technique non assimilée à une disponibilité métier.

## Documents présents selon les retours

- README.md
- docs/PROJECT_STATE.md
- docs/FEATURE_MATRIX.md
- docs/architecture/0001-initial-architecture.md
- docs/KNOWN_LIMITS.md
- docs/security/THREAT_MODEL.md
- docs/security/KEY_MANAGEMENT.md
- docs/operations/BACKUP_RESTORE.md

La présence d'un document ne valide pas toutes ses propositions.

Le contrôle détaillé des 62 identifiants fonctionnels n'a pas été transmis.

Les documents de sécurité restent des spécifications,
pas une preuve d'implémentation.

## Lot 1.1 — Exécutable minimal

Fichiers fournis :

- backend/.gitignore
- backend/go.mod
- backend/cmd/factorealm/main.go
- backend/cmd/factorealm/main_test.go

Comportements :

- aide sans argument ;
- commandes help, -h et --help ;
- commande version ;
- refus des commandes inconnues ;
- refus des arguments supplémentaires ;
- gestion d'une erreur d'écriture de la sortie.

Vérifications déclarées réussies par l'utilisateur :

- formatage ;
- go test ;
- go vet ;
- compilation Windows ;
- aide et version ;
- code 2 pour une commande inconnue.

Les journaux détaillés de ces tests n'ont pas été transmis.

## Lot 1.2 — API technique locale

Fichiers concernés :

- backend/cmd/factorealm/main.go, modifié ;
- backend/internal/localapi/server.go, créé ;
- backend/internal/localapi/server_test.go, créé.

Comportements :

- commande serve ;
- écoute fixe sur 127.0.0.1:8080 ;
- GET /healthz ;
- refus des méthodes autres que GET sur cette route ;
- réponse 404 pour les autres chemins ;
- délais HTTP explicites ;
- arrêt sur Ctrl+C ;
- échec explicite si le port est occupé.

Configuration :

- ReadHeaderTimeout : 5 secondes ;
- ReadTimeout : 10 secondes ;
- WriteTimeout : 10 secondes ;
- IdleTimeout : 30 secondes ;
- délai d'arrêt contrôlé : 5 secondes ;
- MaxHeaderBytes : 16 * 1024.

Tests fournis :

- réponse de santé et en-têtes ;
- chemin inconnu ;
- sous-route inconnue ;
- POST et HEAD refusés ;
- valeurs de configuration ;
- contexte annulé avant démarrage ;
- port occupé ;
- erreur d'affichage ;
- cycle démarrage, requête locale et arrêt.

Les tests de cycle de vie utilisent un port local attribué par le système.

## Preuves et validations du lot 1.2

Sortie HTTP transmise par l'utilisateur :

    StatusCode: 200
    Content-Type: application/json; charset=utf-8
    Cache-Control: no-store
    Corps: {"status":"ok"}

Cette sortie confirme la réponse HTTP correspondante.

Le reste des vérifications a été déclaré réussi par l'utilisateur
avec le message « Tout est bon ».

| Vérification | État |
|---|---|
| GET /healthz | Résultat transmis et conforme |
| Content-Type et Cache-Control | Résultats transmis et conformes |
| Tests Go du lot 1.2 | Réussite rapportée |
| go vet | Réussite rapportée |
| Compilation Windows | Réussite rapportée |
| Arrêt par Ctrl+C et code de sortie | Réussite rapportée, sans sortie détaillée |
| Tests exécutés par l'assistant | Aucun |
| Clients lents et expiration réelle des délais | Non testés |
| Arrêt avec requêtes longues en cours | Non testé |
| Tests Linux ou VM | Non réalisés |
| Tests métier | Non réalisés |
| Audit de sécurité | Non réalisé |
| Tests de restauration | Non réalisés |
| Tests de charge | Non réalisés |

Une erreur d'écriture est simulée uniquement dans les tests.
Aucune fonctionnalité métier simulée n'est présentée comme réelle.

## État des étapes

- Étape 0 : cadrage engagé, décisions encore ouvertes.
- Étape 1 : en cours ; lots applicatifs 1.1 et 1.2 validés selon les retours.
- Étapes suivantes : non commencées.

Aucune étape complète n'est déclarée terminée.

## Limites actuelles

- Pas d'interface graphique.
- Pas d'intégration bureau.
- Pas d'API métier.
- Pas de base de données.
- Pas de chiffrement applicatif.
- Pas de comptes, sessions ou permissions.
- Pas de TLS ou configuration CORS.
- Pas de sauvegarde ou restauration.
- Pas de synchronisation.
- Pas d'installateur ou service système.
- Pas de validation Linux ou ARM64.
- Pas de conformité réglementaire annoncée.
- Audit des licences incomplet.

Le serveur technique ne doit pas être exposé sur Internet
ou enrichi de données sensibles avant les protections nécessaires.

AGPL-3.0 reste envisagée, non finalisée.

## Lot 1.3 — Synchronisation documentaire

Fichiers fournis à jour :

- README.md ;
- docs/PROJECT_STATE.md ;
- docs/KNOWN_LIMITS.md.

Ce lot ne modifie pas le programme.

Intégration et relecture par l'utilisateur : à confirmer.
Commit : non confirmé.

## Points à résoudre avant données sensibles

- Valider le modèle de menace.
- Choisir la gestion des clés et le déverrouillage.
- Décider du chiffrement du stockage serveur.
- Éprouver SQLCipher et ses dépendances.
- Mettre en place les autorisations nécessaires.
- Prévoir des sauvegardes cohérentes.
- Tester la récupération sur une autre machine.
- Examiner temporaires, caches, journaux et exports.

Ces points n'empêchent pas une interface technique sans données métier.
Ils empêchent de présenter le prototype comme un logiciel professionnel sécurisé.

## Prochaines actions

1. Intégrer et relire le lot 1.3.
2. Vérifier les versions et contraintes de la pile frontend.
3. Vérifier les licences des composants frontend retenus.
4. Proposer un petit lot d'interface technique sans données métier.
5. Définir son accès à l'API sans élargir inutilement l'exposition réseau.
6. Maintenir les tests Go existants.
7. Poursuivre le cadrage sécurité et les essais de stockage.
8. Consigner le nom exact du cahier des charges dans docs.
9. Ajouter release.md et l'inventaire des composants sans inventer de publication.

Ne pas commencer automatiquement le lot suivant.

## Commits

Messages proposés pour les lots applicatifs :

    feat: add minimal Go executable with command tests
    feat: add loopback health API with lifecycle tests

Message proposé pour le lot courant :

    docs: align project documentation with validated local API

Aucune création de commit ni référence de commit n'est confirmée.

## Procédure de reprise

Fournir :

- cahier des charges original ;
- ce fichier ;
- matrice des fonctionnalités ;
- limites connues ;
- décisions d'architecture concernées ;
- fichiers actuels à modifier ;
- derniers résultats de vérification disponibles.

Ne jamais transmettre de secrets ou de données personnelles réelles.

Ne pas supposer que les fichiers distants correspondent aux fichiers locaux.

Après chaque lot, consigner les versions, résultats, limites et prochaines
actions sans transformer un résultat attendu en résultat constaté.
