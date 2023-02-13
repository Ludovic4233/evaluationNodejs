const fs = require('fs');

exports.createData = (request, response) => {
    //on lit le fichier data.json
    fs.readFile('./src/model/data.json', (err, data) => {
        //si il y a une erreur lors de la lecture du fichier
        if(err){
            //Une réponse avec un status 500 et un message d'erreur est envoyé
            response.status(500).json({
                message: "Une erreur est survenue lors de la lecture du fichier",
                error: err
            })
        }else{
            //on récupère les données et on les stock dans existingData sous forme d'objet
            const existingData = JSON.parse(data)
            //Si la taille du tableau allemagne = 0 (c-à-dire si il est vide)
            if(existingData.allemagne.length === 0){
                //on ajoute dans ce tableau un objet avec un id = 1 et un name = requète du body
                existingData.allemagne.push({
                    "id":1,
                    "name":request.body.name.toLowerCase()
                })
                //sinon
            }else{
                //Dans existingData on récupère le dernier objet du tableau allemagne et on le stock dans lastData
                const lastData = existingData.allemagne.findLast(
                    (obj) => obj.id
                )
                //on ajoute dans ce tableau un objet avec un id = l'id du dernier objet+1 et un name = requète du body
                existingData.allemagne.push({
                    "id":lastData.id+1,
                    "name":request.body.name.toLowerCase()
                }) 
            }
            //on écrit les données misent à jour dans data.json
            fs.writeFile("./src/model/data.json", JSON.stringify(existingData), (writeErr) => {
                //si il y a une erreur lors de la lecture du fichier
                if(writeErr){
                    //on envoit une réponse avec un status 500 et un message d'erreur
                    response.status(500).json({
                        message: "Une erreur est survenue lors de l'écriture du fichier"
                    })
                }else{
                    //sion on envoit une réponse avec un status 200 et un message confirmant que les données ont été misent à jour
                    response.status(200).json({
                        message:"Les données ont bien été ajouter"
                    })
                }
            })
        }
    }) 
}

exports.getAllData = (request, response) => {
    //on lit le fichier data.json
    fs.readFile('./src/model/data.json', (err, data) => {
        //si il y a une erreur lors de la lecture du fichier
        if(err){
            //on envoit une réponse avec un message d'erreur et un status 500
            response.status(500).json({
                message: "Une erreur est survenue lors de la lecture du fichier"
            }) 
        }else{
            //on stock les données dans une constante sous forme d'objet
            const existingData = JSON.parse(data)
            //on stock dans une constante le tableau allemagne
            const allData = existingData.allemagne
            //on envoit une réponse avec le status 200 et le tableau allemagne
            response.status(200).json(allData)
        }
    })
}

exports.getDataById = (request, response) => {
    //on lit le fichier data.json
    fs.readFile('./src/model/data.json', (err, data) => {
        //si il y a une erreur lors de la lecture du fichier
        if(err){
            //on envoit une réponse avec un message d'erreur et un status 500
            response.status(500).json({
                message: "Une erreur est survenue lors de la lecture du fichier"
            }) 
        }else{
            //on récupère les données on les transforment sous forme d'objet json manipulable
            const existingData = JSON.parse(data)
            //on stock ds une constante l'objet du tableau allemagne dont l'id = l'id de la requète
            const dataById = existingData.allemagne.find(
                (obj) => obj.id === parseInt(request.params.id)
            )
            //si on ne trouve pas cet objet
            if(!dataById){
                //on envoit une réponse avec un status 404 et un message d'erreur
                response.status(404).json({
                    message: "Pas d'objet avec cet id"
                })
            }else{
                //on envoit une réponse avec un status 200 et l'objet dont l'id est = l'id de la requète
                response.status(200).json(dataById)
            }
        }
    })
}

