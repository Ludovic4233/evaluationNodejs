const express = require('express');
const router = express.Router();
const espagneController = require("../controller/espagneController");

//création de le route permettant d'accéder au contenu du fichier data.json
//GET: "/espagne"
//Ex: http://localhost:3000/espagne
router.get('/espagne', espagneController.getAllData)

//création de la route permettant d'accéder aux données du tableau espagne par son id
//GET: "/espagne/:id"
//Ex: http://localhost:3000/espagne/3
router.get("/espagne/:id", espagneController.getDataById)

//création de la route permettant d'afficher les données du tableau espagne par son nom
//GET: "/espagne/search/:name"
//Ex: "http://localhost:3000/espagne/search/barcelone"
router.get("/espagne/search/:name", espagneController.getDataByName)

//création de la route permettant d'ajouter une donnée au tableau espagne
//POST: "/espagne"
//Ex: "http://localhost:3000/espagne"
router.post("/espagne", espagneController.createData)

//création de la route permettant de mettre à jour les données du tableau espagne par son id
// PUT: "/espagne/:id"
//Ex: "http://localhost:3000/espagne"
router.put("/espagne/:id", espagneController.updateData)

//création de la route permettant de supprimer une donnée par son id
//DELETE: "/espagne/:id"
//Ex: http://localhost:3000/espagne/2
router.delete("/espagne/:id", espagneController.deleteData)

module.exports = router;