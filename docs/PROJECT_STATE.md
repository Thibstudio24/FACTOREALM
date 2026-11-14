# État du projet Factorealm

## Usage de ce document

Ce fichier permet de reprendre le projet dans une nouvelle conversation
ou avec un autre contributeur.

Il distingue les décisions, les propositions, les fichiers fournis
et les vérifications rapportées ou réellement effectuées.

Il ne remplace pas le cahier des charges original.

## Identification

- Projet : Factorealm
- Auteur initial : Thibstudio24
- Dépôt déclaré : Thibstudio24/FACTOREALM
- Branche de travail locale : à confirmer
- Date de cette mise à jour : 2026-11-14
- Phase : étape 1, socle compilable
- Dernier lot applicatif validé par l'utilisateur : 1.1
- Lot documentaire courant : 1.1 bis
- Statut du lot documentaire : fourni, intégration à confirmer
- Prochain lot proposé : 1.2, API locale minimale

Les dates historiques des premiers lots ne sont pas établies.
Les anciennes dates de rédaction des 7 et 8 novembre 2026
ne doivent pas être utilisées comme preuves de réalisation.

## Sources de référence et vérification du dépôt

Le cahier des charges complet a été fourni dans la conversation initiale.

L'utilisateur indique également l'avoir placé dans le dossier docs du dépôt.
Le nom exact de ce fichier reste à confirmer.

Le contenu actuel de ce fichier d'état a été transmis par l'utilisateur
avant cette mise à jour.

Les anciennes affirmations de consultation du README public
et du dossier docs ne sont pas étayées par une consultation effective
dans l'échange concerné. Elles sont retirées du suivi des vérifications.

Ne pas considérer le dépôt distant comme synchronisé avec les fichiers
fournis dans la conversation sans confirmation.

Ne pas remplacer le cahier des charges original par les résumés.
En cas de divergence, documenter le point à résoudre.

## Environnement de développement

Informations issues du diagnostic transmis par l'utilisateur :

| Élément | Information rapportée | Limites |
|---|---|---|
| Poste principal | Windows 11 Professionnel | Machine de développement initiale |
| Version Windows | 10.0.26300, build 26300 | Support des dépendances à examiner au besoin |
| Architecture Go | windows/amd64 | Confirmée par la sortie de go version |
| PowerShell | 5.1.26100.9711 | Version du diagnostic transmis |
| Éditeur | VS Code | Version non renseignée |
| Git | 2.54.0.windows.1 | Accessible lors du diagnostic |
| Go | 1.27.3 | Installation et exécution confirmées par l'utilisateur |
| Node.js | 22.23.2 | Accessible ; pas encore validé pour le frontend |
| npm | 12.2.2 | Accessible ; pas encore validé pour le frontend |
| Visual Studio Build Tools 2022 | 17.14.37806.7 | Composants détaillés non vérifiés |
| Visual Studio Community 2026 | 18.12.12324.72 | Outils C++ x86/x64 détectés |
| Rust, Cargo et rustup | Non trouvés dans le PATH au diagnostic | Installation éventuelle ailleurs non exclue |
| Client PostgreSQL | Non trouvé dans le PATH au diagnostic | Ne permet pas de conclure sur un serveur installé |
| CMake | Non trouvé dans le PATH au diagnostic | Installation éventuelle ailleurs non exclue |
| VM Windows | Prévue pour les tests serveur ultérieurs | Version et architecture à préciser à cette étape |
| VM Linux | Prévue pour les tests serveur ultérieurs | Distribution, version et architecture à préciser |
| Expérience utilisateur | Intermédiaire | Aucun complément nécessaire |

Sortie Go transmise :

    go version go1.27.3 windows/amd64

Ces informations décrivent l'environnement rapporté.
Elles ne constituent pas une validation de compatibilité de toute la pile.

## Versions utilisées dans le premier module

- Module : github.com/Thibstudio24/FACTOREALM/backend
- Directive du fichier go.mod fourni : go 1.27.3
- Version de Go exécutée chez l'utilisateur : 1.27.3
- Dépendances Go externes : aucune dans le lot 1.1
- Bibliothèques utilisées : bibliothèque standard Go
- Frontend, Tauri, SQLCipher et PostgreSQL : pas encore intégrés

La version fournie par l'utilisateur est consignée sans affirmer
qu'il s'agit de la dernière version disponible.

## Décisions issues du cahier des charges

