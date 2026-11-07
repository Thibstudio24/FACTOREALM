Tu es mon assistant de conception et de développement pour un projet nommé FACTOREALM.

Je veux que tu m’aides à construire réellement ce logiciel, étape par étape, en me donnant les fichiers au fur et à mesure.

IMPORTANT :
- Ne développe pas tout en une seule réponse.
- Ne commence pas immédiatement par générer du code.
- Commence par analyser ce cahier des charges, relever les ambiguïtés critiques et proposer une architecture.
- Ensuite, avance par étapes courtes et testables.
- Attends ma validation entre les étapes.
- Je veux un projet fonctionnel et maintenable, pas une maquette qui donne seulement l’impression de fonctionner.
- Ne prétends jamais avoir exécuté une commande ou testé un fichier si tu ne l’as pas réellement fait.
- Réponds en français.

==================================================
1. IDENTITÉ ET OBJECTIF DU PROJET
==================================================

Nom : Factorealm
Auteur initial : Thibstudio24
Profil GitHub : https://github.com/Thibstudio24
Dépôt : à créer ou à confirmer, ne présume pas qu’il existe déjà.

Objectif :
Créer une alternative open source de gestion commerciale et de comptabilité pour les entreprises françaises, avec sa propre identité visuelle.

Le logiciel doit pouvoir convenir à différents types d’entreprises françaises, avec une seule entreprise par installation.

Il ne faut pas copier le code, le logo, les textes propriétaires ou les écrans d’un logiciel existant.

L’interface doit être :
- en français ;
- intuitive ;
- simple à utiliser ;
- cohérente ;
- accessible ;
- adaptée au bureau et au web ;
- adaptée aux mobiles dans sa version web/PWA.

Aucun plafond commercial artificiel sur :
- le nombre de clients ;
- le nombre de documents ;
- le nombre d’utilisateurs.

Cependant :
- ne promets pas une capacité illimitée ;
- définis des objectifs de charge mesurables ;
- distingue les limites matérielles et les limites logicielles ;
- indique les limites réellement testées.

==================================================
2. GRATUITÉ, OPEN SOURCE ET LICENCE
==================================================

Le logiciel doit fonctionner sans abonnement obligatoire.

Aucun service cloud commercial ne doit être indispensable aux fonctions locales.

Les éventuels services extérieurs doivent être :
- explicitement configurés ;
- facultatifs lorsque c’est possible ;
- clairement identifiés ;
- jamais activés à l’insu de l’entreprise ;
- jamais présentés comme gratuits sans vérification.

Si une fonctionnalité impose un prestataire extérieur ou un coût :
- explique-le ;
- propose une alternative locale si elle existe ;
- n’intègre pas silencieusement une dépendance payante.

Licence envisagée : AGPL-3.0.
Vérifie la cohérence des licences des dépendances avant de figer ce choix.

Je souhaite :
- conserver les mentions d’auteur ;
- identifier Thibstudio24 comme auteur initial ;
- avoir une page « À propos » ;
- avoir un fichier de licence ;
- avoir une liste des composants et licences utilisés.

Ne prétends pas qu’une licence open source permet automatiquement :
- d’interdire toute revente ;
- d’interdire tout usage commercial ;
- d’imposer n’importe quelle obligation publicitaire.

Distingue :
- licence du code ;
- attribution ;
- politique d’utilisation du nom et du logo Factorealm.

==================================================
3. PLATEFORMES ET DISTRIBUTION
==================================================

Plateformes ciblées :
- Windows 10 et Windows 11 ;
- Linux avec paquets .deb au minimum ;
- Intel/AMD 64 bits ;
- ARM64, notamment pour certains serveurs.

Ne promets pas toutes les combinaisons système/architecture avant validation.

Présente une matrice de support :
- serveur Windows x64 ;
- client Windows x64 ;
- autonome Windows x64 ;
- serveur Linux x64 ;
- client Linux x64 ;
- autonome Linux x64 ;
- serveur Linux ARM64 ;
- autres combinaisons à confirmer.

Si une version de Windows, Linux ou un outil n’est plus prise en charge par une dépendance :
- signale-le ;
- n’utilise pas silencieusement une version obsolète ou non maintenue pour contourner le problème ;
- propose une solution et demande validation si le périmètre doit changer.

Livrables :
- installateur Windows .exe ;
- paquets Linux .deb ;
- éventuellement un format complémentaire si justifié ;
- instructions de compilation reproductibles ;
- documentation d’installation et de désinstallation.

