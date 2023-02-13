const fs = require('fs');

exports.createData = (request, response) => {
    //on lit le fichier data.json
    fs.readFile('./src/model/data.json', (err, data) => {
        //si il y a une erreur lors de la lecture du fichier data.json
        if(err){
            //on envoit une réponse avec un status 500 et un message d'erreur
            response.status(500).json({
                message: "Une erreur est survenue lors de la lecture du fichier",
                error: err
            })
        }else{
            //stock les données dans existingData sous forme d'objet
            const existingData = JSON.parse(data)
            //on stock le dernier objet du tableau italie dans lastData
            const lastData = existingData.italie.findLast(
                (obj) => obj.id
            )
            //si le tableau italie est vide
            if(existingData.italie.length === 0){
                //on ajoute dans le tableau italie un objet avec un id = 1 et un name = la requète du body
                existingData.italie.push({
                    "id":1,
                    "name":request.body.name.toLowerCase()
                })
            }else{
                //sinon on ajoute dans le tableau italie un objet avec un id = l'id du dernier objet du tableau +1 et un name = la requète du body
                existingData.italie.push({
                    "id":lastData.id+1,
                    "name":request.body.name.toLowerCase()
                })
            }
            //on écrit le fichier data.json avec les donnés misent à jour
            fs.writeFile('./src/model/data.json', JSON.stringify(existingData), (writeErr) => {
                if(writeErr){
                    response.status(500).json({
                        message: "Une erreur est survenue lors de l'écriture du fichier"
                    })
                }else{
                    response.status(200).json({
                        message: "Les données ont bien été misent à jour"
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
            //on envoit une réponse avec le status 500 avec un message d'erreur
            response.status(500).json({
                message: "Une erreur est survenue lors de la lecture du fichier",
                error: err
            })
        }else{
            //on stock les données sous forme d'objet dans existingData
            const existingData = JSON.parse(data);
            //on stock le tableau italie dans italieData 
            const italieData = existingData.italie
            //si le tableau existe 
            if(!italieData){
                //on envoit une réponse avec le status 500 avec un message d'erreur 
                response.status(500).json({
                    message: "Pas de tableau italie"
                })
            }else{
                //sinon on envoit une réponse avec un status 200 et le tableau italie
                response.status(200).json(italieData)
            }
        }
    })
}

exports.getDataById = (request, response) => {
    //on lit le fichier data.json
    fs.readFile('./src/model/data.json', (err, data) => {
        //si il y a une erreur lors de la lecture du fichier
        if(err){
            //on envoit une réponse avec le status 500 avec un message d'erreur
            response.status(500).json({           
                message: "Une erreur est survenue lors de la lecture du fichier",
                error: err
            })
        }else{
            //on stock les données sous forme d'objet dans existingData
            const existingData = JSON.parse(data)
            //on stock dans data id le premier objet dont l'id = l'id de la requète
            const dataById = existingData.italie.find(
                (obj) => obj.id === parseInt(request.params.id)
            )
            //si cet objet n'existe pas
            if(!dataById){
                //on envoit une réponse avec un status 404 et un message d'erreur
                response.status(404).json({
                    message: "Pas d'objet avec cet id"
                })
            }else{
                //sinon on envoit une réponse avec un status 200 et l'objet dont l'id = l'id de la requète
                response.status(200).json(dataById)
            }
        }
    })
}

exports.getDataByName = (request, response) => {
    //on lit le fichier data.json
    fs.readFile("./src/model/data.json", (err, data) => {
        //si il y a une erreur lors de la lecture du fichier
        if(err){
            //on envoit une réponse avec le status 500 avec un message d'erreur
            response.status(500).json({
                message: "Une erreur est survenue lors de la lecture du fichier",
                error: err
            })
        }else{
            //on stock les données sous forme d'objet dans existingData
            const existingData = JSON.parse(data)
            //on stock dans dataName le premier objet dont le name = au name de la requète
            const dataName = existingData.italie.find(
                (obj) => obj.name === request.params.name.toLowerCase()
            )
            //si cet objet n'existe pas
            if(!dataName){
                //on envoit une réponse avec un status 404 et un message d'erreur
                response.status(404).json({
                    message: "Pas d'objet avec avec ce name"
                })
            }else{
                //sinon on envoit une réponse avec un status 200 et l'objet dont le name = au name de la requète
                response.status(200).json(dataName)
            }
        }
    })
}

exports.updateData = (request, response) => {
    //on lit le fichier data.json
    fs.readFile("./src/model/data.json", (err, data) => {
        //si il y a une erreur lors de la lecture du fichier
        if(err){
            //on envoit une réponse avec le status 500 avec un message d'erreur
            response.status(500).json({
                message: "Une erreur est survenue lors de la lecture du fichier",
                error: err
            })
        }else{
            //on stock les données sous forme d'objet dans existingData
            const existingData = JSON.parse(data)
            //on stock dans dataById le premier objet dont l'id = l'id de la requète
            const dataById = existingData.italie.find(
                (obj) => obj.id === parseInt(request.params.id)
            )
            //si cet objet n'existe pas
            if(!dataById){
                //on envoit une réponse avec un status 404 et un message d'erreur
                response.status(404).json({
                    message:"Pas d'objet avec cet id"
                })
            }else{
                dataById.name = request.body.name.toLowerCase()
                fs.writeFile('./src/model/data.json', JSON.stringify(existingData), (writeErr) => {
                    if(writeErr){
                        response.status(500).json({
                            message: "Une erreur est survenue lors de l'écriture du fichier",
                        })
                    }else{
                        response.status(200).json({
                            message: "Les données on bien été misent à jour"
                        })
                    }
                })
            }
        }
    })
}

exports.deleteData = (request, response) => {
    //on lit le fichier data.json
    fs.readFile("./src/model/data.json", (err, data) => {
        //si il y a une erreur lors de la lecture du fichier
        if(err){
            //on envoit une réponse avec le status 500 avec un message d'erreur
            response.status(500).json({
                message: "Une est survenue lors de la lecture du fichier",
                error: err
            })
        }else{
            //on stock les données sous forme d'objet dans existingData
            const existingData = JSON.parse(data)
             //on stock dans dataById le premier objet dont l'id = l'id de la requète
            const dataById = existingData.italie.find(
                (obj) => obj.id === parseInt(request.params.id)
            )
            //si cet objet n'existe pas
            if(!dataById){
                //on envoit une réponse avec un status 404 et un message d'erreur
                response.status(404).json({
                    message: "Pas d'objet avec cet id"
                })
            }else{
                existingData.italie = existingData.italie.filter(
                    (obj) => obj.id != parseInt(request.params.id)
                )
                fs.writeFile('./src/model/data.json', JSON.stringify(existingData), (writeErr) => {
                    if(writeErr){
                        response.status(500).json({
                            message: "Une erreur est survenue lors de l'écriture du fichier"
                        })
                    }else{
                        response.status(200).json({
                            message: "Les données ont bien été misent à jour"
                        })
                    }
                })
            }
        }
    })
}