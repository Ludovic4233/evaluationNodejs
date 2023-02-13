const fs = require('fs');

exports.createData = (request, response) => {
    //on lit le fichier data.json
    fs.readFile("./src/model/data.json", (err, data) => {
        //si il y a une erreur lors de la lecture du fichier
        if(err){
            //on envoit une réponse avec un status 500 et un message d'erreur
            response.status(500).json({
                message: "Une erreur est survenue lors de la lecture du fichier",
                error: err
            })
            //sinon 
        }else{
            //on stock les données du fichier dans une constante et on les transforment en objet
            const existingData = JSON.parse(data)
            //si la taille du tableau espagne est vide
            if(existingData.espagne.length === 0){
                //on ajoute dans ce tableau (push) un objet avec un id = 1 et un name = au name du body de la requète
                existingData.espagne.push({
                    "id":1,
                    "name":request.body.name.toLowerCase()
                })
                //sinon
            }else{
                //on stock dans une constante le dernier objet du tableau espagne
                const lastData = existingData.espagne.findLast(
                    (obj) => obj.id
                )
                //on ajoute dans le tableau espagne un objet avec un name = name du body de la requète et un id = l'id du dernier objet du tableau + 1
                existingData.espagne.push({
                    "id": lastData.id+1,
                    "name": request.body.name.toLowerCase()
                })
            }
            //on écrit les données modifier dans le fichier data.json
            fs.writeFile("./src/model/data.json", JSON.stringify(existingData), (writeErr) => {
                //si il y a une erreur lors de l'écriture 
                if(writeErr){
                    //on envoit une réponse avec un status 500 et un message d'erreur
                    response.status(500).json({
                        message: "Une erreur est survenue lors de l'écriture des données"
                    })
                    //sinon
                }else{
                    //on renvoit une réponse avec un status 200 et un message confirmant que les données ont été ajouter
                    response.status(200).json({
                        message: "Les données ont bien été ajouter"
                    })
                }
            })
            
        }
    })
}

exports.getAllData = (request, response) => {
    //on lit le fichier data.json qui contient les données
    fs.readFile("./src/model/data.json", (err, data) => {
        //si une erreur est survenue lors de la lecture
        if(err){
            //on envoit une réponse avec le status 500 et un message d'erreur
            response.status(500).json({
                message: "Une erreur est survenue lors de la lecture du fichier",
                error: err
            })
        }else{
            //on stock les données dans une constante sous forme d'objet
            const existingData = JSON.parse(data)
            //on stock dans une constante le tableau espagne
            const allData = existingData.espagne
            //on envoit une réponse avec le status 200 et le tableau espagne
            response.status(200).json(allData)
        } 
    })
}

exports.getDataById = (request, response) => {
    //on lit le fichier data.json qui contient les données
    fs.readFile("./src/model/data.json", (err, data) => {
        //si il y a une erreur de lecture
        if(err){
            //on envoit une réponse avec un status 500 et un message d'erreur
            response.status(500).json({
                message: "Erreur lors de la lecture du fichier",
                error: err
            })
        }else{
            //sinon on stock les données dans une constante
            const existingData = JSON.parse(data)
            //on stock dans une constante l'objet du tableau espagne dont l'id = l'id de la requète
            const dataById = existingData.espagne.find(
                (obj) => obj.id === parseInt(request.params.id)
            )
            //si on ne trouve pas d'objet avec cet id 
            if(!dataById){
                //on envoit une réponse avec un status 404 et un message d'erreur
                response.status(404).json({
                    message: "Pas d'objet avec cet id"
                })
            }else{
                //sinon on revoit une réponse avec un status 200 et l'objet dont l'id = l'id de la requète
                response.status(200).json(dataById)
            }
        }

    })
}

exports.getDataByName = (request, response) => {
    //on lit le fichier data.json
    fs.readFile("./src/model/data.json", (err, data) => {
        //si il y a une erreur de lecture on envoit une réponse avec un status 500 et un message d'erreur
        if(err){
            response.status(500).json({
                message: "Une erreur est survenue lors de la lecture du fichier",
                error: err
            })
        }else{
            //sinon on stock les données ds une constante et on les transforment en objet
            const existingData = JSON.parse(data)
            //on stock dans une constante l'objet du tableau espagne dont le name = name de la requète
            const dataByName = existingData.espagne.find(
                (obj) => obj.name === request.params.name.toLowerCase()
            )
            //si on ne trouve pas d'objet dont le name = name de la requète
            if(!dataByName){
                //on renvoit une réponse avec un status 404 et un message d'erreur
                response.status(404).json({
                    message: "pas d'objet avec ce name"
                })
                //sinon on renvoit une réponse avec un status 200 et l'objet dont le name = name de la requètre
            }else{
                response.status(200).json(dataByName)
            }
        }
    })
}

exports.updateData = (request, response) => {
    //on lit le fichier data.json
    fs.readFile("./src/model/data.json", (err, data) => {
        //si il y a une erreur lors de la lecture du fichier
        if(err){
            //on envoit une réponse avec un status 500 et un message d'erreur
            response.status(500).json({
                message: "Une erreur est survenue lors de la lecture du fichier",
                error: err
            })
        }else{
            //on stock les données dans une constante et les transforment en objet
            const existingData = JSON.parse(data)
            //on stock dans une constante l'objet du tableau espagne dont l'id = l'id de la requète
            const dataById = existingData.espagne.find(
                (obj) => obj.id === parseInt(request.params.id)
            )
            //si on ne trouve pas d'objet avec cet id
            if(!dataById){
                //on renvoit une réponse avec un status 404 et un message d'erreur
                response.status(404).json({
                    message: "pas d'objet avec cet id"
                })
            }else{
                //on remplace le name de l'objet dont l'id = id de la requète par le name du body de la requète
                dataById.name = request.body.name.toLowerCase()
                //on écrit les données mise à jour dans le fichier data.json
                fs.writeFile("./src/model/data.json", JSON.stringify(existingData), (writeErr) => {
                    //si il ya une erreur lors l'écriture du fichier
                    if(writeErr){
                        //on renvoit une réponse avec un status 500 et un message d'erreur
                        response.status(500).json({
                            message: "une erreur survenue lors de l'écriture du fichier"
                        })
                        //sinon
                    }else{
                        //on envoit une réposonse avec un status 200 et un message confirmant la mise à jour des données
                        response.status(200).json({
                            message:"Les données ont bien été mise à jour"
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
            //on envoit une réponse avec un status 500 et un message d'erreur
            response.status(500).json({
                message: "Une erreur est survenue lors de la lecture du fichier",
                error: err
            })
        }else{
            //sinon on stock les données dans une constante et on les transforment en objet
            const existingData = JSON.parse(data)
            //on filtre le tableau espagne et on garde les objet dont l'id est différent de l'id de la requète
            existingData.espagne = existingData.espagne.filter(
                (obj) => obj.id != parseInt(request.params.id)
            )
            //on écrit le fichier data.json avec les données misent à jour
            fs.writeFile("./src/model/data.json", JSON.stringify(existingData), (writeErr) => {
                //si il y a une erreur lors de l'écriture du fichier
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
    })
}