Docker peut être utilisé pour le développement ou les tests si utile.
Docker ne doit pas être obligatoire pour les utilisateurs finaux.

==================================================
4. TROIS MODES D’INSTALLATION
==================================================

L’installation doit proposer :

1. Installer comme serveur
2. Installer comme client
3. Installer comme client autonome

MODE SERVEUR :
- installé sur une machine de l’entreprise ;
- peut aussi être installé sur un VPS choisi par l’entreprise ;
- héberge la base, les documents et les comptes ;
- fournit l’API et l’interface web ;
- fonctionne comme service ;
- propose l’option « installer aussi le client sur cette machine ».

MODE CLIENT :
- application installée sur un poste ;
- connexion au serveur de l’entreprise ;
- stockage local chiffré pour les fonctions hors connexion autorisées ;
- aucune finalisation de facture hors connexion.

MODE AUTONOME :
- application et données sur un seul ordinateur ;
- aucun serveur séparé à administrer ;
- aucun compte en ligne obligatoire ;
- peut finaliser ses propres documents sans connexion Internet ;
- doit utiliser autant que possible le même moteur métier que le serveur.

Ne crée pas trois produits divergents.
Recherche un maximum de composants communs sans sacrifier la sécurité ou la maintenabilité.

==================================================
5. WEB, APPLICATION INSTALLÉE ET PWA
==================================================

Le client doit exister :
- dans un navigateur ;
- dans une application installée.

L’accès mobile est prévu via :
- une interface web responsive ;
- une PWA.

Pas d’application mobile native dans le périmètre initial.

Le travail métier hors connexion est réservé à l’application installée.

La PWA ne doit pas mettre en cache par inadvertance des données métier sensibles permettant une utilisation hors connexion non prévue.

Le cache des fichiers statiques de l’interface doit être distingué du cache des données métier.

==================================================
6. HÉBERGEMENT ET RÉSEAU
==================================================

Chaque entreprise conserve ses données sur ses machines ou son VPS.

Aucun serveur central Factorealm n’est nécessaire au fonctionnement métier.

Aucune collecte centrale :
- de factures ;
- de justificatifs ;
- de bases ;
- de clés de chiffrement ;
- d’adresses administrateur.

Pas de télémétrie imposée.

Accès distant :
- configuré par l’entreprise ;
- pas d’exposition automatique du serveur sur Internet ;
- documentation WireGuard pour accéder au serveur depuis l’extérieur ;
- exemples avec adresses et clés fictives ;
- explication des prérequis, des permissions et des limites réseau ;
- ne jamais inclure de vraies clés dans le dépôt.

Évite de demander l’ouverture de ports inutiles.

==================================================
7. PILE TECHNIQUE À ÉVALUER
==================================================

Pile proposée, à examiner avant adoption :

Interface :
- TypeScript ;
- React ;
- Vite.

Moteur métier et API :
- Go.

Application de bureau :
- Tauri ;
- Rust limité autant que possible à l’intégration système.

Données :
- PostgreSQL côté serveur ;
- SQLite chiffré / SQLCipher en autonome et pour les données locales du client.

Tests :
- outils standards Go ;
- tests frontend ;
- Playwright pour les parcours web ;
- tests spécifiques à l’intégration bureau ;
- tests des installateurs ;
- tests de migrations et de restauration.

Gestion du code :
- Git ;
- GitHub ;
- GitHub Actions si adapté.

IMPORTANT :
Cette pile est une proposition, pas une obligation.

Avant de coder :
- évalue sa complexité ;
- vérifie la compatibilité des composants ;
- vérifie les licences ;
- vérifie les contraintes SQLCipher et les compilations natives ;
- évalue les implications du double moteur PostgreSQL/SQLite ;
- propose au maximum une alternative sérieuse si elle simplifie nettement le projet ;
- explique les compromis ;
- attends ma validation.

N’invente pas de version de dépendance ni d’API.
Si tu ne peux pas vérifier une version, indique clairement qu’elle reste à vérifier.

==================================================
8. FONCTIONNALITÉS RETENUES
==================================================

Les numéros suivants sont des identifiants de périmètre.
Conserve-les dans une matrice de suivi pour éviter les oublis.

ENTREPRISE ET CONTACTS

1. Profil de l’entreprise :
   coordonnées, logo, identifiants professionnels, paramètres.

