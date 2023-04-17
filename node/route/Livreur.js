const express = require("express")
const connection =       require("../connection")
const router = express.Router()

// Get tous les livreur
router.get('/toutLivreur', (req, res, next) => {
    var req = 'SELECT * FROM livreur';
    connection.query(req ,(erreur , resultat) => {
        if (erreur) {
            return res.status(500).json({message : 'Erreur Server'});
        }
        else {
            
            return res.status(200).json(resultat); 
        }
    });
})

// Get chaque les livreur
router.get('/chaqueLivreur/:numlivr', (req, res, next) => {
    var numlivr = req.params.numlivr
    var req = 'SELECT * FROM livreur WHERE numlivr = ?';
    connection.query(req ,[numlivr], (erreur , resultat) => {
        if (erreur) {
            return res.status(500).json({message : 'Erreur Server'});
        }
        else {
            
            return res.status(200).json(resultat); 
        }
    });
})

// ajout client
router.post('/addLivreur', (req, res, next) => {
    var nomlivr = req.body.nomlivr;
    var prenomlivr = req.body.prenomlivr;
    var telephone = req.body.telephone;
    
    
    var req = "INSERT INTO livreur (nomlivr, prenomlivr,  telephone) VALUE (?, ?, ?)";
    // console.log({nomEtab, directeur, matricule, communeEtab, zapEtab, telEtab})
    connection.query(req, [nomlivr, prenomlivr,  telephone], (erreur, resultat) => {
        if(erreur){
            return res.status(500).json({message: 'Votre nom est dejà existe'})
        }
        else{
            return res.status(200).json({message: 'Donnee envoye'})
        }
    })

})


// modification livreur
router.put('/updateLivreur/:numlivr', (req, res, next) => {
    var numlivr= req.params.numlivr
    var nomlivr = req.body.nomlivr;
    var prenomlivr = req.body.prenomlivr;
    var telephone = req.body.telephone;
    var req = "UPDATE livreur SET  nomlivr = ?, prenomlivr = ?,  telephone = ? WHERE numlivr = ?";
    
    connection.query(req, [ nomlivr, prenomlivr,  telephone, numlivr], (erreur, resultat) => {
        if(erreur){
            // return res.status(500).json({message: 'Erreur server'})
            console.log(erreur)
        }
        else{
            return res.status(200).json({message: 'Modification reussite'})
        }
    })
})


// suppression Livreur
router.delete('/deleteLivreur/:numlivr', (req, res, next) => {
    var numlivr = req.params.numlivr;
    var req = "DELETE FROM livreur WHERE numlivr = ?";
    connection.query(req, [numlivr], (erreur, resultat) => {
        if(erreur){
            return res.status(500).json({message: 'Erreur server'})
        }
        else{
            return res.status(200).json({message: 'Supression reussit'})
        }
    })
})

module.exports = router;