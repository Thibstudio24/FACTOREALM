# Sauvegarde et restauration

## Statut

Spécification initiale.

Aucune commande de sauvegarde ou de restauration Factorealm
n'est disponible à ce stade.

## 1. Objectifs

Une sauvegarde doit permettre de restaurer un état cohérent comprenant :

- données structurées ;
- documents et justificatifs ;
- configurations nécessaires ;
- métadonnées de versions et de migrations ;
- clés opérationnelles sous protection récupérable.

La clé de récupération en clair ne doit pas être incluse dans l'archive.

Une sauvegarde ne contient pas automatiquement les secrets
de l'infrastructure système. Les exceptions doivent être documentées.

## 2. Exigences

- Sauvegardes toujours chiffrées.
- Intégrité vérifiée.
- Fréquence et destination choisies par l'entreprise.
- Conservation configurable.
- Statut et date du dernier succès visibles.
- Échec visible et journalisé sans secret.
- Pas de dépendance obligatoire à un cloud commercial.
- Pas de publication partielle présentée comme une sauvegarde réussie.

La disponibilité de la destination doit être contrôlée.
Une copie conservée seulement sur le disque de production
ne couvre pas la perte de ce disque.

## 3. Cohérence base et documents

La sauvegarde doit représenter un état dont les références
aux documents peuvent être résolues.

Première stratégie envisagée pour le prototype :

1. Passer temporairement en maintenance d'écriture.
2. Attendre la fin des opérations en cours.
3. Bloquer les tâches qui modifient l'état.
4. Produire une sauvegarde cohérente de la base.
5. Capturer les documents correspondant à cet état.
6. Finaliser et vérifier l'archive chiffrée.
7. Libérer la maintenance, y compris en cas d'échec.

La durée de blocage devra être mesurée.
Cette stratégie n'est pas encore adoptée pour tous les volumes.

Une stratégie ultérieure moins bloquante devra démontrer la même cohérence.

Ne pas copier naïvement les fichiers d'une base ouverte.

## 4. Flux de production

Le flux technique devra éviter une sauvegarde intermédiaire en clair
sur un emplacement non protégé.

Le résultat est d'abord écrit comme archive incomplète.
Il n'est déclaré utilisable qu'après finalisation et contrôles.

Le format devra permettre de détecter :

- troncature ;
- altération ;
- mauvais matériel de récupération ;
- version incompatible ;
- pièces manquantes.

Les métadonnées exposées avant déverrouillage doivent être minimales.

## 5. Autorisations

Depuis une installation existante, la restauration nécessite
une permission administrative sensible.

Sur une machine vierge, un parcours de récupération distinct est nécessaire :
il ne peut pas dépendre exclusivement des comptes de la base indisponible.

Ce parcours nécessite :

- accès local ou administratif explicitement autorisé ;
- sauvegarde ;
- clé de récupération ;
- confirmation des conséquences.

La possession de la clé de récupération confère un pouvoir important.
Elle doit être traitée comme telle dans la documentation.

## 6. Restauration proposée

1. Identifier la version source et les compatibilités.
2. Vérifier la sauvegarde.
3. Déverrouiller dans un environnement isolé.
4. Restaurer sans écraser immédiatement l'installation existante.
5. Contrôler base, documents et références.
6. Appliquer uniquement des migrations compatibles et prévues.
7. Examiner comptes, sessions et secrets de services extérieurs.
8. Décider du statut de la restauration.
9. Activer l'installation après confirmation.
10. Conserver un compte rendu sans secrets.

Les sessions restaurées doivent être invalidées.

Les courriels, récurrences et autres tâches à effets externes
restent suspendus jusqu'à examen explicite.

## 7. Autorité après restauration

Trois usages sont distincts :

- test isolé ;
- consultation ;
- remplacement de l'installation de production.

Un test ou une copie de consultation ne doit pas émettre de documents
définitifs ou déclencher d'envois.

Avant remplacement, l'ancienne autorité doit être arrêtée ou isolée
selon une procédure documentée.

Sans coordination centrale permanente, le logiciel ne peut pas garantir
qu'une ancienne copie indépendante ne sera jamais réactivée.

Le protocole doit combiner contrôles applicatifs, avertissements
et responsabilités opérationnelles explicites.

## 8. Conservation et rotation

La conservation doit tenir compte :

- de la durée souhaitée par l'entreprise ;
- de l'espace disponible ;
- des sauvegardes réellement réussies ;
- des changements de clés ;
- des besoins de récupération après migration.

Une sauvegarde ratée ne doit pas entraîner la suppression
de la dernière sauvegarde connue comme exploitable.

Le changement de clé de récupération nécessite une stratégie explicite
pour les archives anciennes : conservation de l'ancien moyen
de récupération ou reconditionnement contrôlé.

## 9. Programme de tests

Scénarios obligatoires :

- restauration sur machine vierge ;
- archive altérée ;
- archive tronquée ;
- mauvaise clé ;
- espace insuffisant ;
- destination indisponible ;
- interruption de sauvegarde ;
- interruption de restauration ;
- document manquant ;
- version incompatible ;
- migration nécessaire ;
- absence d'envoi automatique après restauration ;
- restauration de consultation sans droit d'émission.

Un test doit enregistrer :

- versions ;
- environnement ;
- volume de données ;
- durée ;
- résultat ;
- contrôles effectués ;
- limites constatées.

## 10. Objectifs de reprise

Aucun délai de reprise ni intervalle maximal de perte
n'est actuellement garanti.

Ils seront définis à partir :

- de la fréquence de sauvegarde ;
- du volume de données ;
- du matériel ;
- du temps de récupération mesuré ;
- des contraintes d'exploitation.

Une sauvegarde déclarée réussie n'est pas une preuve suffisante
de restaurabilité sans essais.