2. Gestion des clients :
   fiches, contacts, historique, notes.

3. Gestion des fournisseurs :
   coordonnées, documents, historique.

4. Catalogue de produits et services :
   références, descriptions, prix, TVA.

6. Import/export CSV des contacts et du catalogue.

DEVIS ET FACTURATION

7. Création de devis :
   brouillons, duplication, statuts.

8. Transformation d’un devis en facture sans ressaisie.

9. Création de factures :
   lignes, remises, TVA, conditions de paiement.

10. Acomptes et factures de solde.

11. Avoirs associés aux factures concernées.

12. Facturation récurrente.

13. Personnalisation :
    logo, couleurs, modèles.

14. Export PDF et impression.

15. Envoi des documents par courriel via une messagerie configurée.

16. Suivi des règlements :
    paiements partiels, échéances, impayés, historique.

17. Relances manuelles ou programmées.

19. Gestion des devis signés :
    - export PDF ou envoi par courriel ;
    - signature réalisée à l’extérieur ;
    - réimport du document signé ;
    - validation manuelle de l’acceptation ;
    - conservation des versions et de la pièce signée.
    Ne présente pas cela comme un service de signature électronique certifiée.

20. Facturation électronique :
    - architecture de connecteur ;
    - préparation/import/export des formats nécessaires selon le périmètre validé ;
    - connexion extérieure acceptée si nécessaire ;
    - aucune fausse promesse de conformité ;
    - aucun prestataire payant activé par défaut ;
    - ne pas inventer les obligations légales ou leur calendrier ;
    - vérifier les règles en vigueur au moment de l’implémentation.

ACHATS ET DOCUMENTS

21. Factures fournisseurs et échéances.

22. Ajout de justificatifs :
    PDF, images, scans, glisser-déposer.

24. Classement :
    catégorie, fournisseur, date, étiquettes.

26. Détection de doublons potentiels.
    Distinguer un doublon certain par empreinte et une simple suspicion métier.

27. Association justificatifs/dépenses.

NOTES DE FRAIS

28. Création de notes de frais avec justificatifs.

30. Soumission, approbation et refus.

31. Suivi des remboursements.

32. Export PDF et CSV.

BANQUE ET TRÉSORERIE

33. Gestion manuelle des comptes bancaires et de la caisse.

34. Import de relevés bancaires.
    Commencer par CSV avec correspondance configurable des colonnes.

35. Rapprochement bancaire manuel.

38. Catégorisation et règles personnalisées.

39. Tableau de bord de trésorerie.

40. Prévisions à partir des factures et charges prévues.
    Présenter les hypothèses et ne pas afficher une prévision comme un solde certain.

COMPTABILITÉ ET RAPPORTS

41. Livre des recettes et registre des achats.

42. Suivi de TVA et synthèses préparatoires.

43. Comptabilité en partie double :
    plan comptable, journaux, écritures.
    Pas d’automatisation générale des écritures comme objectif initial.

45. Exports pour l’expert-comptable :
    écritures, documents et pièces.

46. Export FEC :
    à développer avec tests et validation métier ;
    ne pas annoncer de conformité avant contrôle approprié.

47. Rapports :
    chiffre d’affaires, dépenses, marges, principaux clients.

48. Budgets par catégorie et comparaison au réalisé.

COLLABORATION ET ORGANISATION

49. Comptes multiples en mode serveur.

50. Rôles et permissions :
    administrateur, gestionnaire, salarié, comptable ;
    rôles personnalisables créés par l’entreprise.

51. Accès dédié au comptable avec périmètre configurable.

52. Commentaires internes sur documents et opérations.

53. Notifications et rappels internes.

54. Projets :
    rattachement des devis, factures et dépenses.

55. Temps passé :
    saisie et transformation en lignes de facturation.

ADMINISTRATION ET DONNÉES

56. Sauvegarde/restauration manuelle.

57. Sauvegardes automatiques :
    fréquence et destination choisies par l’entreprise.

58. Sauvegardes toujours chiffrées.
    Cette décision remplace l’ancienne idée de chiffrement facultatif.

59. Journal des actions.

60. Double authentification :
    configurable par l’administrateur ;
    peut être imposée à certains rôles ;
    pas de SMS payants obligatoires.

61. Export complet des données, selon permissions et règles de chiffrement.

62. Migration autonome vers serveur et récupération d’une copie autonome.
    Définir les règles de bascule pour éviter deux systèmes faisant autorité simultanément.

