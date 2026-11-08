# Matrice des fonctionnalités

## Convention

Les identifiants sont ceux du cahier des charges original.
Les numéros absents sont volontairement absents.

Cette matrice suit les fonctionnalités ; elle ne remplace pas leurs
exigences détaillées dans le cahier des charges.

États possibles :

- NI : non implémenté ;
- EC : en cours ;
- AV : implémenté, à vérifier ;
- V : vérifié dans un environnement et un périmètre documentés ;
- B : bloqué ;
- S : simulé, sans implémentation réelle de la fonction.

Un état V ne signifie pas une conformité réglementaire
ou une aptitude générale à la production.

Toutes les fonctionnalités sont actuellement NI.
Aucun des tests attendus ci-dessous n'a été exécuté.

## Entreprise et contacts

| ID | Fonctionnalité | État | Validation minimale attendue |
|---|---|---|---|
| 1 | Profil de l'entreprise | NI | Enregistrement, validation des champs, isolation d'une installation |
| 2 | Clients | NI | Création, modification, historique et permissions |
| 3 | Fournisseurs | NI | Coordonnées, documents, historique et permissions |
| 4 | Catalogue produits et services | NI | Références, prix décimaux exacts et TVA |
| 6 | Import/export CSV contacts et catalogue | NI | Aperçu, correspondance, erreurs et protection des cellules exportées |

## Devis et facturation

| ID | Fonctionnalité | État | Validation minimale attendue |
|---|---|---|---|
| 7 | Devis | NI | Brouillons, duplication, transitions de statut |
| 8 | Transformation devis en facture | NI | Reprise fidèle des données et traçabilité de l'origine |
| 9 | Factures | NI | Calculs, arrondis, concurrence, numérotation et finalisation transactionnelle |
| 10 | Acomptes et soldes | NI | Cohérence des montants, liens et cas de TVA retenus |
| 11 | Avoirs | NI | Références aux factures, montants et traçabilité des corrections |
| 12 | Facturation récurrente | NI | Idempotence, reprise et rattrapage contrôlé |
| 13 | Personnalisation | NI | Modèles, logo, couleurs et stabilité des documents définitifs |
| 14 | PDF et impression | NI | Correspondance des montants, pagination et conservation du rendu |
| 15 | Courriel configuré | NI | Configuration explicite, erreurs, secrets protégés et statut d'envoi |
| 16 | Règlements | NI | Paiements partiels, échéances, historique et cohérence des soldes |
| 17 | Relances | NI | Déclenchement autorisé, reprises et absence de doublons applicatifs |
| 19 | Devis signés à l'extérieur | NI | Versions, pièce signée et validation manuelle ; aucune certification revendiquée |
| 20 | Facturation électronique | NI | Périmètre réglementaire vérifié, formats validés et tests des connecteurs retenus |

## Achats et documents

| ID | Fonctionnalité | État | Validation minimale attendue |
|---|---|---|---|
| 21 | Factures fournisseurs et échéances | NI | Enregistrement, liens et échéances |
| 22 | Justificatifs | NI | Types et tailles autorisés, stockage chiffré et accès contrôlé |
| 24 | Classement | NI | Catégorie, fournisseur, date, étiquettes et permissions |
| 26 | Doublons potentiels | NI | Distinguer identité par empreinte et suspicion métier |
| 27 | Association justificatifs/dépenses | NI | Intégrité des liens et droits d'accès |

## Notes de frais

| ID | Fonctionnalité | État | Validation minimale attendue |
|---|---|---|---|
| 28 | Création de notes de frais | NI | Lignes, justificatifs et montants |
| 30 | Soumission, approbation et refus | NI | Transitions autorisées, permissions et historique |
| 31 | Remboursements | NI | Suivi des montants et prévention des doubles imputations |
| 32 | Export PDF et CSV | NI | Exactitude, périmètre autorisé et cellules CSV protégées |

## Banque et trésorerie

| ID | Fonctionnalité | État | Validation minimale attendue |
|---|---|---|---|
| 33 | Comptes bancaires et caisse manuels | NI | Saisie, soldes calculés et droits |
| 34 | Import de relevés CSV | NI | Correspondance des colonnes, formats, doublons et reprise |
| 35 | Rapprochement manuel | NI | Associations explicites et cohérence des montants |
| 38 | Catégorisation et règles | NI | Priorités, aperçu et résultats explicables |
| 39 | Tableau de bord de trésorerie | NI | Concordance avec les opérations retenues |
| 40 | Prévisions | NI | Hypothèses visibles et séparation du réalisé et du prévisionnel |

## Comptabilité et rapports

