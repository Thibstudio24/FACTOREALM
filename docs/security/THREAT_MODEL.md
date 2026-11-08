# Modèle de menace initial

## Statut

Proposition de conception, non implémentée et non auditée.

Ce document définit les protections attendues.
Il ne constitue pas une certification de sécurité.

## 1. Périmètre

Une seule entreprise par installation.

Modes concernés :

- serveur ;
- client installé avec cache hors connexion limité ;
- autonome ;
- navigateur et PWA connectés.

Aucun serveur central Factorealm ne participe au fonctionnement métier
ou à la récupération des clés d'entreprise.

## 2. Actifs à protéger

- Identité et informations de l'entreprise.
- Données des clients, fournisseurs et salariés.
- Documents commerciaux, comptables et justificatifs.
- Brouillons et copies locales.
- Identifiants, sessions et facteurs d'authentification.
- Secrets des services extérieurs.
- Clés opérationnelles et clés de récupération.
- Sauvegardes et exports.
- Intégrité des numérotations, validations et écritures.
- Historique des opérations.
- Disponibilité des données et capacité de restauration.

La clé de signature des publications appartient à une infrastructure
distincte des installations d'entreprise.

## 3. Frontières de confiance

### Interface et moteur

L'interface n'est jamais l'autorité des permissions ou des calculs métier.

Le moteur vérifie chaque opération sensible, même si l'interface masque
l'action correspondante.

### Réseau et serveur

Toute requête distante est considérée comme non fiable avant validation.

Aucune exposition Internet automatique n'est prévue.

Les communications contenant des données sensibles doivent utiliser
un transport protégé. Le déploiement TLS, les certificats et l'accès
par VPN seront décrits dans une décision dédiée.

### Application bureau et moteur local

Un processus local n'est pas automatiquement digne de confiance.

Le transport doit être authentifié et limité au contexte prévu.
Le mécanisme exact reste à sélectionner.

### Base et documents

Les permissions du moteur ne remplacent pas celles du système.

Le compte de service doit disposer des seuls accès nécessaires.
Les fichiers utilisateurs ne doivent jamais être exécutés.

### Installation et sauvegarde

Une sauvegarde est une copie sensible indépendante de l'installation.

Elle doit être chiffrée, contrôlée à la restauration et soumise
à une gestion explicite de l'autorité d'émission.

## 4. Menaces et contrôles prévus

| Menace | Contrôles prévus | Validation attendue |
|---|---|---|
| Vol d'un support éteint | Chiffrement et protection des clés | Essai d'accès sans secrets autorisés |
| Vol d'un poste déverrouillé | Verrouillage applicatif et cache limité | Scénarios de verrouillage et expiration |
| Compte dépassant ses droits | Refus par défaut et permissions moteur/API | Tests d'accès interdits entre rôles |
| Accès direct à un objet | Contrôle du périmètre sur chaque accès | Tests sur identifiants connus ou devinés |
| Tentatives répétées de connexion | Limitation et journalisation mesurée | Tests des seuils et récupération |
| Import malveillant | Validation, limites et traitement non exécutable | Fichiers invalides, archives et chemins dangereux |
| Fuite par journaux | Exclusion des secrets et minimisation | Inspection des journaux de succès et d'échec |
| Fuite par fichiers intermédiaires | Inventaire et stockage protégé | Inspection des caches et temporaires |
| Mise à jour falsifiée | Signature et manifeste validé | Rejet des signatures et plateformes invalides |
| Interruption d'écriture | Transactions et reprise explicite | Arrêts pendant les opérations |
| Perte de machine | Sauvegarde et récupération indépendante | Restauration sur environnement vierge |
| Ancienne copie hors ligne | Cache minimal et durée d'accès définie | Révocation suivie d'une reconnexion |
| Deux installations émettrices | Protocole de bascule et contrôle opérationnel | Exercices de migration et restauration |
| Service extérieur indisponible | Erreurs explicites et reprise contrôlée | Pannes simulées sans faux succès |

## 5. Hors connexion

Le cache client contient seulement les données autorisées et nécessaires.

Les permissions connues à la dernière synchronisation ne doivent pas
permettre de finaliser une facture hors connexion.

La politique suivante reste à décider :

- durée maximale sans revalidation ;
- conditions de déverrouillage ;
- données conservées ;
- traitement des brouillons lorsque l'accès expire.

Un compte révoqué ne peut pas être effacé instantanément d'un poste
durablement hors ligne.

Une purge à la reconnexion ne prouve pas la disparition d'une copie
précédemment extraite ou sauvegardée.

## 6. Limites assumées

Aucune protection absolue n'est promise contre :

- un système compromis pendant que les données sont accessibles ;
- un administrateur système capable d'observer le processus déverrouillé ;
- la copie volontaire de données auxquelles un utilisateur a accès ;
- la destruction de toutes les sauvegardes ;
- la perte de tous les moyens de récupération ;
- l'exploitation simultanée volontaire de copies restaurées indépendantes.

Le chiffrement ne remplace ni les permissions, ni les sauvegardes,
ni la maintenance du système.

Le journal applicatif ne sera pas présenté comme inviolable face
à un administrateur système.

## 7. Critères avant données sensibles

Avant tout usage avec des données réelles :

1. Valider la gestion des clés.
2. Vérifier le stockage chiffré de la base et des documents.
3. Examiner journaux, temporaires, caches et fichiers intermédiaires.
4. Tester les refus d'accès.
5. Tester une restauration sur une autre machine.
6. Documenter les limites de chaque plateforme.
7. Définir les procédures de maintenance et d'incident.

## 8. Décisions encore ouvertes

- Transport local bureau/moteur.
- Gestion des certificats réseau.
- Déverrouillage automatique du service.
- Politique d'expiration du cache hors connexion.
- Protection des secrets selon le système.
- Conservation et accès au journal.
- Bibliothèques cryptographiques et formats.
