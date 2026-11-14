# Limites connues

## Statut

Factorealm est un socle technique en développement.

Il comprend un serveur Go local et une interface React.
Il ne contient aucune fonctionnalité métier utilisable en production.

## Fonctionnement confirmé

Selon les sorties et retours de l'utilisateur :

- compilation Windows du backend ;
- tests Go et go vet ;
- réponse HTTP locale ;
- installation des dépendances frontend ;
- vérification TypeScript ;
- construction Vite ;
- 15 tests du module HTTP ;
- 6 tests du composant React ;
- utilisation manuelle de l'interface avec l'API.

Les 21 résultats frontend ont été transmis.
Les résultats détaillés des tests Go n'ont pas été transmis.

Aucune commande n'a été exécutée par l'assistant.

## Réseau et distribution

- Go écoute sur 127.0.0.1:8080.
- Vite écoute sur 127.0.0.1:5173.
- Le relais /healthz appartient à la configuration de développement.
- Pas de TLS, authentification ou permissions.
- Pas de configuration CORS permissive.
- Pas d'installation comme service.
- Pas de distribution intégrée du frontend construit.

Ne pas exposer les serveurs de développement sur Internet.
Ne pas élargir leur adresse d'écoute sans conception explicite.

La boucle locale ne constitue pas une autorisation.

## Santé technique

La route /healthz indique uniquement que le processus répond.

Elle ne vérifie aucun stockage, chiffrement, compte ou système de sauvegarde.

L'écran affiche le résultat du dernier contrôle manuel.
Il ne surveille pas continuellement le serveur.

## Limites des tests

Les tests frontend utilisent des réponses simulées.
Les tests React utilisent jsdom.

Ils ne remplacent pas :

- un navigateur réel ;
- un audit d'accessibilité ;
- des essais clavier et lecteur d'écran complets ;
- des tests réseau de bout en bout ;
- des tests de charge.

Non testés spécifiquement :

- démontage du composant pendant une requête ;
- délai expirant pendant une lecture HTTP partielle réelle ;
- clients HTTP lents côté Go ;
- arrêt Go avec requêtes longues en cours ;
- installation comme service ;
- comportement prolongé sous charge.

Les tests du délai côté frontend ne prouvent pas tous les comportements
possibles d'un navigateur ou d'un réseau réel.

## Plateformes

Environnement validé limité au poste de développement :

- Windows 11 Professionnel, build 26300 ;
- windows/amd64 ;
- Go 1.27.3 ;
- Node.js 22.23.2 ;
- npm 12.2.2.

Les VM sont réservées aux essais ultérieurs.

Aucun résultat Linux ou ARM64.
Aucun installateur .exe ou paquet .deb.

Le support Windows 10 reste à clarifier.
Aucun contournement par dépendance obsolète n'est autorisé.

## Sécurité et données

Non implémentés :

- comptes et sessions ;
- permissions ;
- chiffrement des bases et pièces ;
- gestion des clés ;
- sauvegarde et restauration ;
- contrôle des exports ;
- journal métier ;
- validation des fichiers utilisateurs.

Aucune donnée professionnelle réelle ne doit être utilisée.

Les documents de sécurité sont des propositions de conception.

Aucune protection absolue n'est promise contre un système compromis,
un administrateur système ayant accès aux secrets ou la conservation
d'une ancienne copie hors ligne.

La révocation d'un compte ne permet pas d'effacer immédiatement
une machine durablement déconnectée.

## Dépendances et licences

Les versions directes sont fixées dans package.json.
Le lockfile généré doit être conservé.

Les licences déclarées ont été relevées pour les composants directs.
Leur inventaire formel et l'audit transitif ne sont pas terminés.

npm a rapporté zéro vulnérabilité lors des contrôles transmis.
Cela ne garantit pas l'absence de vulnérabilités.

AGPL-3.0 reste envisagée.
Le paquet frontend est provisoirement marqué UNLICENSED.

La politique du nom et du logo, les notices de redistribution
et la licence définitive restent à formaliser.

## Points techniques ouverts

- Intégration et compilation Tauri.
- Rust et dépendances système Windows/Linux.
- Communication bureau/moteur local.
- SQLCipher et son pilote Go.
- Chiffrement PostgreSQL.
- Protection et récupération des clés.
- Temporaires, caches, journaux et index.
- Génération PDF et licences des polices.
- Compatibilité client/serveur.
- Tâches, reprises et effets externes.
- Sauvegardes cohérentes et migrations.
- Signature et installation des mises à jour.
- Tests navigateur et CI.

## Points métier ouverts

- Matrice des profils d'entreprise couverts.
- Décimaux et arrondis.
- Numérotation et finalisation transactionnelle.
- TVA, acomptes et avoirs.
- Validation et clôture comptables.
- Imports historiques.
- Facturation électronique.
- Rattrapage des automatisations.
- Bascule d'autorité autonome/serveur.

Les règles réglementaires seront vérifiées lors de leur implémentation.
Aucune conformité n'est annoncée.

## Documentation et suivi

- Nom du cahier des charges dans docs à confirmer.
- Branche locale et synchronisation distante non vérifiées.
- Références de commits non transmises.
- Contrôle détaillé des 62 identifiants non transmis.
- release.md et inventaire des composants à créer.
- Manuel d'installation finale non disponible.

Les identifiants métier de FEATURE_MATRIX restent non implémentés :
les tests de l'écran technique ne constituent pas leur réalisation.

## Performances

Aucun test de charge métier.

Objectif exploratoire non validé :

- 4 cœurs, 8 Go de RAM, SSD ;
- 20 sessions actives ;
- 50 000 contacts ;
- 100 000 documents ;
- p95 inférieur à 500 ms pour certaines lectures paginées sur réseau local.

Matériel, volumes de pièces, scénarios, débit, erreurs et protocole
devront être définis avant mesure.

Les temps de compilation et d'exécution des tests ne sont pas
des mesures de capacité métier.

Aucune capacité illimitée n'est promise.

## Hors périmètre initial

Sans décision explicite, ne pas ajouter :

- multi-entreprises ;
- multidevise ;
- OCR ou recherche dans les scans ;
- indemnités kilométriques ;
- agrégateur bancaire ;
- rapprochement automatique ;
- modules dédiés supplémentaires de grand livre et balance ;
- application mobile native ;
- portail public de signature ;
- compte bancaire ou carte Factorealm.

La signature des devis est réalisée à l'extérieur.
Aucune signature certifiée n'est annoncée.

## Validations professionnelles absentes

- Revue comptable.
- Validation FEC.
- Validation des connecteurs réglementaires.
- Audit de sécurité.
- Audit complet de licences.
- Tests de restauration.
- Tests d'installateurs et mises à jour.

Actualiser ce document avec des résultats vérifiables,
sans confondre intention et réalisation.
