const fs = require('fs');

exports.createData = (request, response) => {
    //on lit le fichier data.json
    fs.readFile("./src/model/data.json", (err, data) => {
        //si il y a une erreur de lecture
        if(err){
            //on renvoie une réponse avec un status 500 et un message d'erreur
            response.status(500).json({
                message: "Une erreur lors de lecture du fichier c'est produite",
                error: err
            })
        }else{
            //on récupère les données, on les transforment en objet json et on les stockent ds une constante
            const existing_data = JSON.parse(data);
            //si le tableau angletterre contenu dans les données est vide 
            if(existing_data.angleterre.length === 0){
                //on ajoute un objet avec un id=1 et un name = à la requète comme souhaité
                existing_data.angleterre.push({
                    "id":1,
                    "name":request.body.name.toLowerCase()
                })
                //sinon
            }else{
                //on récupère le dernier objet du tableau clubs et on le stock dans une constante
                const dataById = existing_data.angleterre.findLast(
                    (obj) => obj.id
                    )
                    //on ajoute dans le tableau un nouvel objet avec un id égal à l'id du dernier objet du tableau plus 1
                    existing_data.angleterre.push({
                        "id":dataById.id+1,
                        "name":request.body.name.toLowerCase()
                    })
                    //on réécrit la donnée dans le fichier data.json avec existing_data qui contient le body de la requète en plus
                }
                fs.writeFile('./src/model/data.json', JSON.stringify(existing_data), (writeErr) => {
                    //si il y a une erreur d'écriture on renvoit un réponse avec un status (500) et un message d'erreur
                    if(writeErr){
                        response.status(500).json({
                            message: "erreur lors de l'écriture",
                            error: err
                        })
                    }else{
                        //sinon on renvoit un réponse avec un status 200 et un message confirmant que les données on été ajouter
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
    fs.readFile("./src/model/data.json", (err, data) => {
        //si il y a une erreur de lecture
        if(err){
            //on renvoie un message d'erreur avec le status 500
            response.status(500).json({
                message: "Une erreur lors de lecture du fichier c'est produite",
                error: err
            })
        }else{
            //on stock les données dans une constante sous forme d'objet
            const existingData = JSON.parse(data)
            //on stock dans une constante le tableau angleterre 
            const allData = existingData.angleterre
            //on envoit une réponse avec le status 200 et le tableau angleterre
            response.status(200).json(allData);
        }
    })
}

exports.getDataById = (request, response) => {
    //on lit le fichier data.json
    fs.readFile("./src/model/data.json", (err, data) => {
        //si il y a une erreur lors de la lesture du fichier data.json
        if(err){
            //on renvoie un message d'erreur avec le status 500
            response.status(500).json({
                message: "Une erreur lors de lecture du fichier c'est produite",
                error: err
            })
        }else{
            //on récupère les données on les transforment sous forme d'objet json manipulable
            const manipData = JSON.parse(data);
            //on stock ds une constante l'objet du tableau angleterre dont l'id = l'id de la requète
            const manipDataById = manipData.angleterre.find(
                (obj) => obj.id === parseInt(request.params.id)
            )
            //si on ne trouve pas cet objet
            if(!manipDataById){
                //on envoit une réponse avec un status 404 et un message d'erreur
                response.status(404).json({
                    message: "erreur, pas de donnée avec cet id"
                })
            }else{
                //on envoit une réponse avec un status 200 et l'objet dont l'id est = l'id de la requète
                response.status(200).json(manipDataById);
            }
        }
    })
}

exports.getDataByName = (request, response) => {
    //on lit le fichier data.json
    fs.readFile("./src/model/data.json", (err, data) => {
        //si il y a une erreur de lecture
        if(err){
            //on renvoie une réponse avec un status 500 et un message d'erreur
            response.status(500).json({
                message: "Une erreur lors de lecture du fichier c'est produite",
                error: err
            })
        }else{
            //sinon on récupère les données, on les transforment en objet (JSON.parse) et on les stockent dans une constante
            const dataName = JSON.parse(data)
            // on stock dans une constante l'objet du tableau clubs possèdant un name égal au name de la requète
            const dataByName = dataName.angleterre.find(
                (obj) => obj.name === request.params.name.toLowerCase()
            )
            //si on ne trouve pas d'objet avec ce name
            if(!dataByName){
                //on renvoie une réponse avec un status 404 et un message d'erreur
                response.status(404).json({
                    message: "Pas de club possèdant ce nom dans les données",
                    error: err
                })
            }else{
                //sinon on renvoie une reponse avec un status 200 et la constante possédant l'objet un name = au name de la requète
                response.status(200).json(dataByName);
            }
        }
    })
          
}

exports.updateData = (request, response) => {
    //on lit le fichier data.json
    fs.readFile("./src/model/data.json", (err, data) => {
        //si il y a une erreur de lecture
        if(err){
            //on renvoit une réponse avec un status 500 et un message d'erreur
            response.status(500).json({
                message: "Une erreur est survenue lors de la lecture du fichier data.json",
                error: err
            })
        }else{
            //on stock les données trouver dans une constante et les transforment en objet json
            const existingData = JSON.parse(data);
            //dans le tableau clubs on sélectionne l'objet avec le même id que la requète et on le stock dans dataById
            const dataById = existingData.angleterre.find(
                (obj) => obj.id === parseInt(request.params.id)
            )
            if(!dataById){
                response.status(404).json({
                    message: "Pas objet avec cet id ",
                    error: err
                })
            }else{
                //on change le name de l'objet et on lui assigne le name de la requète du body
                dataById.name = request.body.name.toLowerCase()
                //on écrit les données modifier dans data.json
                fs.writeFile("./src/model/data.json", JSON.stringify(existingData), (writeErr) => {
                    //si il y a une erreur d'écriture 
                    if(writeErr){
                        //on envoit une réponse avec un status 500 et un message d'erreur
                        response.status(500).json({
                            message: "Une erreur d'écriture est survenue",
                            error: err
                        })
                    }else{
                        //on envoit un réponse avec un status 200 et un message confirmant la misent à jour des données
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
    //on lit le ficjier data.json
    fs.readFile("./src/model/data.json", (err, data) => {
        //si il y a une erreur lors de la lecture du fichier
        if(err){
            //on envoit une réponse avec le status 500 et un message d'erreur
            response.status(500).json({
                message: "erreur est survenue lors de la lecture des données",
                error: err
            })
        }else{
            //on stock les données dans une constante et on les transforme en objet
            const existing_data = JSON.parse(data)
            //on stock l'objet dont l'id = l'id de la requète
            const dataById = existing_data.angleterre.find(
                (obj) => obj.id === parseInt(request.params.id)
            )
            //si on ne trouve pas d'objet avec cet id
            if(!dataById){
                response.status(404).json({
                    message: "Pas d'objet avec cet id"
                })
            }else{
                //dans le tableau clubs on va garder uniquement les objet dont l'id est différent de l'id de la requète
               existing_data.angleterre = existing_data.angleterre.filter(
                (obj) => obj.id != parseInt(request.params.id)
               ) 
               //on réécrit les données dans le fichier data.json
               fs.writeFile("./src/model/data.json", JSON.stringify(existing_data), (writeErr) => {
                //si il y a une erreur d'écriture
                if(writeErr){
                    //on envoit une réponse avec un status 500 et un message d'erreur
                    response.status(500).json({
                        message: "Une erreur est survenue lors de l'écriture des données",
                        error: err
                    })
                }else{
                    //sinon on renvoit une réponse avec un status 200 et un message confirmant la mise à jour du fichier
                    response.status(200).json({
                        message: "Les données on bien été misent à jour"
                    })
                }
               })
            }
        }
    })
}