# Inventaire initial des composants

## Statut

Inventaire documentaire initial.

Les versions directes ont été relevées dans les sorties npm
et les résultats transmis par l'utilisateur.

Les mentions de licence du tableau frontend proviennent
des métadonnées npm transmises dans la conversation.

Cet inventaire n'est pas :

- un audit juridique ;
- une nomenclature exhaustive des dépendances ;
- une preuve de compatibilité globale avec AGPL-3.0 ;
- une liste des fichiers effectivement présents dans un futur binaire.

## 1. Code du projet

- Nom : Factorealm.
- Auteur initial : Thibstudio24.
- Licence envisagée : AGPL-3.0.
- Adoption formelle : non réalisée.
- Fichier LICENSE : non fourni dans les lots actuels.
- Champ licence frontend : UNLICENSED, provisoire.
- Publication du paquet npm : désactivée par private: true.

La licence du code, l'attribution et la politique d'utilisation
du nom et du logo doivent être traitées séparément.

Ne pas présenter le code comme déjà distribué sous AGPL-3.0
avant la décision et l'ajout des documents correspondants.

## 2. Backend Go

| Élément | Version ou état | Usage | Vérification restante |
|---|---|---|---|
| Chaîne Go | 1.27.3 | Compilation et tests | Texte de licence et notices applicables |
| Bibliothèque standard Go | Associée à la chaîne utilisée | Commandes, HTTP, réseau, tests | Conditions de redistribution des éléments incorporés |
| Modules Go externes | Aucun | Aucun actuellement | Réexaminer à chaque ajout |

Le module est :

    github.com/Thibstudio24/FACTOREALM/backend

L'absence de module externe ne dispense pas de vérifier
les notices applicables aux composants incorporés au binaire.

## 3. Dépendances frontend directes

| Composant | Version installée | Rôle | Licence déclarée |
|---|---|---|---|
| react | 19.3.1 | Interface | MIT |
| react-dom | 19.3.1 | Rendu navigateur | MIT |
| typescript | 7.0.2 | Vérification de types | Apache-2.0 |
| vite | 8.3.8 | Développement et construction | MIT |
| @vitejs/plugin-react | 6.3.0 | Intégration React/Vite | MIT |
| @types/node | 22.20.5 | Types de l'environnement Node | MIT |
| @types/react | 19.3.0 | Types React | MIT |
| @types/react-dom | 19.3.0 | Types React DOM | MIT |
| vitest | 5.1.0 | Tests | MIT |
| @testing-library/react | 16.3.3 | Tests du composant React | MIT |
| @testing-library/dom | 10.4.2 | Fonctions de test DOM | MIT |
| jsdom | 31.0.1 | Environnement DOM de test | MIT |

Les textes de licence, notices et éventuelles exceptions
des archives exactes n'ont pas encore été inventoriés.

Une licence déclarée dans une métadonnée est un point de départ,
pas la fin de l'examen.

## 4. Environnement de développement

Versions rapportées :

- Node.js 22.23.2.
- npm 12.2.2.
- Git 2.54.0.windows.1.
- Go 1.27.3.
- VS Code, version non renseignée.
- Visual Studio Build Tools 2022, version 17.14.37806.7.
- Visual Studio Community 2026, version 18.12.12324.72.

Ces outils ne sont pas actuellement prévus comme fichiers
à redistribuer intégralement avec Factorealm.

Les composants qu'ils pourraient incorporer ou faire redistribuer
doivent être examinés séparément.

La présence d'un outil sur le poste ne valide pas toutes
ses conditions d'utilisation pour les futurs contributeurs.

## 5. Dépendances transitives

Le graphe effectivement résolu est enregistré dans :

    frontend/package-lock.json

Ce fichier doit être conservé dans Git.

Son contenu complet n'a pas été examiné dans la conversation.
L'inventaire transitif reste à produire à partir du lockfile réel.

Les plages présentes dans les métadonnées des dépendances
ne suffisent pas à décrire ce qui a effectivement été installé.

Les dépendances facultatives et natives peuvent varier
selon la plateforme et l'architecture.

## 6. Périmètres à distinguer

### Développement

Outils servant à éditer, vérifier et construire le programme.

### Tests

Composants utilisés pour exécuter les tests.
Ils ne doivent pas être supposés nécessaires à l'application finale.

### Exécution

Composants nécessaires au programme livré.

### Contenu incorporé

Code, bibliothèques, ressources ou notices incorporés
dans les fichiers générés ou les installateurs.

La catégorie devDependencies ne suffit pas à déterminer
les obligations de redistribution d'un artefact construit.

L'examen doit porter aussi sur le contenu final distribué.

## 7. Ressources visuelles actuelles

- Aucun fichier de police ajouté.
- Police système demandée par le CSS.
- Aucune bibliothèque d'icônes ajoutée.
- Aucun logo graphique ajouté.
- Aucune image tierce ajoutée.
- Aucun modèle de document externe ajouté.

Toute introduction de police, icône, image ou modèle
doit compléter cet inventaire avant redistribution.

## 8. Composants envisagés mais non intégrés

- Rust.
- Tauri.
- WebView et dépendances système associées.
- PostgreSQL.
- SQLCipher et pilote Go.
- Bibliothèque de génération PDF.
- Bibliothèques cryptographiques supplémentaires.
- Connecteurs de facturation électronique.
- Outils de packaging et de mise à jour.

Aucune version ni compatibilité de licence n'est validée ici
pour ces composants.

## 9. Contrôles de sécurité rapportés

npm a indiqué zéro vulnérabilité lors des installations
dont les sorties ont été transmises.

Ce résultat est limité au contrôle effectué à ce moment
et aux informations disponibles pour ce contrôle.

Il ne constitue pas :

- un audit du code ;
- une preuve d'absence de vulnérabilité ;
- une vérification des licences ;
- une validation de la chaîne de publication.

## 10. Travail restant avant redistribution

1. Examiner les archives et textes de licence des versions exactes.
2. Inventorier les dépendances transitives à partir du lockfile.
3. Identifier les composants réellement incorporés aux artefacts.
4. Examiner les dépendances natives par plateforme.
5. Conserver les notices requises.
6. Déterminer les obligations de fourniture des sources applicables.
7. Vérifier les interactions avec la licence du projet envisagée.
8. Faire adopter formellement la licence du code.
9. Ajouter LICENSE et les notices nécessaires.
10. Actualiser l'inventaire à chaque changement de dépendances.

Aucune conclusion globale de compatibilité AGPL-3.0
n'est formulée avant ces vérifications.

## 11. Règle de maintenance

Pour chaque nouveau composant :

- documenter le besoin ;
- fixer la version directe retenue ;
- vérifier les contraintes techniques ;
- relever la licence et examiner son texte ;
- mettre à jour le lockfile par l'outillage ;
- identifier les dépendances natives ou transitives significatives ;
- vérifier installation, tests et construction ;
- consigner les limites connues.

Ne pas inventer de lockfile.
Ne pas contourner silencieusement les incompatibilités.
Ne pas utiliser une correction forcée sans analyse.
