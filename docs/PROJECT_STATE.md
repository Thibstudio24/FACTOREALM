# État du projet Factorealm

## Usage de ce document

Ce fichier permet de reprendre le projet dans une nouvelle conversation
ou avec un autre contributeur.

Il doit distinguer les décisions, les propositions, les fichiers fournis
et les vérifications réellement effectuées.

Il ne remplace pas le cahier des charges original.

## Identification

- Projet : Factorealm
- Auteur initial : Thibstudio24
- Dépôt : Thibstudio24/FACTOREALM
- Branche publique consultée pendant le cadrage : main
- Date de cette rédaction : 2026-11-07
- Phase : étape 0, cadrage
- Lot courant : 0.1, référentiel documentaire
- Statut du lot : fourni pour intégration et vérification
- Validation de fin de lot : en attente

## Sources de référence

Le cahier des charges complet a été fourni dans la conversation initiale.

L'utilisateur indique également l'avoir placé dans le dossier docs du dépôt.
Le nom exact de ce fichier et son contenu dans le dépôt restent à confirmer.

Ne pas remplacer le cahier des charges original par les résumés de ce lot.
En cas de divergence, conserver la divergence comme point à résoudre.

## Environnement déclaré

| Élément | Information connue | À confirmer |
|---|---|---|
| Poste principal | Windows | Version, édition, build, architecture |
| Éditeur | VS Code | Version |
| Autre outil déclaré | Visual Studio Insider | Produit exact, version, composants |
| VM Linux | Disponible ou prévue | Distribution, version, architecture |
| VM Windows | Disponible ou prévue | Version, édition, architecture |
| Expérience | Intermédiaire | Aucun complément nécessaire au cadrage |
| Copie locale du dépôt | Non confirmée | Présence et modifications locales |
| Git | Non vérifié | Installation et version |
| Go | Non vérifié | Installation et version |
| Node.js et gestionnaire de paquets | Non vérifiés | Installation et versions |
| Rust et Cargo | Non vérifiés | Installation et versions |
| Outils de compilation native | Non vérifiés | Disponibilité par plateforme |
| PostgreSQL | Non vérifié | Installation et version |

Aucune version de dépendance n'est encore retenue.
Aucun fichier de verrouillage de dépendances n'est fourni.

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
- Chiffrement des données stockées et sauvegardes toujours chiffrées.
- Permissions contrôlées côté moteur/API.
- Aucun plafond commercial artificiel.
- Aucune promesse de conformité ou de capacité non vérifiée.
- Livraisons progressives, avec validation entre les lots.
- Conservation des identifiants de fonctionnalités d'origine.

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

Ces orientations ne valent pas validation de leur compatibilité,
de leurs licences ou de leur sécurité.

La stratégie de chiffrement PostgreSQL n'est pas figée.
SQLCipher et son intégration native doivent faire l'objet d'un essai.

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

## Livraisons et vérifications

| Élément | État |
|---|---|
| Analyse initiale du cahier des charges | Réalisée dans la conversation |
| Consultation du README public | Réalisée ; contenu observé : titre seul |
| Consultation du contenu de docs | Non aboutie |
| Autorisation de démarrer le lot 0.1 | Donnée par l'utilisateur |
| Contenus documentaires du lot 0.1 | Fournis dans la conversation |
| Enregistrement local des fichiers | À confirmer par l'utilisateur |
| Contrôle des éventuels fichiers préexistants | À effectuer |
| Vérification documentaire locale | À effectuer |
| Compilation | Non réalisée ; aucun code applicatif fourni |
| Tests automatisés | Non réalisés |
| Tests métier | Non réalisés |
| Tests de sécurité | Non réalisés |
| Tests de restauration | Non réalisés |
| Tests de charge | Non réalisés |
| Commit du lot | Non confirmé |

Aucune étape complète n'est encore validée.

## Points bloquants

Avant de modifier un fichier existant :

- connaître son contenu actuel ;
- vérifier l'absence de modifications locales à préserver.

Avant le socle compilable :

- connaître les versions et architectures des systèmes ;
- sélectionner et vérifier les versions des outils ;
- vérifier les licences des dépendances directes retenues ;
- clarifier le statut de Windows 10 dans les cibles ;
- éprouver la compilation native nécessaire au stockage local.

Avant de persister des données sensibles :

- définir le modèle de menace ;
- valider la gestion des clés et le déverrouillage ;
- décider du chiffrement du stockage serveur ;
- prévoir la récupération et les sauvegardes cohérentes.

## Prochaines actions

1. Intégrer les fichiers du lot 0.1 sans écraser de contenu inconnu.
2. Vérifier la matrice des fonctionnalités et les liens documentaires.
3. Confirmer le nom du fichier contenant le cahier des charges original.
4. Compléter les informations sur les environnements Windows et Linux.
5. Valider le lot 0.1.
6. Préparer un lot de cadrage sécurité : menaces, clés et récupération.
7. Vérifier la pile et ses licences avant tout engagement technique définitif.
8. Préparer ensuite le premier socle compilable.

Ne pas commencer automatiquement le lot suivant.

## Procédure de reprise

Lors d'une nouvelle conversation, fournir au minimum :

- le cahier des charges original ;
- ce fichier ;
- docs/FEATURE_MATRIX.md ;
- docs/KNOWN_LIMITS.md ;
- les décisions d'architecture concernées ;
- les fichiers actuels touchés par la prochaine modification ;
- les résultats exacts des dernières vérifications.

Ne jamais transmettre de mots de passe, clés privées,
clés de récupération ou données personnelles réelles.

## Mise à jour de ce fichier

Après chaque lot validé :

- enregistrer ce qui a effectivement été intégré ;
- consigner les versions réellement utilisées ;
- identifier la machine et les commandes des tests réalisés ;
- noter les résultats et échecs ;
- mettre à jour les blocages et prochaines actions ;
- enregistrer la référence du commit si disponible.

Ne pas transformer un résultat attendu en résultat constaté.
