# Factorealm

Projet initié par Thibstudio24.

Factorealm vise à devenir un logiciel open source de gestion commerciale
et de comptabilité pour les entreprises françaises.

Une seule entreprise est gérée par installation.

## État actuel

Le projet dispose d'un premier socle Go :

- exécutable en ligne de commande ;
- commandes d'aide et de version ;
- serveur HTTP technique limité à la boucle locale ;
- route GET /healthz ;
- tests automatisés des commandes et du serveur.

La compilation et les vérifications des lots 1.1 et 1.2 ont été déclarées
réussies par l'utilisateur sur son poste Windows.

La sortie du contrôle HTTP a été transmise et confirme une réponse 200,
un contenu JSON et la directive Cache-Control: no-store.

Il n'existe pas encore d'interface graphique, de stockage,
de compte utilisateur ou de fonctionnalité métier.

Ce socle n'est pas une application utilisable en production.
Ne pas y introduire de données professionnelles réelles.

## Objectifs

- Fonctionner sans abonnement obligatoire.
- Conserver les données sur les machines ou le VPS de l'entreprise.
- Ne pas nécessiter de serveur central Factorealm pour le fonctionnement métier.
- Proposer une interface française, accessible et responsive.
- Partager le même moteur métier entre les modes d'installation.
- Ne pas imposer de plafond commercial artificiel.
- Mesurer les capacités réelles et publier les limites testées.
- Livrer progressivement des fonctionnalités vérifiables et maintenables.

## Modes prévus

### Serveur

Le serveur hébergera les données, comptes, documents, API et interface web.
Il fonctionnera comme service.

L'installation d'un client sur la même machine sera une option.

### Client installé

Le client se connectera au serveur de l'entreprise.

Son stockage local sera chiffré. Le travail hors connexion sera limité
aux consultations autorisées et aux brouillons prévus.

La finalisation des factures et l'attribution de numéros définitifs
seront interdites hors connexion.

### Autonome

L'application et ses données seront sur le même ordinateur.
Le moteur local sera l'autorité de cette installation.

La finalisation locale ne nécessitera pas de connexion Internet.
Aucun compte en ligne obligatoire n'est prévu.

### Navigateur et PWA

L'interface web sera adaptée au mobile.

Le travail métier hors connexion n'est pas prévu dans le navigateur
ou la PWA. Leur cache statique devra être séparé des données métier.

## Orientation technique

- Interface envisagée : TypeScript, React et Vite.
- Moteur et API : Go.
- Application installée envisagée : Tauri.
- Rust limité autant que possible à l'intégration système.
- Stockage serveur envisagé : PostgreSQL.
- Stockage autonome et client envisagé : SQLCipher.
- Architecture : monolithe modulaire.

Seul le socle Go est actuellement intégré.

La compatibilité complète, les compilations natives, le chiffrement
et les licences des composants futurs restent à vérifier.

## Démarrer le socle technique

### Environnement validé selon le retour utilisateur

- Windows 11 Professionnel, build 26300.
- Architecture Go : windows/amd64.
- Go : 1.27.3.
- PowerShell : 5.1.

Aucune validation Linux, ARM64 ou installation comme service
n'est encore disponible.

### Module Go

Le module se trouve dans backend.

Il utilise uniquement la bibliothèque standard Go.
Aucune dépendance Go externe n'a été ajoutée.

Depuis la racine du dépôt, dans PowerShell :

    Set-Location .\backend
    $env:GOTOOLCHAIN = "local"
    $env:GOPROXY = "off"

Ces variables concernent le terminal courant.
Elles permettent de travailler avec l'installation Go locale
sans téléchargement de dépendances pour ce socle.

### Tests

Depuis backend :

    go test -count=1 -timeout=30s -v ./...
    go vet ./...

### Compilation

Depuis backend :

    New-Item -ItemType Directory -Path .\bin -Force | Out-Null
    go build -trimpath -o .\bin\factorealm.exe ./cmd/factorealm

