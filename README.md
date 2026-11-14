# Factorealm

Projet initié par Thibstudio24.

Factorealm vise à devenir un logiciel open source de gestion commerciale
et de comptabilité pour les entreprises françaises.

Une seule entreprise est prévue par installation.

## État actuel

Le projet dispose d'un socle technique comprenant :

- un exécutable Go ;
- une API HTTP locale avec une route de santé ;
- une interface React et TypeScript ;
- une vérification manuelle de la connexion depuis l'interface ;
- des tests Go ;
- 15 tests frontend du module HTTP ;
- 6 tests frontend du composant React.

Les tests frontend, la vérification TypeScript et la construction ont réussi
sur le poste Windows de développement selon les sorties transmises.

Les vérifications Go et le fonctionnement manuel ont été confirmés
par l'utilisateur.

Aucune fonctionnalité métier n'est encore implémentée.
Ce projet n'est pas prêt pour un usage professionnel.

## Objectifs

- Fonctionnement sans abonnement obligatoire.
- Données hébergées par l'entreprise sur ses machines ou son VPS.
- Aucun serveur central Factorealm nécessaire au fonctionnement métier.
- Interface française, accessible et responsive.
- Moteur métier partagé entre serveur et autonome.
- Aucun plafond commercial artificiel.
- Capacités mesurées et limites publiées.
- Développement progressif avec vérification de chaque lot.

## Modes prévus

### Serveur

Service hébergeant les comptes, données, documents, API et interface web.

### Client installé

Application connectée au serveur, avec cache local chiffré
et travail hors connexion limité au périmètre autorisé.

Aucune finalisation de facture hors connexion.

### Autonome

Application et moteur local sur une seule machine.
Finalisation locale possible sans Internet.

### Navigateur et PWA

Interface responsive, sans travail métier hors connexion.
Le cache statique devra rester distinct des données métier.

Ces modes complets ne sont pas encore disponibles.

## Architecture

- Go : moteur et API.
- React, TypeScript et Vite : interface web.
- Tauri : intégration bureau envisagée.
- PostgreSQL : stockage serveur envisagé.
- SQLCipher : stockage autonome et cache client envisagés.
- Monolithe modulaire, sans microservices initiaux.

Tauri, PostgreSQL et SQLCipher ne sont pas encore intégrés.

## Environnement validé

Poste de développement rapporté :

- Windows 11 Professionnel, build 26300.
- Architecture windows/amd64.
- Go 1.27.3.
- Node.js 22.23.2.
- npm 12.2.2.
- PowerShell 5.1.

Aucune validation Linux, ARM64 ou installation comme service
n'est encore disponible.

## Démarrer le backend

Depuis la racine du dépôt, dans PowerShell :

    Set-Location .\backend
    $env:GOTOOLCHAIN = "local"
    $env:GOPROXY = "off"
    go test -count=1 -timeout=30s -v ./...
    go vet ./...
    New-Item -ItemType Directory -Path .\bin -Force | Out-Null
    go build -trimpath -o .\bin\factorealm.exe ./cmd/factorealm

Arrêter l'exécutable avant de reconstruire son fichier.

Commandes disponibles :

    .\bin\factorealm.exe help
    .\bin\factorealm.exe version
    .\bin\factorealm.exe serve

Le serveur écoute exclusivement sur 127.0.0.1:8080.
Utiliser Ctrl+C dans son terminal pour l'arrêter.

La commande version affiche Factorealm dev.
Il ne s'agit pas d'une publication stable.

## Démarrer le frontend

Dans un second terminal, depuis la racine du dépôt :

    Set-Location .\frontend

Si package-lock.json est présent et correspond au package.json :

    npm.cmd ci --registry=https://registry.npmjs.org/

Cette installation nécessite l'accès au registre npm et peut exécuter
des scripts de dépendances. Elle reconstruit node_modules.

Ne pas supprimer le lockfile pour contourner une erreur.
Ne pas utiliser de correction forcée sans analyse.

Vérifications :

    npm.cmd run typecheck
    npm.cmd test
    npm.cmd run build

Démarrage de développement :

    npm.cmd run dev

Adresse à ouvrir dans le navigateur :

    http://127.0.0.1:5173

L'interface ne vérifie la connexion qu'après un clic sur le bouton.
Le résultat correspond au dernier contrôle, pas à une surveillance continue.

Le relais vers Go est configuré pour le développement uniquement.
Le dossier dist ne constitue pas encore une distribution autonome intégrée.

## Tests frontend

Deux fichiers couvrent 21 cas :

- src/health.test.ts : 15 tests de la requête HTTP ;
- src/App.test.tsx : 6 tests des états et interactions React.

Les tests utilisent des simulations limitées à leur environnement.
Ils ne nécessitent pas le serveur Go.

Ils ne remplacent pas des tests dans un navigateur réel
ni un audit d'accessibilité.

## Fichiers générés

À conserver dans Git :

- frontend/package-lock.json.

À ne pas versionner :

- frontend/node_modules ;
- frontend/dist ;
- backend/bin.

## Sécurité du prototype

- Aucun stockage métier.
- Aucun compte, session ou permission.
- Aucun chiffrement applicatif.
- Aucune authentification ni TLS.
- Serveurs de développement limités à la boucle locale.

Ne pas exposer ce prototype sur Internet.
Ne pas utiliser de données professionnelles réelles.

La boucle locale n'est pas un mécanisme d'autorisation.
La route de santé indique seulement que le processus HTTP répond.

## Documentation

- docs/PROJECT_STATE.md : reprise, versions et résultats.
- docs/FEATURE_MATRIX.md : périmètre fonctionnel et tests attendus.
- docs/KNOWN_LIMITS.md : limites.
- docs/architecture/0001-initial-architecture.md : architecture initiale.
- docs/security/THREAT_MODEL.md : modèle de menace proposé.
- docs/security/KEY_MANAGEMENT.md : gestion des clés proposée.
- docs/operations/BACKUP_RESTORE.md : récupération proposée.

Le cahier des charges original reste la référence.
Son nom exact dans docs reste à consigner.

## Licence et identité

AGPL-3.0 est envisagée mais pas encore formellement adoptée.

Le paquet frontend porte provisoirement UNLICENSED.
Cette situation doit être résolue avant de présenter le code
comme distribué sous AGPL-3.0.

L'inventaire des composants et l'examen des obligations de redistribution
restent à terminer.

Thibstudio24 est l'auteur initial.
Licence du code, attribution et politique du nom et du logo
seront traitées séparément.

## Avertissement

Aucune conformité comptable, fiscale ou réglementaire n'est annoncée.
Une revue professionnelle des règles sensibles sera nécessaire
avant usage réel.