exports.getDataByName = (request, response) => {
    //on lit le fichier data.json
    fs.readFile('./src/model/data.json', (err, data) => {
        //si il y a une erreur lors de la lecture du fichier
        if(err){
            //on envoit une réponse avec un status 500 et un message d'erreur
            response.status(500).json({
                message: "Une erreur est survenue lors de la lecture du fichier",
                error: err
            })
        }else{
            //on stock les données du fichier dans existingData et on les transforment en objet
            const existingData = JSON.parse(data);
            //on stock dans dataByName l'objet du tableau allemagne dont le name = le name de la requète
            const dataByName = existingData.allemagne.find(
                (obj) => obj.name === request.params.name.toLowerCase()
            )
            //si on ne trouve pas d'objet avec ce name
            if(!dataByName){
                //on envoit une réponse avec un status 404 et un message d'erreur
                response.status(404).json({
                    message: "Pas d'objet avec ce name"
                })
            }else{
                //sinon on envoit une réponse avec un status 200 et l'objet dont le name = name de la requète
                response.status(200).json(dataByName)
            }
        }
    })
}

exports.updateData = (request, response) => {
    //on lit le fichier data.json
    fs.readFile('./src/model/data.json', (err, data) => {
        //si il y a une erreur lors de la lecture du fichier
        if(err){
            //on envoit une réponse avec un status 500 et un message d'erreur
            response.status(500).json({
                message: "Une erreur est survenue lors de la lecture du fichier",
                error: err
            })
        }else{
            //on stock les donneées du fichier data.json dans une constante sous forme d'objet
            const existingData = JSON.parse(data)
            //dans le tableau allemagne on sélectionne l'objet avec le même id que la requète et on le stock dans dataById
            const dataById = existingData.allemagne.find(
                (obj) => obj.id === parseInt(request.params.id)
            )
            if(!dataById){
                response.status(404).json({
                    message: "Pas d'objet avec cet id"
                })
            }else{
                //on change le name de l'objet et on lui assigne le name de la requète du body
                dataById.name = request.body.name.toLowerCase()
                //on écrit les données modifier dans data.json
                fs.writeFile('./src/model/data.json', JSON.stringify(existingData), (writeErr) => {
                    //si il y a une erreur d'écriture
                    if(writeErr){
                        //on envoit une réponse avec un status 500 et un message d'erreur
                        response.status(500).json({
                            message: "Une erreur est survenue lors de l'écriture du fichier"
                        })
                    }else{
                        //on envoit un réponse avec un status 200 et un message confirmant la misent à jour des données
                        response.status(200).json({
                            message: "Les données ont bien été misent à jour"
                        })
                    }
                })
            }
        }
    })
}

exports.deleteData = (request, response) => {
    //on lit le ficjier data.json
    fs.readFile('./src/model/data.json', (err, data) => {
        //si il y a une erreur lors de la lecture du fichier
        if(err){
            //on envoit une réponse avec le status 500 et un message d'erreur
            response.status(500).json({
                message: "Une erreur est survenue lors de la lecture du fichier",
                error: err
            })
        }else{
            //on stock les données dans une constante et on les transforme en objet
            const existingData = JSON.parse(data)
            //on stock l'objet dont l'id = l'id de la requète
            const dataById = existingData.allemagne.find(
                (obj) => obj.id === parseInt(request.params.id)
            )
            //si on ne trouve pas d'objet avec cet id
            if(!dataById){
                response.status(404).json({
                    message: "Pas d'objet avec cet id"
                })
            }else{
                //dans le tableau clubs on va garder uniquement les objet dont l'id est différent de l'id de la requète
                existingData.allemagne = existingData.allemagne.filter(
                    (obj) => obj.id != parseInt(request.params.id)
                )
                //on réécrit les données dans le fichier data.json
                fs.writeFile('./src/model/data.json', JSON.stringify(existingData), (writeErr) => {
                    //si il y a une erreur d'écriture
                    if(writeErr){
                        //on envoit une réponse avec un status 500 et un message d'erreur
                        response.status(500).json({
                            message: "Une erreur est survenue lors de l'écriture du fichier"
                        })
                    }else{
                        //sinon on renvoit une réponse avec un status 200 et un message confirmant la mise à jour du fichier
                        response.status(200).json({
                            message: "Les données ont bien été misent à jour"
                        })
                    }
                })
            }
        }
    })
}