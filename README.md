evaluation nodejs
=================
l'évaluation consiste à réaliser des opération CRUD sur un fichier JSON qui se trouve dans:
````
./src/model/data.json
````
Le code source utilisé pour générer les réponses se trouve dans le dossier:
````
./src/controller
````
La liste des router se trouve dans:
````
./src/routes
````
Les routes utilisées ci dessous pour le tableau france sont aussi valables pour les autres tableaux
## Liste des routes
| routes | verbe | exemple | Explication|
| :----- | :---- | -------|------:|
|/france| GET| http://localhost:3000/france | cet route permet de récupérer toutes les données du tableau france dans un fichier|
|/france| POST| http://localhost:3000/france | cet route permet d'ajouter une données dans un tableau dans un fichier|
|/france/:id| GET| http://localhost:3000/france/3 | cet route permet de récupérer une données dans le tableau france dans un fichier par son id|
|/france/:name| GET| http://localhost:3000/france/search/rc lens | cet route permet de récupérer une données dans le tableau france dans un fichier par son name|
|/france/:id| PUT| http://localhost:3000/france/1 | cet route permet de mettre à jour une données dans le tableau france dans un fichier|
|/france/:id| DELETE| http://localhost:3000/france/2 | cet route permet de supprimer une données dans le tableau france dans un fichier|

## Liste des librairies utilisées
| librairie | version | raison | 
| :----- | :---- | -------:|
|express| 4.18.2| express sert de middleware pour manipuler les requètes entrantes et les réponses sortantes |
|body-parser| 1.20.1| bodyParser nous permet d'accéder à la requète du body | 
|fs| ^0.0.1-security| fs permet de manipuler les fichiers | 
|nodemon| ^2.0.20| nodemon sert uniquement au dev afin d'avoir un server en livereload | 

### installation du projet 
* Mettez vous à la racine du projet
* Ouvrez un terminal
* Assurez vous d'avoir node installer via la commande
```bash
node -v
```
* Installer les dépendances avec la commande
```bash
npm install
```
