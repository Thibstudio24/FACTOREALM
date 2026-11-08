# ADR 0001 — Architecture initiale

## Statut

Orientation de travail pour le cadrage.

La livraison documentaire est autorisée.
La faisabilité technique, les versions, les licences et la sécurité
restent à valider avant de figer la pile.

## Contexte

Factorealm doit proposer trois modes d'installation pour une entreprise :

- serveur ;
- client installé ;
- autonome.

L'interface doit aussi fonctionner dans un navigateur et en PWA,
sans travail métier hors connexion dans ces deux cas.

Les modes doivent partager les règles métier sans devenir trois produits
indépendants.

## Orientation

Adopter un monolithe modulaire avec :

- interface TypeScript, React et Vite ;
- moteur métier et API en Go ;
- application installée Tauri ;
- Rust limité autant que possible à l'intégration système ;
- PostgreSQL côté serveur ;
- SQLCipher pour l'autonome et le cache client, sous réserve d'essai.

Aucun microservice n'est prévu initialement.

## Organisation logique prévue

- frontend/ : interface commune ;
- desktop/ : intégration bureau ;
- backend/ : métier, cas d'usage, API, stockage et intégrations ;
- migrations/ : migrations propres aux moteurs de stockage ;
- tests/ : tests transversaux et jeux de données fictifs ;
- packaging/ : services, installateurs et distribution ;
- docs/ : cahier des charges, décisions et exploitation.

Ce document ne crée pas ces répertoires applicatifs.

## Dépendances internes

Le métier ne dépend pas de l'interface, du transport HTTP
ou d'un moteur de base de données particulier.

Les cas d'usage orchestrent :

- les permissions ;
- les règles métier ;
- les transactions ;
- les accès aux données ;
- les événements et tâches nécessaires.

Les adaptateurs implémentent les accès PostgreSQL, SQLCipher,
documents, courriels et connecteurs.

Ne pas créer une abstraction générique sans besoin concret.
Les interfaces de stockage doivent correspondre aux cas d'usage réels.

## Exécution par mode

### Serveur

Le processus Go fournit l'API, l'accès web et les tâches.
Il fonctionne comme service et accède à PostgreSQL.

Les documents sont conservés dans un stockage géré séparément de la base.
Les sauvegardes doivent couvrir de façon cohérente les deux ensembles.

Le serveur est l'autorité pour les documents définitifs.

### Client installé

Tauri héberge l'interface et l'intégration système.

Le client communique avec le serveur et utilise un stockage local chiffré
pour les seules données autorisées hors connexion.

Un composant Go local réutilise les règles nécessaires aux brouillons.
Il ne dispose pas des capacités de finalisation réservées à l'autorité.

Le cache local n'est pas une copie complète du serveur par défaut.

### Autonome

Tauri lance le moteur Go local.
Ce moteur utilise SQLCipher et devient l'autorité de l'installation.

Il peut finaliser les documents sans Internet.

Un service permanent n'est pas obligatoire.
Le rattrapage des tâches doit suivre des règles explicites.

### Navigateur et PWA

L'interface communique avec le serveur.

Le cache statique autorisé ne doit pas devenir un stockage métier
hors connexion. La politique de cache et les réponses sensibles
devront être testées explicitement.

## Communication locale

Le mécanisme exact reste à choisir et à tester.

Exigences :

- aucune écoute réseau publique par défaut ;
- authentification de la communication locale ;
- secrets absents des journaux et arguments visibles ;
- vérification de l'origine et des sessions selon le transport ;
- gestion de la durée de vie du moteur et des erreurs de démarrage.

Une adresse de boucle locale ne constitue pas à elle seule
une frontière de sécurité suffisante pour notre conception.

## Stockage

### PostgreSQL

Orientation privilégiée par l'utilisateur pour le serveur.

Le chiffrement complet du stockage est une décision encore ouverte.
Une préparation du stockage système chiffré est envisagée,
mais elle n'est pas approuvée comme procédure d'installation définitive.

### SQLCipher

Candidat pour l'autonome et le client.

À vérifier avant adoption :

- pilote Go ;
- compilation native Windows et Linux ;
- support des architectures ;
- bibliothèques cryptographiques ;
- licences de tous les composants distribués ;
- ouverture, migration, sauvegarde et récupération.

### Deux moteurs

Les migrations sont propres à chaque moteur.

