const express = require('express');
const router = express.Router();
const allemagneController = require('../controller/allemagne_controller');

//création de la route permettant d'ajouter des données dans le tableau allemagne
//POST: "/allemagne"
//Ex: http://localhost:3000/allemagne
router.post('/allemagne', allemagneController.createData);

//création de la route permettant d'afficher les données du fichier data.json
//GET: "/allemagne"
//Ex: http://localhost:3000/allemagne
router.get('/allemagne', allemagneController.getAllData);

//création de la route permettant d'afficher les données du tableau allemagne par un id
//GET: "/allemagne/:id"
//Ex: http://localhost:3000/allemagne/3
router.get('/allemagne/:id', allemagneController.getDataById);

//création de la route permettant d'afficher les données du tableau allemagne par un name
//GET: "/allemagne/search/:name"
//Ex: http://localhost:3000/allemagne/search/bayern munich
router.get('/allemagne/search/:name', allemagneController.getDataByName);

//création de la route permettant de mettre à jour une données du tableau allemagne 
//PUT: "/allemagne/:id"
//Ex: http://localhost:3000/allemagne/1
router.put('/allemagne/:id', allemagneController.updateData);

//création de la route permettant de supprimer les données du tableau allemagne
//DELETE: "/allemagne/:id"
//Ex: http://localhost:3000/allemagne/2
router.delete('/allemagne/:id', allemagneController.deleteData);

module.exports = router;