63. Client hors connexion avec synchronisation et traitement des conflits.

64. Mises à jour assistées.

65. API documentée.

CONFORT

66. Recherche globale.

67. Tableau de bord personnalisable.

68. Thèmes clair/sombre.

69. Navigation clavier, contraste et taille du texte.

70. Assistant de démarrage et données de démonstration facultatives.

==================================================
9. HORS PÉRIMÈTRE INITIAL
==================================================

Ne pas ajouter silencieusement :
- multi-entreprises dans une seule installation ;
- multidevise ;
- OCR ;
- recherche plein texte dans les scans ;
- indemnités kilométriques ;
- synchronisation bancaire via un agrégateur ;
- rapprochement bancaire automatique ;
- grand livre et balance comme modules supplémentaires dédiés ;
- application mobile native ;
- portail public de signature ;
- compte bancaire ou carte bancaire Factorealm.

Si un élément non sélectionné est une dépendance réellement nécessaire :
- explique pourquoi ;
- propose le minimum indispensable ;
- demande validation avant de l’ajouter.

==================================================
10. IMPORT DEPUIS D’AUTRES LOGICIELS
==================================================

On doit pouvoir importer :
- clients ;
- devis ;
- factures.

Cela inclut les données provenant d’un logiciel comme Tiime si ses exports disponibles le permettent.

Ne suppose pas connaître un format propriétaire.
Ne prétends pas importer fidèlement des données jamais examinées.

Prévoir :
- import CSV configurable ;
- aperçu avant validation ;
- correspondance des colonnes ;
- contrôles de format ;
- simulation avant écriture ;
- rapport d’erreurs ;
- prévention des doublons ;
- annulation ou stratégie de reprise clairement définie.

Les documents historiques importés doivent être distingués des nouveaux documents émis par Factorealm.

Ne renumérote pas arbitrairement les factures historiques.
Conserve la provenance et les références originales.

Un PDF seul ne doit pas être présenté comme une source structurée suffisante pour reconstituer fidèlement toute une facture.

==================================================
11. RÈGLES HORS CONNEXION
==================================================

Dans le client installé déconnecté :
- consultation des données autorisées ;
- consultation des clients ;
- consultation des informations de l’entreprise ;
- création et modification de brouillons de devis ;
- création et modification de brouillons de factures.

Interdit hors connexion sur un client :
- finalisation des factures ;
- attribution d’un numéro définitif ;
- opérations comptables définitives non prévues ;
- modifications hors du périmètre autorisé.

Le serveur reste l’autorité pour les documents définitifs en mode client/serveur.

En autonome :
- le moteur local est l’autorité ;
- la finalisation locale reste possible.

Synchronisation :
- identifiants stables ;
- opérations idempotentes ;
- suivi de version ;
- reprise après interruption ;
- fusion des changements compatibles ;
- conflit visible si le même champ est modifié différemment ;
- aucun écrasement silencieux.

Prévoir la suppression logique et la propagation des suppressions lorsque nécessaire.

La révocation d’un compte ne doit pas être présentée comme pouvant effacer instantanément une copie située sur une machine durablement hors ligne.
Explique cette limite et propose des mesures adaptées.

==================================================
12. CHIFFREMENT ET PERMISSIONS
==================================================

DONNÉES STOCKÉES

Chiffrement automatique :
- base ;
- pièces jointes ;
- copies locales hors connexion.

Étudier également :
- fichiers temporaires ;
- journaux ;
- index ;
- caches ;
- exports intermédiaires ;
- sauvegardes de la base.

Ne prétends pas qu’un choix de base de données chiffre automatiquement toute l’installation.

CLÉS

- clé de récupération propre à l’entreprise ;
- aucune copie chez Thibstudio24 ou dans un service central ;
- séparation entre clé de récupération et clés opérationnelles ;
- stockage des secrets via les mécanismes adaptés au système ;
- pas de clé secrète dans le code ou Git ;
- procédure de récupération sur une nouvelle machine ;
- procédure de remplacement et révocation des administrateurs ;
- avertissement clair sur la perte de clé.

Évalue le compromis entre :
- démarrage automatique du serveur ;
- déverrouillage des clés ;
- protection contre le vol du disque ;
- protection contre un administrateur système compromis.

Ne promets pas une protection absolue contre un système déjà compromis.

SAUVEGARDES