- Une seule entreprise par installation.
- Trois modes : serveur, client installé et autonome.
- Moteur métier commun autant que possible.
- Interface française, web et bureau, responsive pour le mobile.
- Pas d'application mobile native dans le périmètre initial.
- Pas de travail métier hors connexion dans la PWA.
- Pas de finalisation de facture hors connexion dans un client.
- Finalisation locale possible en autonome.
- Pas de serveur central Factorealm nécessaire au métier.
- Pas d'abonnement obligatoire.
- Chiffrement des données stockées.
- Sauvegardes toujours chiffrées.
- Permissions contrôlées côté moteur/API.
- Aucun plafond commercial artificiel.
- Aucune promesse de conformité ou de capacité non vérifiée.
- Livraisons progressives, avec validation entre les lots.
- Conservation des identifiants de fonctionnalités d'origine.
- Aucune donnée professionnelle réelle dans les prototypes initiaux.

## Orientations techniques

L'utilisateur privilégie PostgreSQL pour le serveur.

Architecture de travail :

- monolithe modulaire ;
- métier et API en Go ;
- interface TypeScript, React et Vite ;
- application installée Tauri ;
- Rust limité autant que possible à l'intégration système ;
- PostgreSQL côté serveur ;
- SQLCipher pour l'autonome et le stockage local client.

Ces orientations ne valent pas validation de compatibilité,
de licences ou de sécurité.

La stratégie de chiffrement PostgreSQL n'est pas figée.
SQLCipher et son intégration native doivent faire l'objet d'un essai.

La politique de déverrouillage manuel ou automatique n'est pas arrêtée.

## Règles d'architecture à préserver

- Le métier ne dépend pas de l'interface.
- Les permissions sont vérifiées par le moteur/API.
- Les montants utilisent une représentation décimale exacte.
- Les objets destinés à la synchronisation possèdent des identifiants stables.
- Les opérations rejouables doivent être idempotentes.
- Les documents définitifs ont une autorité unique.
- Les migrations PostgreSQL et SQLCipher sont explicitement suivies.
- Aucun conflit de synchronisation ne doit être écrasé silencieusement.
- Les documents historiques importés restent identifiables comme tels.
- Une écoute locale n'est pas présentée comme une authentification.
- Une route de santé technique ne prouve pas la disponibilité du métier.

## Documents fournis et présence rapportée

| Fichier | Situation |
|---|---|
| README.md | Présence constatée dans le diagnostic utilisateur |
| docs/PROJECT_STATE.md | Version actuelle transmise avant cette mise à jour |
| docs/FEATURE_MATRIX.md | Présence constatée dans le diagnostic utilisateur |
| docs/architecture/0001-initial-architecture.md | Présence constatée dans le diagnostic utilisateur |
| docs/KNOWN_LIMITS.md | Présence constatée dans le diagnostic utilisateur |
| docs/security/THREAT_MODEL.md | Présence constatée dans le diagnostic utilisateur |
| docs/security/KEY_MANAGEMENT.md | Présence confirmée ultérieurement par l'utilisateur |
| docs/operations/BACKUP_RESTORE.md | Présence confirmée ultérieurement par l'utilisateur |

La présence d'un fichier ne prouve pas sa correspondance exacte
avec le contenu fourni ni la validation de toutes ses propositions.

Le résultat détaillé du contrôle des 62 identifiants fonctionnels
n'a pas été transmis.

Les documents de sécurité sont des spécifications.
Le chiffrement, les permissions et la restauration ne sont pas implémentés.

## Code fourni dans le lot 1.1

Fichiers :

- backend/.gitignore
- backend/go.mod
- backend/cmd/factorealm/main.go
- backend/cmd/factorealm/main_test.go

Comportements :

- aide lorsqu'aucun argument n'est fourni ;
- commandes help, -h et --help ;
- commande version affichant Factorealm dev ;
- refus des commandes inconnues ;
- refus des arguments supplémentaires ;
- traitement d'une erreur d'écriture de la sortie.

Aucun port réseau n'est ouvert.
Aucune donnée n'est persistée.
Aucun compte ou secret n'est utilisé.

Le libellé dev n'est pas une publication numérotée.

## Vérifications rapportées pour le lot 1.1

L'utilisateur a indiqué que toutes les vérifications étaient bonnes.

Les commandes demandées étaient :

- gofmt sur les deux fichiers Go ;
- go test -v ./... ;
- go vet ./... ;
- go build -trimpath -o ./bin/factorealm.exe ./cmd/factorealm ;
- exécution de version ;
- exécution de help ;
- vérification du code 2 pour une commande inconnue.

