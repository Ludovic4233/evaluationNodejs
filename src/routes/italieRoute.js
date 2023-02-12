const express = require('express');
const router = express.Router();
const italieController = require('../controller/italieController');

//création de la route permettant d'ajouter des données dans le tableau italie
//POST: "/italie"
//Ex: http://localhost:3000/italie
router.post("/italie", italieController.createData);

//création de la route permettant d'afficher les données du tableau italie
//GET: "/italie"
//Ex: http://localhost:3000/italie
router.get("/italie", italieController.getAllData);

//création de route de la route permettant d'afficher les données par id
//GET: "/italie/:id"
//Ex: http://localhost:3000/italie/1
router.get("/italie/:id", italieController.getDataById);

//création de la route permettant d'afficher les données par le name
//GET: "/italie/:name"
//Ex: http://localhost:3000/italie/search/juventus
router.get("/italie/search/:name", italieController.getDataByName);

//création de la route permettant de mettre à jour le tableau italie dans le fichier data.json
//PUT: "/italie/:id"
//Ex: http://localhost:3000/italie/2
router.put("/italie/:id", italieController.updateData);

//création de la route permettant de supprimer des données dans le tableau italie 
//DELETE: "/italie/:id
//Ex: http://localhost:3000/italie/3"
router.delete("/italie/:id", italieController.deleteData);


module.exports = router;