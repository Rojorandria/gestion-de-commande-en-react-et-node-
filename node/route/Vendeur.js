const express = require("express")
const connection = require("../connection")
const router = express.Router()

// const express =  require("express");
// const connection = require("../connection");
// const router = express.Router();

// Get tous les vendeur
router.get('/toutvendeur', (req, res, next) => {
    var req = 'SELECT * FROM vendeur';
    connection.query(req ,(erreur , resultat) => {
        if (erreur) {
            return res.status(500).json({message : 'Erreur Server'});
        }
        else {
            
            return res.status(200).json(resultat); 
        }
    });
})

// Get chaque les vendeur
router.get('/chaqueVendeur/:numvend', (req, res, next) => {
    var numvend = req.params.numvend
    var req = 'SELECT * FROM vendeur WHERE numvend = ?';
    connection.query(req ,[numvend], (erreur , resultat) => {
        if (erreur) {
            return res.status(500).json({message : 'Erreur Server'});
        }
        else {
            
            return res.status(200).json(resultat); 
        }
    });
})


// ajout client
router.post('/addVendeur', (req, res, next) => {
    var nomvend = req.body.nomvend;
    var prenomvend = req.body.prenomvend;
    var telephone = req.body.telephone;
    
    
    var req = "INSERT INTO vendeur (nomvend, prenomvend,  telephone) VALUE (?, ?, ?)";
    // console.log({nomEtab, directeur, matricule, communeEtab, zapEtab, telEtab})
    connection.query(req, [nomvend, prenomvend,  telephone], (erreur, resultat) => {
        if(erreur){
            return res.status(500).json({message: 'Votre nom est dejà existe'})
        }
        else{
            return res.status(200).json({message: 'Donnee envoye'})
        }
    })

})


// modification vendeur
router.put('/updateVendeur/:numvend', (req, res, next) => {
    var numvend= req.params.numvend
    var nomvend = req.body.nomvend;
    var prenomvend = req.body.prenomvend;
    var telephone = req.body.telephone;
    var req = "UPDATE vendeur SET  nomvend = ?, prenomvend = ?,  telephone = ? WHERE numvend = ?";
    
    connection.query(req, [ nomvend, prenomvend,  telephone, numvend], (erreur, resultat) => {
        if(erreur){
            // return res.status(500).json({message: 'Erreur server'})
            console.log(erreur)
        }
        else{
            return res.status(200).json({message: 'Modification reussite'})
        }
    })
})


// suppression Vendeur
router.delete('/deleteVendeur/:numvend', (req, res, next) => {
    var numvend = req.params.numvend;
    var req = "DELETE FROM vendeur WHERE numvend = ?";
    connection.query(req, [numvend], (erreur, resultat) => {
        if(erreur){
            return res.status(500).json({message: 'Erreur server'})
        }
        else{
            return res.status(200).json({message: 'Supression reussit'})
        }
    })
})


module.exports = router;