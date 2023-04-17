
const express = require("express");
const connection = require("../connection");
const router = express.Router();

// Get tous les produits
router.get('/toutProduits', (req, res, next) => {
    var req = 'SELECT * FROM produits';
    connection.query(req ,(erreur , resultat) => {
        if (erreur) {
            return res.status(500).json({message : 'Erreur Server'});
        }
        else {
            
            return res.status(200).json(resultat); 
        }
    });
})

// Get chaque produits
router.get('/chaqueProduits/:refprod', (req, res, next) => {
    var refprod = req.params.refprod
    var req = 'SELECT * FROM produits WHERE refprod = ?';
    connection.query(req ,[refprod], (erreur , resultat) => {
        if (erreur) {
            return res.status(500).json({message : 'Erreur Server'});
        }
        else {
            
            return res.status(200).json(resultat); 
        }
    });
})

// ajout client
router.post('/addProduits', (req, res, next) => {
    var refprod = req.body.refprod;
    var nomprod = req.body.nomprod;
   
    
    var req = "INSERT INTO produits (nomprod) VALUE (?)";
    // console.log({nomEtab, directeur, matricule, communeEtab, zapEtab, telEtab})
    connection.query(req, [nomprod], (erreur, resultat) => {
        if(erreur){
            return res.status(500).json({message: 'Votre nom est dejà existe'})
        }
        else{
            return res.status(200).json({message: 'Donnee envoye'})
        }
    })

})

// modification produits
router.put('/updateProduits/:refprod', (req, res, next) => {
    var refprod = req.params.refprod;
    var nomprod = req.body.nomprod;
    
    var req = "UPDATE produits SET  nomprod = ? WHERE refprod = ?";
    
    connection.query(req, [ nomprod, refprod], (erreur, resultat) => {
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
router.delete('/deleteProduits/:refprod', (req, res, next) => {
    var refprod = req.params.refprod;
    var req = "DELETE FROM produits WHERE refprod = ?";
    connection.query(req, [refprod], (erreur, resultat) => {
        if(erreur){
            return res.status(500).json({message: 'Erreur server'})
        }
        else{
            return res.status(200).json({message: 'Supression reussit'})
        }
    })
})


module.exports = router;