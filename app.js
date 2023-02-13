//on déclare la constante qui contiendra l'export du module express
const express = require("express");
//on déclare la constante qui contiendra la fonction express qui crée l'appli
const app = express();

 // Déclarer constante qui contiendra l'export du module  body parser
 const bodyParser = require("body-parser"); 
 // Pour faire l'appli express devra utiliser bodyParser
 app.use(bodyParser.json());
//import des routes de l'application
 const franceRoutes = require('./src/routes/france_route');
 const angleterreRoutes = require('./src/routes/angleterre_route');
 const espagneRoutes = require('./src/routes/espagne_route');
 const allemagneRoutes = require('./src/routes/allemagne_route');
 const italieRoutes = require('./src/routes/italie_route');

//c'est un route par défault qui renvois un chaine de caractères
//GET "/"
//Ex: http://localhost:3000/
app.get('/', (request, response) => {
    response.send("Hello !")
})

//enregistrement des routes dans l'application
app.use(franceRoutes);
app.use(angleterreRoutes);
app.use(espagneRoutes);
app.use(allemagneRoutes);
app.use(italieRoutes);


// On export la constante app pour la rendre utilisable dans d'autres parties du code
module.exports = app;