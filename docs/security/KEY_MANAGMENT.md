# Gestion des clés et chiffrement

## Statut

Architecture proposée, à valider par essais et revue de sécurité.

Aucun algorithme, format cryptographique ou bibliothèque n'est figé
par ce document.

Ne pas concevoir de primitive cryptographique propriétaire.
Utiliser des formats et bibliothèques examinés avant adoption.

## 1. Principes

- Chaque entreprise possède son propre matériel de récupération.
- Aucune copie n'est envoyée à Thibstudio24 ou à un service central.
- Les clés opérationnelles sont distinctes de la clé de récupération.
- Les secrets ne figurent pas dans Git, les journaux ou les exemples.
- Les mots de passe des comptes ne sont pas les clés de chiffrement.
- Une sauvegarde doit être récupérable sans la machine d'origine.
- La clé de signature des mises à jour est totalement séparée.

## 2. Hiérarchie proposée

### Matériel de récupération

Une clé de récupération générée avec une source aléatoire appropriée
permet de déverrouiller les clés nécessaires à la récupération.

Son format et sa procédure de vérification restent à sélectionner.

Elle doit être remise explicitement à l'entreprise.
Une confirmation de conservation devra être demandée.

Elle ne doit pas être nécessaire au fonctionnement quotidien.

### Clés opérationnelles

Les usages doivent être séparés, notamment :

- base locale SQLCipher ;
- pièces jointes ;
- cache client ;
- sauvegardes ;
- secrets de configuration.

Les mécanismes d'enveloppement des clés doivent permettre
la récupération et le remplacement des protections d'accès.

Éviter une clé unique directement utilisée pour tous les usages.

### Protection locale

Les clés opérationnelles sont protégées par un mécanisme adapté
au système et au mode d'installation.

Les mécanismes exacts seront choisis après identification des versions
Windows et Linux ciblées.

Une protection liée à une machine ne doit pas être l'unique moyen
de récupérer une sauvegarde.

## 3. PostgreSQL

Orientation proposée :

- stockage système chiffré pour les données PostgreSQL ;
- prise en compte des journaux transactionnels et espaces temporaires ;
- inventaire des autres emplacements utilisés par la base ;
- sauvegardes applicatives indépendamment chiffrées.

Le choix PostgreSQL n'implique pas que ces protections sont déjà présentes.

L'installateur devra contrôler les prérequis vérifiables et expliquer
ce qui nécessite une confirmation de l'administrateur.

La procédure ne doit pas se contenter d'un message affirmant
que la base est chiffrée sans preuve exploitable.

La récupération de l'application et celle d'un volume système sont
deux procédures différentes.

Une restauration applicative sur un nouveau volume doit être possible
sans dépendre du déverrouillage de l'ancien volume.

## 4. SQLCipher

À vérifier dans le prototype technique :

- pilote et version ;
- paramètres retenus ;
- création et ouverture de base ;
- journalisation et fichiers associés ;
- migration ;
- changement de protection ;
- sauvegarde et récupération ;
- absence de clé dans les erreurs et journaux.

Le choix SQLCipher ne couvre pas automatiquement les PDF,
images, fichiers temporaires ou exports.

## 5. Pièces jointes

Les fichiers gérés par Factorealm doivent utiliser un chiffrement
authentifié via une bibliothèque choisie et examinée.

Le format doit prévoir :

- version ;
- identification des clés sans divulgation du secret ;
- vérification d'intégrité ;
- gestion sûre des valeurs uniques exigées par le mécanisme ;
- traitement explicite des fichiers incomplets ou altérés.

Les noms et métadonnées visibles sur le disque doivent être minimisés.

Les aperçus et fichiers temporaires doivent être inclus dans l'analyse.

## 6. Démarrage et déverrouillage

Deux politiques sont envisagées.

### Manuel

Après redémarrage, un opérateur habilité déverrouille le service.

Avantage recherché : ne pas conserver sur la machine tous les éléments
permettant un démarrage autonome.

Conséquence : indisponibilité jusqu'au déverrouillage.

### Automatique

Le système fournit au service les protections nécessaires au démarrage.

Avantage recherché : disponibilité sans intervention.

Limite : la sécurité dépend davantage du système, de son état
et de la protection de son stockage.

Aucune politique par défaut n'est encore adoptée.

## 7. Comptes et administrateurs

Retirer un administrateur doit inclure :

- révocation du compte et des sessions ;
- examen des accès système et des destinations de sauvegarde ;
- remplacement des secrets partagés auxquels il avait accès ;
- rotation des protections concernées selon le risque.

Une rotation ne retire pas l'accès à une ancienne copie déjà déchiffrée.

Si une ancienne clé de récupération a été copiée, remplacer la protection
des nouvelles données ne neutralise pas les anciennes sauvegardes
encore accessibles avec cette clé.

## 8. Perte de clé

Si toutes les clés et toutes les installations déverrouillables
sont perdues, aucune restauration n'est promise.

Si une installation reste exploitable, une procédure contrôlée
pourra éventuellement créer un nouveau dispositif de récupération.

Cette possibilité doit être testée et ne doit pas être annoncée
comme disponible avant implémentation.

## 9. Exports

- Exports de données chiffrés par défaut.
- Export complet soumis à une permission distincte.
- Export non chiffré soumis à une autorisation explicite.
- PDF externes, impressions et exports comptables soumis
  à leurs permissions propres.
- Aucun export ne contourne les droits sur les données.

Un fichier volontairement remis en clair sort du périmètre
de protection du stockage interne.

## 10. Tests requis

- Mauvaise clé.
- Clé manquante.
- Données altérées.
- Interruption pendant un changement de protection.
- Récupération sur machine vierge.
- Rotation et ouverture des sauvegardes antérieures.
- Contrôle des journaux et fichiers intermédiaires.
- Changement d'utilisateur ou de compte de service.
- Arrêt et redémarrage selon les deux politiques envisagées.