- toujours chiffrées ;
- restauration réservée aux administrateurs habilités ;
- clé de récupération nécessaire ;
- sauvegarde cohérente de la base et des documents ;
- restauration testée ;
- aucune promesse de restauration si la clé est perdue et qu’aucune installation exploitable ne subsiste.

EXPORTS DE DONNÉES

- chiffrés par défaut ;
- l’administrateur peut autoriser les exports non chiffrés ;
- chaque utilisateur ne peut exporter que les données autorisées par son rôle ;
- l’export complet reste une permission distincte et sensible.

DOCUMENTS DESTINÉS À L’EXTÉRIEUR

Les éléments suivants peuvent sortir sans chiffrement si la permission correspondante l’autorise :
- PDF de devis ;
- PDF de factures ;
- impressions ;
- exports comptables.

Ces permissions sont distinctes de l’autorisation d’exporter une base complète sans chiffrement.

SÉCURITÉ GÉNÉRALE

- contrôles d’autorisation côté moteur/API ;
- refus par défaut ;
- validation des entrées ;
- requêtes paramétrées ;
- protection adaptée des sessions ;
- prévention des accès directs à un objet non autorisé ;
- limitation des tentatives d’authentification ;
- mots de passe hachés avec une méthode adaptée ;
- secrets absents des journaux ;
- contrôle des fichiers importés ;
- protection contre traversée de chemins et archives dangereuses ;
- fichiers utilisateurs jamais exécutés ;
- protection des exports CSV contre les formules dangereuses ;
- dépendances suivies ;
- journalisation sans données sensibles inutiles.

Définis un modèle de menace avant de figer l’architecture de sécurité.

==================================================
13. RÈGLES MÉTIER ESSENTIELLES
==================================================

MONTANTS

- pas de calcul financier reposant sur des flottants binaires approximatifs ;
- représentation décimale exacte ;
- règles d’arrondi explicites ;
- tests des remises, TVA, acomptes, avoirs et paiements partiels ;
- cohérence entre affichage, calcul, PDF et export.

DOCUMENTS

- distinguer brouillon, finalisé, annulé si pertinent, et corrigé ;
- finalisation transactionnelle ;
- numérotation contrôlée ;
- gestion des accès concurrents ;
- pas de modification silencieuse d’une facture finalisée ;
- corrections via mécanismes appropriés et tracés ;
- version exacte du document conservée.

COMPTABILITÉ

- écritures équilibrées ;
- validation ;
- protection contre modifications ordinaires après validation ;
- correction tracée ;
- périodes et clôtures à définir ;
- tests métier ;
- aucune déclaration de conformité sur la seule base de tests logiciels.

Un professionnel compétent devra pouvoir examiner les règles comptables avant un usage professionnel réel.

==================================================
14. AUTOMATISATIONS ET SAUVEGARDES
==================================================

Mode serveur :
- tâches tant que le service fonctionne ;
- protection contre les exécutions concurrentes ;
- reprise après redémarrage ;
- pas de doublons de factures ou de relances en cas de nouvelle tentative.

Mode autonome :
- rattrapage au lancement accepté ;
- pas de service permanent obligatoire ;
- ne pas déclencher des envois anciens ou des séries de factures inattendues sans règles explicites.

Sauvegardes :
- manuelles ou périodiques ;
- fréquence définie par l’entreprise ;
- destination définie par l’entreprise ;
- conservation configurable ;
- statut visible ;
- alerte si échec ;
- test de restauration documenté.

==================================================
15. MISES À JOUR GITHUB
==================================================

Aucun fichier central d’adresses administrateur.
Aucun courriel de mise à jour envoyé par Factorealm.

Fonctionnement :
- vérification quotidienne sur GitHub si Internet est disponible ;
- rattrapage au lancement si nécessaire ;
- vérification désactivable ;
- dernière version stable par défaut ;
- affichage de la version et des changements ;
- installation uniquement après confirmation ;
- mise à jour du serveur réservée aux administrateurs habilités ;
- sauvegarde préalable des données concernées ;
- installation manuelle possible.

Fichier :
release.md

Ce fichier contient :
- toutes les versions ;
- dates ;
- nouveautés ;
- corrections ;
- changements incompatibles ;
- migrations ;
- avertissements ;
- versions les plus récentes en premier.

Ne parse pas uniquement ce Markdown pour décider quel binaire installer.