Un ensemble de tests contractuels communs devra vérifier les propriétés
métier et transactionnelles attendues.

Ne pas supposer qu'une requête, un niveau d'isolation ou une contrainte
se comporte identiquement dans les deux moteurs.

## Invariants métier

- Représentation décimale exacte des montants et quantités concernés.
- Règles d'arrondi explicites.
- Calculs de référence dans le moteur.
- Identifiants stables.
- Finalisation et numérotation transactionnelles.
- Protection des documents définitifs.
- Corrections tracées.
- Écritures comptables équilibrées.
- Références historiques importées préservées.

La bibliothèque décimale et les précisions des champs restent à choisir.

La conservation du document définitif devra comprendre les données figées
et le rendu exact. La coordination entre base, fichier PDF et reprise
après incident doit encore être spécifiée.

## Synchronisation

Préparer dès les premiers modèles :

- identifiants stables ;
- versions des objets ;
- opérations idempotentes ;
- suivi des changements ;
- suppressions logiques lorsque nécessaires.

La fusion de champs compatibles et les conflits explicites
seront implémentés dans une étape dédiée.

Une révocation ne doit pas être présentée comme supprimant immédiatement
les données d'une machine durablement hors ligne.

## Autorité et bascule

Distinguer :

- copie de consultation ;
- sauvegarde ;
- transfert d'autorité vers une nouvelle installation.

Une sauvegarde restaurée ne doit pas devenir implicitement une seconde
autorité d'émission.

Le protocole de bascule, la mise en lecture seule de la source
et les contrôles de reprise restent à définir et à tester.

## Sécurité

Un document dédié définira le modèle de menace.

Points à traiter avant les données sensibles :

- déverrouillage manuel ou automatique ;
- séparation des clés opérationnelles et de récupération ;
- protection des pièces jointes, temporaires, caches et journaux ;
- récupération sur une nouvelle machine ;
- remplacement des administrateurs ;
- contrôle des exports ;
- restauration cohérente ;
- limites face à un système compromis.

Les contrôles nécessaires au prototype ne doivent pas être reportés
à une étape administrative ultérieure.

## Plateformes envisagées

Aucune ligne de cette matrice n'est testée.

| Cible | Orientation | Conditions |
|---|---|---|
| Serveur Windows x64 | Prévu | Version, service, stockage chiffré |
| Client Windows x64 | Prévu | Windows et dépendances à vérifier |
| Autonome Windows x64 | Prévu | Compilation et récupération SQLCipher |
| Serveur Linux x64 | Prioritaire pour les premiers essais serveur | Distribution à fixer |
| Client Linux x64 | Prévu en .deb | Distribution et environnement graphique |
| Autonome Linux x64 | Prévu en .deb | Dépendances natives |
| Serveur Linux ARM64 | Prévu après les premiers essais x64 | Compilation et tests dédiés |
| Autres combinaisons | Non engagées | Décision explicite nécessaire |

Windows 10 reste une cible demandée dont le statut doit être clarifié.
Aucun contournement par dépendance obsolète n'est autorisé.

## Alternative examinée

SQLCipher pour tous les modes, y compris le serveur, reste une alternative
si les essais montrent un bénéfice suffisamment important.

Elle n'est pas retenue actuellement.

Toute réévaluation devra comparer :

- concurrence ;
- simplicité d'exploitation ;
- chiffrement ;
- migrations ;
- charge mesurée ;
- coût de maintenance.

## Compromis acceptés comme hypothèses de travail

- Deux moteurs impliquent des migrations et tests supplémentaires.
- Tauri, Go et SQLCipher impliquent plusieurs chaînes de compilation.
- L'autonome et la synchronisation augmentent les exigences de récupération.
- La simplicité d'interface ne supprime pas la complexité métier.
- Le chiffrement nécessite une procédure opérationnelle explicite.

## Conditions avant adoption définitive

1. Environnements de développement identifiés.
2. Versions maintenues sélectionnées et vérifiées.
3. Inventaire initial des licences établi.
4. Compilation minimale web, Go et Tauri réussie.
5. SQLCipher compilé et testé sur les cibles initiales.
6. Chiffrement serveur et gestion des clés décidés.
7. Premier cycle de migration et restauration éprouvé.
8. Matrice de support ajustée aux résultats réels.

Un échec à ces étapes doit entraîner une décision documentée,
pas un contournement silencieux.
