const express = require('express');
const router = express.Router();
const franceController = require('../controller/franceController');

//définir la route qui permet d'ajouter une donnée ds le tableau france
//POST "/france"
//Ex: http://localhost:3000/france
router.post("/france", franceController.createData);

//c'est la route qui permet d'afficher le contenu du tableau france contenu ds le fichier data.json
//GET "/france"
//Ex: http://localhost:3000/france
router.get('/france', franceController.getAllData);

//c'est la route qui permet de récupérer une donnée du tableau france par son id
//GET "/france/:id"
//Ex: http://localhost:3000/france/1
router.get("/france/:id", franceController.getDataById);

//création de la route qui permet d'afficher une donnée du tableau france par son nom dans le fichier data.json
//GET: "/france/:name"
//Ex: "http://localhost:3000/france/search/paris saint-germain"
router.get("/france/search/:name", franceController.getDataByName);

//La route qui permet de mettre à jour une donnée du tableau france par son id
//PUT "/france/:id"
//Ex: http://localhost:3000/france/1
router.put("/france/:id", franceController.updateData);

//c'est la route qui permet de mettre à jour une donnée du tableau france par son id
// DELETE "/france/:id"
//Ex: http://localhost:3000/france/2
router.delete("/france/:id", franceController.deleteData);


module.exports = router;