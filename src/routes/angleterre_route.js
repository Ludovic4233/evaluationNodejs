const express = require('express');
const router = express.Router();
const angleterreController = require('../controller/angleterre_controller');

//création de la route qui mène au contenu du tableau clubs dans le fichier data.json
//GET "/angleterre"
//Ex: http://localhost:3000/angleterre
router.get("/angleterre", angleterreController.getAllData);

//création de la route qui mène à un contenu du tableau clubs par son id dans le fichier data.json
//GET "/angleterre/:id"
//Ex: http://localhost:3000/angleterre/3
router.get("/angleterre/:id", angleterreController.getDataById);

//création de la route qui permet d'afficher une donnée du tableau clubs par son nom dans le fichier data.json
//GET: "/angleterre/:name"
//Ex: "http://localhost:3000/angleterre/search/arsenal"
router.get("/angleterre/search/:name", angleterreController.getDataByName);

//création de la route permettant d'ajouter une donnée dans le tableau clubs
//POST: "/angleterre"
//Ex: http://localhost:3000/angleterre
router.post("/angleterre", angleterreController.createData);

//création de la route permettant de mettre à jour une donnée dans le tableau clubs
//PUT: "/angleterre"
//Ex: http://localhost:3000/angleterre/:id
router.put("/angleterre/:id", angleterreController.updateData);

//création de la route pour supprimer une donnée dans dans le tableau clubs
//DELETE "/angleterre/:id"
//Ex: http://localhost:3000/angleterre/:id
router.delete("/angleterre/:id", angleterreController.deleteData);

module.exports = router;