Arrêter l'exécutable existant avant de le reconstruire.

Le dossier backend/bin est ignoré par le fichier backend/.gitignore.

### Commandes disponibles

Depuis backend :

    .\bin\factorealm.exe help
    .\bin\factorealm.exe version
    .\bin\factorealm.exe serve

La version affichée est Factorealm dev.
Il ne s'agit pas d'une publication numérotée.

Une commande inconnue ou des arguments supplémentaires
produisent un code de sortie 2.

### API technique locale

La commande serve écoute exclusivement sur 127.0.0.1:8080.

Dans un second terminal PowerShell :

    $response = Invoke-WebRequest -Uri "http://127.0.0.1:8080/healthz" -UseBasicParsing -TimeoutSec 5
    $response.StatusCode
    $response.Content

Résultat attendu :

    200
    {"status":"ok"}

La réponse utilise :

- Content-Type: application/json; charset=utf-8
- Cache-Control: no-store
- X-Content-Type-Options: nosniff

Seule la méthode GET est acceptée sur /healthz.
Les autres méthodes reçoivent une réponse 405.
Les chemins inconnus reçoivent une réponse 404.

Pour arrêter le serveur, utiliser Ctrl+C dans son terminal.

### Limites du serveur actuel

- Adresse et port fixes.
- Aucun accès distant prévu.
- Pas de TLS.
- Pas d'authentification.
- Pas de configuration CORS.
- Pas de stockage ni de données métier.
- Pas d'installation comme service.

La boucle locale n'est pas un mécanisme d'autorisation.
La route de santé indique uniquement que le processus répond.

Ne pas exposer ce prototype sur Internet.
Ne pas ajouter de route métier sensible sans les protections nécessaires.

## Sécurité et données

Exigences futures :

- chiffrement des bases, pièces jointes et copies locales ;
- sauvegardes toujours chiffrées ;
- récupération propre à l'entreprise ;
- aucune conservation centrale des clés ;
- contrôles d'autorisation côté moteur/API ;
- aucune télémétrie imposée ;
- aucun secret dans le dépôt ;
- services extérieurs explicitement configurés ;
- exports soumis à des permissions distinctes.

Ces protections ne sont pas encore implémentées.

## Documents de référence

- docs/PROJECT_STATE.md : état de reprise et vérifications.
- docs/FEATURE_MATRIX.md : fonctionnalités et tests attendus.
- docs/architecture/0001-initial-architecture.md : architecture initiale.
- docs/KNOWN_LIMITS.md : limites et points ouverts.
- docs/security/THREAT_MODEL.md : modèle de menace proposé.
- docs/security/KEY_MANAGEMENT.md : gestion des clés proposée.
- docs/operations/BACKUP_RESTORE.md : sauvegarde et restauration proposées.

Le cahier des charges original reste la référence.
Son nom exact dans docs reste à consigner.

Les identifiants de fonctionnalités sont conservés.
Les numéros absents ne sont pas réattribués.

## Méthode de développement

Chaque lot précise :

1. son objectif ;
2. ses prérequis ;
3. les fichiers et leur contenu complet ;
4. les commandes éventuelles ;
5. les critères de réussite ;
6. les vérifications réellement réalisées ou rapportées ;
7. les limites et blocages.

La validation d'un lot ne signifie pas que le logiciel est prêt
pour un usage professionnel.

## Licence et identité

AGPL-3.0 est la licence envisagée.
Le choix définitif reste soumis à l'examen des dépendances
et à la validation du titulaire des droits.

Ce document n'attribue pas à lui seul une licence au code.
Le fichier de licence et l'inventaire des composants restent à ajouter.

Thibstudio24 doit être identifié comme auteur initial.

La licence du code, les mentions d'attribution et la politique
d'utilisation du nom et du logo seront traitées séparément.

## Avertissement

Aucune conformité comptable, fiscale ou réglementaire n'est annoncée.
Les règles métier sensibles devront être examinées par un professionnel
compétent avant usage professionnel réel.