| ID | Fonctionnalité | État | Validation minimale attendue |
|---|---|---|---|
| 41 | Livre des recettes et registre des achats | NI | Périmètre, chronologie et rapprochement des sources |
| 42 | TVA et synthèses préparatoires | NI | Cas métier retenus, arrondis et revue professionnelle |
| 43 | Partie double | NI | Équilibre, validation, corrections, périodes et clôtures |
| 45 | Exports expert-comptable | NI | Écritures, pièces, permissions et cohérence des références |
| 46 | FEC | NI | Structure, contrôles, jeux de référence et validation métier |
| 47 | Rapports | NI | Indicateurs reproductibles et définitions documentées |
| 48 | Budgets | NI | Catégories, périodes et comparaison au réalisé |

## Collaboration et organisation

| ID | Fonctionnalité | État | Validation minimale attendue |
|---|---|---|---|
| 49 | Comptes multiples serveur | NI | Gestion des comptes, sessions et séparation des accès |
| 50 | Rôles et permissions | NI | Refus par défaut, rôles personnalisés et contrôles moteur/API |
| 51 | Accès comptable | NI | Respect du périmètre accordé |
| 52 | Commentaires internes | NI | Accès limité, historique et séparation des documents externes |
| 53 | Notifications et rappels | NI | Destinataires autorisés et absence de données indues |
| 54 | Projets | NI | Rattachement des documents et opérations |
| 55 | Temps passé | NI | Durées exactes et conversion traçable en lignes facturables |

## Administration et données

| ID | Fonctionnalité | État | Validation minimale attendue |
|---|---|---|---|
| 56 | Sauvegarde/restauration manuelle | NI | Cohérence base/documents et restauration sur machine vierge |
| 57 | Sauvegardes automatiques | NI | Fréquence, destination, conservation et alerte d'échec |
| 58 | Sauvegardes toujours chiffrées | NI | Rejet d'archive altérée, récupération et absence de sortie en clair |
| 59 | Journal des actions | NI | Événements utiles, permissions et absence de secrets |
| 60 | Double authentification | NI | Activation, obligation par rôle, récupération et limitation des tentatives |
| 61 | Export complet | NI | Permission sensible distincte et chiffrement par défaut |
| 62 | Bascule autonome/serveur | NI | Contrôle d'intégrité et maintien d'une seule autorité active |
| 63 | Hors connexion et synchronisation | NI | Idempotence, versions, conflits, suppressions et reprise |
| 64 | Mises à jour assistées | NI | Signature, plateforme, compatibilité, sauvegarde et récupération |
| 65 | API documentée | NI | Contrat, authentification, permissions et erreurs |

## Confort

| ID | Fonctionnalité | État | Validation minimale attendue |
|---|---|---|---|
| 66 | Recherche globale | NI | Résultats limités au périmètre autorisé |
| 67 | Tableau de bord personnalisable | NI | Préférences et droits sur les indicateurs |
| 68 | Thèmes clair/sombre | NI | Lisibilité et persistance du choix |
| 69 | Accessibilité | NI | Clavier, focus, contraste, zoom et taille du texte |
| 70 | Assistant et démonstration facultative | NI | Démarrage sans données fictives imposées et séparation de la démonstration |

## Exigences transversales sans nouvel identifiant fonctionnel

Ces lignes suivent des exigences du cahier des charges.
Elles n'ajoutent pas de fonctionnalités au périmètre.

| Exigence | État | Validation attendue |
|---|---|---|
| Import historique clients/devis/factures | NI | Aperçu, simulation, provenance, références préservées et reprise |
| Calculs financiers | NI | Décimaux exacts et mêmes résultats moteur, écran, PDF et export |
| Protection des documents définitifs | NI | Pas de modification ordinaire après finalisation |
| Chiffrement de l'installation | NI | Bases, documents, caches, temporaires et journaux examinés |
| Gestion des clés | NI | Séparation des clés, récupération, rotation et perte documentée |
| PWA sans données métier hors connexion | NI | Inspection du cache, déconnexion et changement d'utilisateur |
| Services extérieurs explicites | NI | Aucun prestataire activé silencieusement |
| Installateurs | NI | Installation, mise à jour et désinstallation sans perte implicite |
| Réseau et accès distant | NI | Pas d'exposition automatique et documentation WireGuard fictive |
| Licences et attribution | NI | Inventaire exact, notices, auteur initial et décision de licence |
| Charge | NI | Scénarios, matériel, jeux de données et résultats publiés |
| Documentation d'exploitation | NI | Procédures exécutées et limites identifiées |
| Migrations | NI | Base vierge, mise à niveau, interruption et récupération |
| Profils d'entreprise | NI | Matrice explicite des cas couverts et non couverts |

## Preuves de vérification

Aucune preuve de test n'est disponible à ce stade.

Lorsqu'une fonctionnalité passe à AV ou V, renseigner :

- le lot et le commit concernés ;
- les tests automatisés associés ;
- les vérifications manuelles ;
- l'environnement et les versions ;
- le résultat ;
- les limites du scénario ;
- la revue métier éventuelle.

Les validations réglementaires ou professionnelles doivent rester
distinctes des tests purement logiciels.