| Élément | État |
|---|---|
| Installation de Go | Confirmée par l'utilisateur |
| Version exacte de Go | Sortie transmise : 1.27.3 windows/amd64 |
| Tests automatisés du lot 1.1 | Réussite rapportée par l'utilisateur |
| Analyse go vet | Réussite rapportée par l'utilisateur |
| Compilation Windows | Réussite rapportée par l'utilisateur |
| Exécution des commandes prévues | Réussite rapportée par l'utilisateur |
| Journaux détaillés des tests | Non transmis |
| Commandes exécutées par l'assistant | Aucune |
| Tests Linux | Non réalisés |
| Tests en VM | Non réalisés |
| Tests métier | Non réalisés |
| Tests de sécurité globaux | Non réalisés |
| Tests de restauration | Non réalisés |
| Tests de charge | Non réalisés |
| Commit des lots | Non confirmé |

Le test d'échec d'écriture utilise une panne simulée limitée au test.
Aucune fonctionnalité métier simulée n'est présentée comme réelle.

## État des étapes

- Étape 0 : cadrage engagé, décisions techniques et sécurité encore ouvertes.
- Étape 1 : en cours, premier lot compilable validé par l'utilisateur.
- Étapes suivantes : non commencées.

Aucune étape complète n'est déclarée terminée.

## Limites actuelles

- Pas d'API.
- Pas d'interface web.
- Pas d'intégration bureau.
- Pas de base de données.
- Pas de chiffrement applicatif.
- Pas de comptes ni de permissions.
- Pas de sauvegarde ni de restauration.
- Pas de synchronisation.
- Pas de fonctionnalité métier.
- Pas d'installateur.
- Pas de validation Linux ou ARM64.
- Pas de preuve de conformité réglementaire.
- Pas d'audit exhaustif des licences.

Le README et les documents initiaux peuvent encore décrire le projet
comme purement documentaire. Leur actualisation reste à prévoir,
à partir de leurs contenus actuels.

Le choix AGPL-3.0 reste envisagé, non finalisé.
Aucun audit de compatibilité des composants futurs n'est terminé.

## Points à résoudre avant données sensibles

- Valider le modèle de menace et ses conséquences.
- Choisir la gestion des clés et le déverrouillage.
- Décider du chiffrement du stockage serveur.
- Éprouver SQLCipher et ses dépendances natives.
- Prévoir les sauvegardes cohérentes.
- Tester une restauration sur une autre machine.
- Mettre en place les contrôles d'autorisation nécessaires.
- Examiner temporaires, caches, journaux et exports intermédiaires.

Ces points n'empêchent pas un essai HTTP local sans données métier.
Ils empêchent de présenter cet essai comme un serveur professionnel sécurisé.

## Prochaines actions

1. Intégrer et relire cette mise à jour documentaire.
2. Confirmer que les fichiers Go n'ont pas changé depuis le lot 1.1.
3. Préparer le lot 1.2 : commande serve et route locale /healthz.
4. Limiter l'écoute du prototype à 127.0.0.1.
5. Tester la route et les erreurs de démarrage.
6. Ne pas ajouter de données ou d'opérations métier à cette route.
7. Actualiser les autres documents devenus obsolètes.
8. Confirmer le nom du cahier des charges dans docs.
9. Poursuivre les validations techniques et de sécurité par petits lots.

Ne pas commencer automatiquement le lot suivant.

## Procédure de reprise

Lors d'une nouvelle conversation, fournir au minimum :

- le cahier des charges original ;
- ce fichier ;
- docs/FEATURE_MATRIX.md ;
- docs/KNOWN_LIMITS.md ;
- les décisions d'architecture concernées ;
- les fichiers actuels touchés par la prochaine modification ;
- les résultats disponibles des dernières vérifications.

Ne jamais transmettre de mots de passe, clés privées,
clés de récupération ou données personnelles réelles.

Ne pas supposer que le dépôt distant contient la dernière version locale.

## Mise à jour de ce fichier

Après chaque lot validé :

- enregistrer ce qui a effectivement été intégré ;
- consigner les versions réellement utilisées ;
- identifier l'environnement des tests ;
- distinguer résultats transmis et validations générales rapportées ;
- noter les échecs et limites ;
- mettre à jour les blocages et prochaines actions ;
- enregistrer la référence du commit si disponible.

Ne pas transformer un résultat attendu en résultat constaté.

