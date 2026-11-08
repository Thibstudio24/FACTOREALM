# Factorealm

Projet initié par Thibstudio24.

Factorealm vise à devenir un logiciel open source de gestion commerciale
et de comptabilité pour les entreprises françaises.

Une seule entreprise est gérée par installation.

## État actuel

Le projet est en phase de cadrage.

Ce dépôt ne constitue pas encore une application utilisable.
Aucune compatibilité de plateforme, performance, sécurité globale
ou conformité réglementaire n'est actuellement validée.

Les documents de cadrage ne constituent pas une preuve d'implémentation.
Les résultats des vérifications seront consignés dans
docs/PROJECT_STATE.md.

Ne pas utiliser de données professionnelles réelles pendant les prototypes.

## Objectifs

- Fonctionner sans abonnement obligatoire.
- Conserver les données sur les machines ou le VPS de l'entreprise.
- Ne pas nécessiter de serveur central Factorealm pour le fonctionnement métier.
- Proposer une interface française, accessible et responsive.
- Partager le même moteur métier entre les modes d'installation.
- Ne pas imposer de plafond commercial artificiel sur les utilisateurs,
  contacts ou documents.
- Mesurer les capacités réelles et publier les limites testées.
- Livrer progressivement des fonctionnalités vérifiables et maintenables.

## Modes prévus

### Serveur

Le serveur héberge les données, les comptes, les documents,
l'API et l'interface web. Il fonctionne comme service.

L'installation d'un client sur la même machine sera une option.

### Client installé

Le client se connecte au serveur de l'entreprise.

Son stockage local sera chiffré. Le travail hors connexion sera limité
à la consultation autorisée et aux brouillons prévus par le cahier des charges.

La finalisation des factures et l'attribution des numéros définitifs
seront interdites hors connexion.

### Autonome

L'application et ses données sont sur le même ordinateur.
Le moteur local est l'autorité de cette installation.

La finalisation locale ne nécessite pas de connexion Internet.
Aucun compte en ligne obligatoire n'est prévu.

### Navigateur et PWA

L'interface web sera adaptée au mobile.

Le travail métier hors connexion n'est pas prévu pour le navigateur
ou la PWA. Leur cache statique devra être séparé des données métier.

## Orientation technique

Les choix suivants sont des orientations de travail, pas une matrice
de compatibilité déjà validée :

- interface : TypeScript, React et Vite ;
- moteur métier et API : Go ;
- application installée : Tauri, avec Rust limité à l'intégration système ;
- stockage serveur : PostgreSQL ;
- stockage autonome et local client : SQLCipher, sous réserve de faisabilité ;
- architecture : monolithe modulaire, sans microservices initiaux.

Les versions et licences des dépendances restent à vérifier avant adoption.

Le chiffrement du stockage PostgreSQL, la gestion des clés et
les compilations natives sont des points de validation prioritaires.

## Sécurité et données

Exigences du projet :

- chiffrement des bases, pièces jointes et copies locales ;
- sauvegardes toujours chiffrées ;
- clé de récupération propre à l'entreprise ;
- aucune conservation centrale des clés ;
- contrôles d'autorisation dans le moteur et l'API ;
- aucune télémétrie imposée ;
- aucun secret dans le dépôt ;
- services extérieurs explicitement configurés ;
- exports soumis à des permissions distinctes.

Ces exigences ne sont pas encore implémentées.

## Périmètre et suivi

Le cahier des charges original demeure la référence de périmètre.
Son emplacement exact dans le dépôt reste à confirmer.

Documents de suivi :

- docs/PROJECT_STATE.md : décisions, environnement et reprise du travail ;
- docs/FEATURE_MATRIX.md : fonctionnalités, état et validations attendues ;
- docs/architecture/0001-initial-architecture.md : architecture initiale ;
- docs/KNOWN_LIMITS.md : limites et points bloquants.

Les identifiants des fonctionnalités sont conservés tels qu'ils apparaissent
dans le cahier des charges. Les numéros absents ne sont pas réattribués.

## Développement

Le développement se fait par petits lots cohérents.

Chaque lot doit préciser :

1. son objectif ;
2. ses prérequis ;
3. les fichiers concernés et leur contenu complet ;
4. les commandes éventuelles ;
5. les vérifications et résultats attendus ;
6. ce qui a été réellement testé ;
7. les limites et blocages.

Aucune compilation ni commande d'installation de l'application
n'est disponible à ce stade.

## Licence et identité

AGPL-3.0 est la licence envisagée.
Le choix définitif reste soumis à l'examen des dépendances
et à la validation du titulaire des droits.

Ce document n'attribue pas à lui seul une licence au code.
Le fichier de licence et l'inventaire des composants seront ajoutés
après validation.

Thibstudio24 doit être identifié comme auteur initial.

La licence du code, les mentions d'attribution et la politique
d'utilisation du nom et du logo Factorealm seront traitées séparément.

## Avertissement

Factorealm n'est pas prêt pour un usage professionnel réel.

Aucune conformité comptable, fiscale ou réglementaire n'est annoncée.
Les règles métier sensibles devront être examinées par un professionnel
compétent avant un tel usage.