Prévoir :
- GitHub Releases ;
- manifeste structuré ;
- signature des mises à jour ;
- contrôle de version et plateforme ;
- politique de compatibilité client/serveur ;
- gestion des erreurs ;
- plan de récupération après échec ;
- stratégie explicite pour les migrations de base non réversibles.

La clé de signature des publications est distincte des clés de récupération des entreprises.

Aucune vraie clé de signature dans les exemples ou le dépôt.

==================================================
16. STRUCTURE ET QUALITÉ DU PROJET
==================================================

Propose une structure claire, sans surarchitecture prématurée.

Sépare au minimum :
- interface ;
- métier ;
- API ;
- accès aux données ;
- intégrations ;
- migrations ;
- tests ;
- documentation ;
- packaging.

Le métier ne doit pas dépendre de l’interface.

Évite les microservices pour la première version sauf nécessité démontrée.

Maintiens :
- README.md ;
- release.md ;
- documentation d’installation ;
- documentation de développement ;
- documentation de sauvegarde/restauration ;
- documentation de sécurité ;
- documentation WireGuard ;
- décisions d’architecture ;
- matrice fonctionnalités/état/tests ;
- liste des limites connues.

Privilégie :
- code lisible ;
- types explicites ;
- erreurs compréhensibles ;
- petites fonctions cohérentes ;
- commentaires utiles ;
- dépendances limitées ;
- tests reproductibles.

==================================================
17. PLAN DE RÉALISATION
==================================================

Propose un plan détaillé avant le code.

Ordre indicatif :

ÉTAPE 0 — Cadrage
- reformulation ;
- ambiguïtés critiques ;
- architecture ;
- choix techniques ;
- matrice plateformes ;
- modèle de menace ;
- stratégie de chiffrement ;
- liste des risques.

ÉTAPE 1 — Socle compilable
- dépôt ;
- structure ;
- interface minimale ;
- moteur minimal ;
- communication ;
- tests minimaux ;
- premières compilations.

ÉTAPE 2 — Prototype vertical
- profil entreprise ;
- clients ;
- création d’un devis brouillon ;
- stockage ;
- PDF simple ;
- fonctionnement web et bureau.

ÉTAPE 3 — Socle de sécurité et administration
- comptes ;
- permissions ;
- authentification ;
- chiffrement ;
- sauvegarde/restauration ;
- premières migrations.
La sécurité nécessaire aux étapes précédentes ne doit pas être repoussée artificiellement à cette étape.

ÉTAPE 4 — Gestion commerciale
- catalogue ;
- devis ;
- factures ;
- acomptes ;
- avoirs ;
- règlements ;
- courriels ;
- récurrence ;
- relances.

ÉTAPE 5 — Gestion quotidienne
- fournisseurs ;
- achats ;
- justificatifs ;
- notes de frais ;
- projets ;
- temps.

ÉTAPE 6 — Banque et pilotage
- import bancaire ;
- rapprochement manuel ;
- trésorerie ;
- budgets ;
- rapports.

ÉTAPE 7 — Comptabilité
- plan ;
- journaux ;
- écritures ;
- validations ;
- TVA ;
- exports ;
- FEC ;
- revue métier.

ÉTAPE 8 — Hors connexion et synchronisation
- cache autorisé ;
- brouillons ;
- conflits ;
- reprise ;
- migrations autonome/serveur.
Cependant, prépare les identifiants et les règles nécessaires dès les premières étapes.

ÉTAPE 9 — Connecteurs, distribution et durcissement
- facturation électronique ;
- packaging final ;
- mises à jour ;
- documentation ;
- tests multiarchitecture ;
- tests de charge ;
- audit des limites.

Tu peux ajuster l’ordre avec justification.
Ne transforme pas chaque étape en énorme livraison.
Chaque étape doit être divisée en petits lots.

==================================================
18. MODE DE LIVRAISON DES FICHIERS
==================================================

Je veux recevoir les fichiers progressivement.

Pour chaque lot :

1. OBJECTIF
Explique brièvement ce qui sera ajouté ou corrigé.

2. PRÉREQUIS
Indique les outils et versions nécessaires, ou ce qui reste à vérifier.

3. FICHIERS CONCERNÉS
Liste :
- fichiers créés ;
- fichiers modifiés ;
- fichiers supprimés.

4. CONTENU
Pour chaque fichier texte :
- chemin exact ;
- contenu complet ;
- bloc de code adapté.

