# Limites connues

## Statut général

Le projet est au stade documentaire.

Aucune fonctionnalité applicative n'est implémentée dans les lots fournis.
Aucune installation n'est présentée comme utilisable en production.

## Limites constatées du cadrage

| Point | Situation | Action attendue |
|---|---|---|
| Cahier des charges dans le dépôt | Nom exact non confirmé | Identifier et préserver le fichier original |
| Contenu du dossier docs | Consultation distante non aboutie | Vérifier localement avant toute création |
| Modifications locales | Inconnues | Ne pas écraser de fichier divergent |
| Windows principal | Version et architecture inconnues | Compléter l'environnement |
| VM Linux | Distribution et version inconnues | Définir une cible initiale |
| VM Windows | Version inconnue | Définir une cible initiale |
| Outils | Installations et versions non vérifiées | Contrôle guidé avant le code |

## Points techniques ouverts

- Versions exactes de Go, Node.js, React, Vite, Tauri et Rust.
- Pilote Go et chaîne de compilation SQLCipher.
- Bibliothèques PDF, polices et licences associées.
- Chiffrement du stockage PostgreSQL.
- Stockage des clés selon le système.
- Déverrouillage automatique ou manuel.
- Chiffrement des temporaires, index, caches et journaux.
- Format de sauvegarde et procédure de récupération.
- Transport sécurisé entre application bureau et moteur local.
- Politique de compatibilité client/serveur.
- Modèle de tâches, reprises et effets externes.
- Signature et distribution des mises à jour.

## Points métier ouverts

- Matrice des profils d'entreprise et cas effectivement couverts.
- Précisions décimales et règles d'arrondi.
- Séries de numérotation et transitions des documents.
- Cas de TVA, acomptes et avoirs.
- Périodes, validations et clôtures comptables.
- Règles d'import historique et stratégie d'annulation.
- Formats de facturation électronique et connecteurs retenus.
- Politique de rattrapage des automatisations.
- Protocole de bascule autonome/serveur.

Les obligations réglementaires devront être vérifiées au moment
de la conception et de l'implémentation concernées.

## Sécurité

Le modèle de menace et la stratégie de chiffrement ne sont pas finalisés.

Ne pas utiliser de données réelles dans les premiers prototypes.

Aucune protection absolue n'est promise contre :

- un système déjà compromis ;
- un administrateur système disposant d'un accès effectif aux secrets ;
- la conservation d'une ancienne copie hors ligne ;
- la perte de toutes les clés et de toute installation exploitable.

Une révocation de compte ne permet pas d'effacer instantanément
une machine durablement déconnectée.

## Plateformes

Aucune plateforme n'a fait l'objet d'une compilation ou d'un test
dans le cadre des lots fournis.

Aucun installateur Windows ou paquet Linux n'est disponible.

Le support de Windows 10 reste à clarifier selon l'édition,
sa maintenance et les dépendances retenues.

ARM64 doit être validé séparément.
Un résultat x64 ne vaut pas validation ARM64.

## Performances

Aucun test de charge n'a été exécuté.

Proposition de campagne initiale, non encore validée :

- serveur de référence : 4 cœurs, 8 Go de RAM, SSD ;
- 20 sessions actives ;
- 50 000 contacts ;
- 100 000 documents ;
- objectif indicatif : p95 inférieur à 500 ms pour des lectures
  paginées courantes sur réseau local.

Avant mesure, préciser :

- processeur et stockage exacts ;
- versions système et base ;
- volumétrie et taille des pièces jointes ;
- répartition des lectures et écritures ;
- débit de requêtes et scénario utilisateur ;
- état des caches ;
- durée de la campagne ;
- point de mesure et taux d'erreurs.

Le PDF, les transferts de fichiers et les traitements longs
auront leurs propres mesures.

Ces valeurs ne sont ni des garanties, ni des plafonds commerciaux,
ni des capacités démontrées.

## Licence et publication

AGPL-3.0 est envisagée mais non définitivement adoptée.

L'audit des dépendances et l'inventaire des composants restent à réaliser.
La politique de nom et de logo n'est pas rédigée.

Aucune version publiée, signature de publication ou clé de signature
n'est créée par ce lot.

Le fichier release.md sera ajouté dans un lot documentaire ultérieur,
sans inventer de version livrée.

## Hors périmètre initial

Ne pas ajouter sans décision explicite :

- multi-entreprises dans une installation ;
- multidevise ;
- OCR ou recherche plein texte dans les scans ;
- indemnités kilométriques ;
- synchronisation bancaire par agrégateur ;
- rapprochement bancaire automatique ;
- modules dédiés supplémentaires de grand livre et balance ;
- application mobile native ;
- portail public de signature ;
- compte bancaire ou carte bancaire Factorealm.

Les devis signés sont signés à l'extérieur puis réimportés.
Aucun service de signature certifiée n'est annoncé.

## Validations absentes

- Compilation et tests unitaires.
- Parcours web et bureau.
- Tests d'autorisation.
- Tests de chiffrement et récupération.
- Tests de migrations.
- Tests de sauvegarde et restauration.
- Tests d'installateurs et mises à jour.
- Tests multiarchitecture.
- Tests de charge.
- Revue comptable.
- Validation FEC.
- Validation des connecteurs de facturation électronique.
- Audit de licences.
- Audit de sécurité.

Cette liste doit être mise à jour avec des preuves,
pas avec des intentions.
