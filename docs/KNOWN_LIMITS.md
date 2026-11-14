# Limites connues

## Statut général

Factorealm dispose d'un socle technique Go, pas d'une application métier.

Les lots 1.1 et 1.2 ont été validés selon les retours de l'utilisateur
sur son poste Windows.

Aucune aptitude à la production n'est annoncée.

## Ce qui existe

- Exécutable Go.
- Aide et version de développement.
- Refus des commandes invalides.
- Serveur local démarré par la commande serve.
- Route GET /healthz.
- Délais HTTP explicites.
- Arrêt contrôlé sur Ctrl+C.
- Tests automatisés des commandes et du serveur.

Le retour HTTP transmis confirme :

- statut 200 ;
- contenu JSON ;
- directive Cache-Control: no-store ;
- corps {"status":"ok"}.

Les sorties détaillées de go test, go vet et de compilation
n'ont pas été transmises. Leur réussite a été rapportée.

## Limites du serveur technique

- Écoute fixe sur 127.0.0.1:8080.
- Pas d'accès distant prévu.
- Pas de configuration de port via la commande.
- Pas de TLS.
- Pas d'authentification.
- Pas de sessions ni de permissions.
- Pas de configuration CORS.
- Pas de base de données.
- Pas de données ou de routes métier.
- Pas d'installation comme service.

La boucle locale n'est pas une frontière d'autorisation suffisante
pour les futures opérations sensibles.

La route de santé vérifie seulement que le processus HTTP répond.
Elle ne vérifie ni stockage, ni chiffrement, ni sauvegarde.

Ne pas exposer ce prototype sur Internet.

## Limites des tests actuels

Les tests couvrent notamment :

- commandes et erreurs d'arguments ;
- réponses HTTP ;
- configuration des délais ;
- port déjà occupé ;
- contexte annulé avant démarrage ;
- panne d'écriture simulée ;
- cycle de vie avec requête HTTP locale.

Ne sont pas encore testés :

- clients lents et expiration réelle des délais ;
- arrêt avec requêtes longues en cours ;
- comportement prolongé sous charge ;
- installation comme service ;
- versions différentes de Windows ;
- Linux et ARM64 ;
- sécurité métier ou réglementaire.

Le test de configuration des délais ne prouve pas leur comportement
dans toutes les conditions réseau.

## Environnement

Environnement rapporté :

- Windows 11 Professionnel, build 26300 ;
- Go 1.27.3, windows/amd64 ;
- PowerShell 5.1.

Les VM Windows et Linux sont réservées à des tests ultérieurs.

La compatibilité de Node.js et npm avec la future pile frontend
n'a pas encore été vérifiée.

Rust, Cargo, PostgreSQL et CMake n'étaient pas trouvés dans le PATH
lors du diagnostic. Cela ne prouve pas leur absence de la machine.

## Documentation et dépôt

- Nom exact du cahier des charges dans docs à confirmer.
- Branche locale à confirmer.
- Synchronisation du dépôt distant non vérifiée.
- Références de commits non transmises.
- Résultat détaillé du contrôle des 62 identifiants non transmis.
- Documents de sécurité présents, mais propositions non entièrement validées.
- release.md non encore fourni.
- Inventaire des composants et licences non encore fourni.

## Points techniques ouverts

- Versions et licences React, Vite, TypeScript et Tauri.
- Compatibilité des outils frontend installés.
- Pilote Go et compilation SQLCipher.
- Bibliothèques PDF et polices.
- Chiffrement du stockage PostgreSQL.
- Protection des clés selon le système.
- Déverrouillage automatique ou manuel.
- Temporaires, index, caches et journaux.
- Format de sauvegarde et récupération.
- Transport sécurisé bureau/moteur.
- Compatibilité client/serveur.
- Tâches, reprises et effets externes.
- Signature et distribution des mises à jour.

## Points métier ouverts

- Profils d'entreprise et cas effectivement couverts.
- Précisions décimales et règles d'arrondi.
- Numérotation et transitions des documents.
- Cas de TVA, acomptes et avoirs.
- Périodes, validations et clôtures comptables.
- Imports historiques et stratégie de reprise.
- Formats et connecteurs de facturation électronique.
- Rattrapage des automatisations.
- Bascule autonome/serveur.

Les règles réglementaires devront être vérifiées lors
de la conception et de l'implémentation concernées.

## Sécurité et récupération

Le chiffrement, la gestion des clés, les comptes, les permissions
et la récupération ne sont pas implémentés.

Aucune donnée professionnelle réelle ne doit être utilisée
dans ce socle.

Aucune protection absolue n'est promise contre :

- un système déjà compromis ;
- un administrateur système ayant accès aux secrets ;
- la conservation d'une copie hors ligne ;
- la perte de toutes les clés et installations exploitables.

La révocation d'un compte ne permet pas d'effacer instantanément
une machine durablement déconnectée.

Une restauration ne doit pas créer implicitement une seconde
autorité d'émission.

## Plateformes et distribution

Validation rapportée limitée au poste Windows de développement.

Aucun installateur Windows ou paquet Linux n'est disponible.
Aucun fonctionnement comme service n'est validé.

Windows 10 reste une cible demandée dont le statut est à clarifier
selon l'édition, sa maintenance et les dépendances retenues.

ARM64 doit être testé séparément.
Un résultat x64 ne vaut pas validation ARM64.

## Performances

Aucun test de charge n'a été exécuté.

Proposition de campagne initiale, non encore validée :

- serveur : 4 cœurs, 8 Go de RAM et SSD ;
- 20 sessions actives ;
- 50 000 contacts ;
- 100 000 documents ;
- objectif indicatif de p95 inférieur à 500 ms
  pour les lectures paginées courantes sur réseau local.

Avant mesure, définir :

- matériel exact ;
- versions ;
- données et pièces jointes ;
- répartition lectures/écritures ;
- débit et scénario ;
- état des caches ;
- durée ;
- point de mesure ;
- taux d'erreurs.

PDF, transferts et traitements longs nécessiteront leurs propres mesures.

Ces valeurs ne sont ni des garanties, ni des plafonds commerciaux,
ni des capacités démontrées.

## Licence et publication

AGPL-3.0 reste envisagée, non définitivement adoptée.

Le module actuel n'ajoute aucune dépendance Go externe.
Cela ne remplace pas l'inventaire des composants distribués
et de leurs obligations.

La politique de nom et de logo reste à rédiger.

Aucune version publiée ni infrastructure de signature
n'est créée par les lots actuels.

La mention dev est un identifiant de développement,
pas une publication stable.

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

Les devis seront signés à l'extérieur puis réimportés.
Aucun service de signature certifiée n'est annoncé.

## Validations encore absentes

- Interface web et parcours navigateur.
- Intégration bureau.
- Calculs et règles métier.
- Autorisations et authentification.
- Chiffrement et récupération.
- Migrations.
- Sauvegarde et restauration.
- Installateurs et mises à jour.
- Multiarchitecture.
- Charge.
- Revue comptable.
- Validation FEC.
- Connecteurs de facturation électronique.
- Audit de licences.
- Audit de sécurité.

Mettre à jour cette liste avec des résultats et leur périmètre,
pas avec des intentions.
