# Historique des changements de Factorealm

Ce fichier décrit les changements du projet.
Les versions publiées seront présentées de la plus récente à la plus ancienne.

Il ne constitue pas un manifeste de mise à jour.
Aucun installateur ne doit être sélectionné en analysant uniquement ce fichier.

## Non publié

### Statut

Socle technique en développement.

Aucune version stable, publication GitHub ou distribution binaire
n'est confirmée dans le suivi du projet.

Les lots de développement ne sont pas des versions publiées.

Le libellé backend dev et la version frontend 0.0.0
ne constituent pas une publication officielle.

### Ajouts

#### Backend

- Module Go utilisant uniquement la bibliothèque standard.
- Commandes help, version et serve.
- Refus explicite des commandes inconnues et arguments supplémentaires.
- Serveur HTTP technique sur 127.0.0.1:8080.
- Route GET /healthz.
- Réponses explicites pour les méthodes et chemins non pris en charge.
- Délais HTTP et arrêt contrôlé sur Ctrl+C.
- Tests des commandes, réponses HTTP et du cycle de vie du serveur.

#### Frontend

- Interface React et TypeScript en français.
- Serveur de développement limité à 127.0.0.1:5173.
- Relais de développement vers la seule route de santé.
- Vérification manuelle de la connexion par bouton.
- États initial, en cours, succès, indisponibilité et réponse inattendue.
- Délai maximal de cinq secondes pour la vérification.
- Absence de requête de santé automatique à l'ouverture.
- Séparation du composant, du point de démarrage et du module HTTP.
- Quinze tests du module HTTP.
- Six tests du composant React.

#### Documentation

- Présentation du projet.
- État permettant de reprendre le développement.
- Matrice des fonctionnalités avec identifiants d'origine.
- Architecture initiale.
- Modèle de menace proposé.
- Gestion des clés proposée.
- Procédure de sauvegarde et restauration proposée.
- Limites connues.
- Inventaire initial des composants.

### Vérifications disponibles

Sur le poste Windows de développement :

- Compilation et tests Go déclarés réussis par l'utilisateur.
- Réponse de santé HTTP transmise et conforme.
- Versions directes frontend transmises.
- Vérification TypeScript réussie.
- Vingt et un tests frontend réussis, sorties transmises.
- Construction Vite réussie, sortie transmise.
- Fonctionnement manuel confirmé par l'utilisateur.

Les détails et limites des preuves sont consignés dans
docs/PROJECT_STATE.md.

Ces résultats ne valident pas Linux, ARM64 ou une installation comme service.

### Corrections documentaires

- Distinction entre vérifications rapportées et sorties effectivement reçues.
- Retrait du suivi des affirmations non étayées de consultation du dépôt.
- Distinction entre les dates de mise à jour des documents
  et les dates de réalisation non établies des premiers lots.

### Changements incompatibles

Aucune compatibilité publique stable n'est engagée.

Le contrat de la route technique et les structures internes
restent susceptibles de changer pendant le développement.

### Migrations

Aucune base de données n'est intégrée.
Aucune migration de données n'est fournie.

### Avertissements

- Aucune fonctionnalité métier.
- Aucune authentification ou permission.
- Aucun chiffrement applicatif.
- Aucune sauvegarde ou restauration implémentée.
- Aucun installateur.
- Aucune intégration bureau.
- Aucune conformité réglementaire annoncée.
- Aucun usage professionnel réel autorisé par une déclaration de maturité.

Ne pas utiliser de données professionnelles réelles.
Ne pas exposer les serveurs de développement sur Internet.

Le frontend construit n'est pas encore distribué avec le serveur Go.
Le relais vers Go fonctionne dans la configuration de développement.

### Licence et distribution

AGPL-3.0 reste envisagée, non formellement adoptée.
Le paquet frontend est provisoirement marqué UNLICENSED.

L'inventaire transitif, les notices et les obligations de redistribution
restent à examiner avant publication.

## Règles pour les futures publications

Pour chaque version effectivement publiée, consigner :

- version ;
- date réelle de publication ;
- nouveautés ;
- corrections ;
- changements incompatibles ;
- migrations nécessaires ;
- avertissements ;
- plateformes réellement vérifiées ;
- limites de récupération après échec, si pertinentes.

Ne pas attribuer rétroactivement une date ou un numéro inventé
aux travaux non publiés.

La sélection des binaires nécessitera un manifeste structuré,
des contrôles de version et de plateforme et des signatures appropriées.
Ces mécanismes ne sont pas encore implémentés.