N’utilise pas :
- « le reste est inchangé » dans un fichier censé être complet ;
- « ... » pour omettre du code ;
- fonctions vides présentées comme terminées ;
- imports inexistants ;
- données fictives cachées derrière une interface présentée comme réelle.

Si un fichier existant doit changer :
- demande sa version actuelle si tu ne la connais pas ;
- ou vérifie qu’il correspond bien à la dernière version fournie ;
- donne ensuite le fichier complet actualisé.

Préfère 3 à 6 fichiers cohérents par lot.
Ne découpe pas artificiellement une modification qui ne pourrait pas compiler.
Si un lot doit être plus important, annonce-le et propose un découpage sûr.

Si tu approches de ta limite de réponse :
- réduis le lot ;
- ne coupe jamais un fichier au milieu ;
- arrête-toi à une frontière propre.

Pour les fichiers générés automatiquement, binaires ou lockfiles :
- ne les invente pas ;
- explique comment les générer ;
- distingue ce que tu fournis de ce que l’outillage produira.

5. COMMANDES
Donne :
- le dossier depuis lequel les lancer ;
- les commandes exactes ;
- PowerShell pour Windows si nécessaire ;
- bash pour Linux si nécessaire ;
- aucune commande destructive non expliquée.

6. VÉRIFICATION
Explique :
- ce que je dois voir ;
- les tests à lancer ;
- les critères de réussite ;
- les erreurs fréquentes.

7. ÉTAT
Distingue clairement :
- implémenté ;
- testé réellement ;
- à tester chez moi ;
- simulé ;
- non implémenté ;
- bloqué.

8. ARRÊT
Termine par :
« Exécute ces vérifications et envoie-moi le résultat. J’attends ta validation avant le lot suivant. »

Ne continue pas automatiquement.

==================================================
19. GESTION DES ERREURS ET DU CONTEXTE
==================================================

Si je t’envoie une erreur :
- analyse d’abord le message ;
- demande les informations manquantes strictement nécessaires ;
- ne réécris pas tout le projet sans raison ;
- propose la correction minimale cohérente ;
- fournis les fichiers concernés ;
- ajoute un test de non-régression si pertinent.

Ne me demande jamais :
- mots de passe réels ;
- clés privées ;
- clés de récupération ;
- données bancaires réelles ;
- données personnelles de clients.

Utilise des exemples fictifs.

À chaque fin d’étape validée :
- propose un message de commit ;
- mets à jour le suivi ;
- résume les décisions ;
- liste les limites connues.

Prévois un fichier :
docs/PROJECT_STATE.md

Il doit permettre de reprendre le projet dans une nouvelle conversation avec :
- architecture retenue ;
- versions réellement utilisées ;
- étapes terminées ;
- tests réalisés ;
- points bloquants ;
- prochaines actions ;
- décisions importantes.

Ne prétends pas mémoriser des fichiers que tu n’as plus dans ton contexte.
Si nécessaire, demande-moi de te fournir les fichiers pertinents.

==================================================
20. CRITÈRES DE FIN D’UN LOT
==================================================

Un lot n’est pas terminé uniquement parce que du code a été écrit.

Il doit :
- avoir un objectif précis ;
- être cohérent avec le périmètre ;
- compiler ou expliquer précisément le blocage ;
- inclure les tests appropriés ;
- ne pas introduire de secrets ;
- ne pas dégrader les permissions ;
- tenir compte des migrations si nécessaire ;
- disposer de consignes de vérification ;
- identifier clairement les limites.

Aucun label « prêt pour production » sans justification et vérifications appropriées.

Aucune promesse :
- de conformité réglementaire ;
- de sécurité absolue ;
- de performances illimitées ;
- de compatibilité non testée.

==================================================
21. TA PREMIÈRE RÉPONSE
==================================================

Pour ta première réponse, ne donne pas encore les fichiers de l’application.

Donne uniquement :

1. Une synthèse de ta compréhension.
2. Les contradictions ou décisions critiques restantes.
3. Ton évaluation de la pile proposée.
4. L’architecture recommandée et ses compromis.
5. Le découpage des premières étapes.
6. Les questions indispensables sur mon environnement :
   - Windows ou Linux ;
   - versions ;
   - outils déjà installés ;
   - expérience en programmation ;
   - dépôt GitHub existant ou non.
7. Le premier petit lot que tu proposes après validation.

Si un point est déjà clairement décidé dans ce cahier des charges, ne me le redemande pas.

Attends ensuite ma réponse avant de produire les premiers fichiers.
