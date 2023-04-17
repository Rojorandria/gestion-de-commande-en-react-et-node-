
const express = require("express");
const connection = require("../connection");
const router = express.Router();

// Get tous les commande
router.get('/toutcommande', (req, res, next) => {
    var req = 'SELECT numcom, client.numcli , client.nomcli, client.prenomcli , client.adresse, client.telephone, produits.nomprod, categorie.nomcat, categorie.taille, categorie.prix, qtecom, datecom FROM commande inner join client inner join produits inner join categorie on client.numcli=commande.numclient and produits.refprod=commande.refproduit and categorie.refcat=commande.refcategorie order by datecom asc';
    connection.query(req ,(erreur , resultat) => {
        if (erreur) {
            return res.status(500).json({message : 'Erreur Server'});
        }
        else {
            
            return res.status(200).json(resultat); 
        }
    });
})


// ajout commande
router.post('/addCommande', (req, res, next) => {
    var numcli = req.body.numcli;
    var refprod = req.body.refprod;
    var refcat = req.body.refcat;
    var qtecom = req.body.qtecom;
    var datecom = req.body.datecom;
    
    var req = "INSERT INTO commande (numclient, refproduit, refcategorie, qtecom,datecom) VALUE (?, ?, ?, ?,?)";
    // console.log({nomEtab, directeur, matricule, communeEtab, zapEtab, telEtab})
    connection.query(req, [numcli, refprod, refcat, qtecom,datecom], (erreur, resultat) => {
        if(erreur){
            // return res.status(500).json({message: 'Votre nom est dejà existe'})
            console.log(erreur)
        }
        else{
            return res.status(200).json({message: 'Donnee envoye'})
        }
    })

})


// Get tous les commande sur facture
router.get('/toutcommande/:fact', (req, res, next) => {
    var     fact = req.params.fact
    var req = 'SELECT numcom, client.numcli , client.nomcli, client.prenomcli , client.adresse, client.telephone, produits.nomprod, categorie.nomcat, categorie.taille, categorie.prix, qtecom, datecom FROM commande inner join client inner join produits inner join categorie on client.numcli=commande.numclient and produits.refprod=commande.refproduit and categorie.refcat=commande.refcategorie WHERE numcli=?';
    connection.query(req ,[fact], (erreur , resultat) => {
        if (erreur) {
            // return res.status(500).json({message : 'Erreur Server'});
            console.log(erreur)
        }
        else {
            
            return res.status(200).json(resultat); 
        }
    });
})
module.exports = router;