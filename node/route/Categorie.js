


const express = require("express");
const connection = require("../connection");
const router = express.Router();


// Get tous les categorie
router.get('/toutcategorie', (req, res, next) => {
    var req = 'SELECT refcat, produits.refprod,produits.nomprod, nomcat, taille,prix,image FROM categorie inner join produits on produits.refprod=categorie.refproduit ';
    connection.query(req ,(erreur , resultat) => {
        if (erreur) {
            return res.status(500).json({message : 'Erreur Server'});
        }
        else {
            
            return res.status(200).json(resultat); 
        }
    });
})



// Get chaque les categories
router.get('/chaqueCategorie/:refcat', (req, res, next) => {
    var refcat = req.params.refcat
    var req = 'SELECT * FROM categorie WHERE refcat = ?';
    connection.query(req ,[refcat], (erreur , resultat) => {
        if (erreur) {
            return res.status(500).json({message : 'Erreur Server'});
        }
        else {
            
            return res.status(200).json(resultat); 
        }
    });
})


// ajout categorie
router.post('/addCategorie', (req, res, next) => {
    var nomcat = req.body.nomcat;
    var taille = req.body.taille;
    var prix = req.body.prix;
    var refproduit = req.body.refproduit
    
    var req = "INSERT INTO categorie (nomcat,  taille, prix,refproduit) VALUE (?, ?, ?, ?)";
   
    connection.query(req, [nomcat, taille, prix, refproduit], (erreur, resultat) => {
        if(erreur){
            return res.status(500).json({message: 'Votre nom est dejà existe'})
        }
        else{
            return res.status(200).json({message: 'Donnee envoye'})
        }
    })

})


// modification client
router.put('/updateCategorie/:refcat', (req, res, next) => {
    var refcat = req.params.refcat
    var nomcat = req.body.nomcat;
    var taille = req.body.taille;
    var prix = req.body.prix;
    var refproduit = req.body.refproduit;
    var req = "UPDATE categorie SET  nomcat = ?, taille = ?, prix = ?, refproduit = ? WHERE refcat = ?";
    
    connection.query(req, [ nomcat, taille, prix, refproduit, refcat], (erreur, resultat) => {
        if(erreur){
            // return res.status(500).json({message: 'Erreur server'})
            console.log(erreur)
        }
        else{
            return res.status(200).json({message: 'Modification reussite'})
        }
    })
})


// suppression categorie
router.delete('/deleteCategorie/:refcat', (req, res, next) => {
    var refcat = req.params.refcat;
    var req = "DELETE FROM categorie WHERE refcat = ?";
    connection.query(req, [refcat], (erreur, resultat) => {
        if(erreur){
            return res.status(500).json({message: 'Erreur server'})
        }
        else{
            return res.status(200).json({message: 'Supression reussit'})
        }
    })
})
module.exports = router;