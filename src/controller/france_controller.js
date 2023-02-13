const fs = require('fs');

exports.createData = (request, response) => {
    //on lit le fichier data.json
    fs.readFile("./src/model/data.json", (err, data) => {
        //si il y a une erreur de lecture
        if(err){
            response.status(500).json({
                message: "Erreur lecture",
                error: err
            })
        }else{
            //sinon on récupère la donnée, on la stock dans une variable et on la transforme en objet json manipulable (JSON.parse)
            const existing_data = JSON.parse(data);
            //si le tableau france contenu dans les données est vide
            if(existing_data.france.length === 0){
                //on ajoute un objet avec un id=1 et un name = à la requète comme souhaité
                existing_data.france.push({
                    "id":1,
                    "name":request.body.name.toLowerCase()
                })
                //sinon
            }else{
                //on stock dans une constante (dataLastId) le dernier objet du tableau france 
                const dataLastId = existing_data.france.findLast(
                    (obj) => obj.id
                    )
                    
                    //on ajoute au tableau  france la requète du body (push) avec un id égal à l'id du dernier objet du tableau plus 1
                    existing_data.france.push({
                        "id":dataLastId.id+1,
                        "name":request.body.name.toLowerCase()
                    });
                }
            //on réécrit la donnée dans le fichier data.json avec existing_data qui contient le body de la requète en plus
            fs.writeFile("./src/model/data.json", JSON.stringify(existing_data), (writeErr) => {
                if(writeErr){
                    //si il y a une erreur de lecture
                    response.status(500).json({
                        message: "erreur lors de l'écriture",
                        error: err
                    })
                }else{
                    response.status(200).json({
                        message: "La data a été ajouter avec succès"
                    });
                }
            });
        }
    });
}

exports.getAllData = (request, response) => {
    //on lit le contenu du fichier
    fs.readFile("./src/model/data.json", (err, data) => {
        //si il y a une erreur de lecture
        if(err){
            response.status(500).json({
                message: "Erreur de lecture",
                error: err
            })
        }else{
            //on stock les données dans une constante sous forme d'objet
            const existingData = JSON.parse(data)
            //on stock dans une constante le tableau france
            const allData = existingData.france
            //on envoit une réponse avec le status 200 et le tableau france
            response.status(200).json(allData)
        }
    })
}

exports.getDataById = (request, response) => {
    //on lit le contenu du fichier
    fs.readFile("./src/model/data.json", (err, data) => {
        //si il y a une erreur de lecture
        if(err){
            //on renvoie un message d'erreur avec le status 500
            response.status(500).json({
                message: "Erreur lecture du fichier",
                error: err
            })
        }else{
            //on met au format JSON les données trouvées et on les stock dans une constante (manip_data)
            const manip_data = JSON.parse(data)
            //Dans les données stockées au format json (manip_data) On cherche chaque objet dans le taleau france d'on l'id est égal à l'id de la requète
            const data_id = manip_data.france.find(
                (obj) => obj.id === parseInt(request.params.id)
            )
            if(data_id){
                //on envoit une réponse avec un status 200 et l'objet dont l'id est = l'id de la requète
                response.status(200).json(data_id)
            }else{
                //si on ne trouve pas cet objet
                //on envoit une réponse avec un status 404 et un message d'erreur
                response.status(404).json({
                    message: "je n'ai pas trouvé cet id"
                }
                )
            }
        }
    })
}

exports.getDataByName = (request, response) => {
        //on lit le contenu du fichier
        fs.readFile("./src/model/data.json", (err, data) => {
            //si il y a une erreur de lecture
            if(err){
                response.status(500).json({
                    message: "Erreur lecture du fichier",
                    error: err
                })
            }else{
                //on met au format JSON les données trouvées et on les stock dans une constante (manip_data)
                const manip_data = JSON.parse(data)
                const data_name = manip_data.france.find(
                    (obj) => obj.name === request.params.name.toLowerCase()
                )
                if(data_name){
                    response.status(200).json(data_name)
                }else{
                    response.status(404).json({
                        message: "Je n'ai pas trouvé ce nom d'entrée"
                    }
                    )
                }
            }
        })
        
}

exports.updateData = (request, response) => {
    //on lit les données contenues dans le fichier data.json
    fs.readFile("./src/model/data.json", (err, data) => {
        //si il y a une erreur de lecture
        if(err){
            response.status(500).json({
                message: "une erreur est survenue lors de lecture des données",
                error: err
            })
            //si il n'y a pas d'erreur de lecture
        }else{
            //on stocke les données dans une constante (existingData) et la met sous forme d'un objet 
            const existingData = JSON.parse(data);
            //on va stocké dans une constante (dataById) le premier objet du tableau france dont l'id est égal à l'id de la requète
            const dataById = existingData.france.find(
                (obj) => obj.id === parseInt(request.params.id)
                );
            //si on trouve pas d'objet avec le même id que la requète
            if(!dataById){
                //on renvoie une réponse avec un message d'erreur
                response.status(404).json({
                    message: "Aucun objet avec cet id"
                });
                //si on trouve un objet avec le même id que la requète
            }else{
                //on change le name de l'objet dataById et on lui assigne le name de la requète
                dataById.name = request.body.name.toLowerCase();
                fs.writeFile("./src/model/data.json", JSON.stringify(existingData), (writeErr) => {
                    //si il y a une erreur au moment de l'écriture
                    if(writeErr){
                        response.status(500).json({
                            message: "Une erreur survenue lors de l'écriture des données",
                        })
                    }else{
                        response.status(200).json({
                            message: "Les données on été mise à jour avec succès"
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
    //si il y a une erreur de lecture
    if(err){
        response.status(500).json({
            message: "Une erreur est survenue lors de la lecture du fichier data.json",
            error: err
        })
    }else{
        //on stock les données dans une constante et on les transforment en objet json
        const existing_data = JSON.parse(data);
        //dans le tableau france on va trouvé l'objet dont l'id = l'id de la requète
        const dataById = existing_data.france.find(
            (obj) => obj.id === parseInt(request.params.id)
        )
        //si l'id entré dans la requète n'existe pas dans le tableau france
        if(!dataById){
            //on renvoit une réponse avec un status 404 et un message d'erreur
            response.status(404).json({
                message: "il n'existe pas d'objet avec cet id"
            })
        }else{
            //dans le tableau france on stock ds une constante les objets dont l'id est différent de l'id de la requète
            existing_data.france = existing_data.france.filter(
                (obj) => obj.id != parseInt(request.params.id)
            )
            //on réécrit les données dans le fichier data.json
            fs.writeFile("./src/model/data.json", JSON.stringify(existing_data), (writeErr) => {
                //si il y a une erreur lors de l'écriture 
                if(writeErr){
                    response.status(500).json({
                        message: "Une erreur est survenue lors de la réécriture des données"
                    })
                }else{
                    //sinon on envoit une réponse avec un status 200 et un message confirmant la misent à jour des données
                    response.status(200).json({
                        message: "Les données on bien été misent à jour"
                    })
                }
            })
        }
    }
   })
}


