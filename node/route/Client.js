
const express =  require("express");
const connection = require("../connection");
const router = express.Router();


// Get tous les client
router.get('/toutclient', (req, res, next) => {
    var req = 'SELECT * FROM client';
    connection.query(req ,(erreur , resultat) => {
        if (erreur) {
            return res.status(500).json({message : 'Erreur Server'});
        }
        else {
            
            return res.status(200).json(resultat); 
        }
    });
})

// Get chaque les client
router.get('/chaqueClient/:numcli', (req, res, next) => {
    var numcli = req.params.numcli
    var req = 'SELECT * FROM client WHERE numcli = ?';
    connection.query(req ,[numcli], (erreur , resultat) => {
        if (erreur) {
            return res.status(500).json({message : 'Erreur Server'});
        }
        else {
            
            return res.status(200).json(resultat); 
        }
    });
})

// ajout client
router.post('/addClient', (req, res, next) => {
    var nomcli = req.body.nomcli;
    var prenomcli = req.body.prenomcli;
    var adresse = req.body.adresse;
    var telephone = req.body.telephone;
    
    var req = "INSERT INTO client (nomcli, prenomcli, adresse, telephone) VALUE (?, ?, ?, ?)";
    // console.log({nomEtab, directeur, matricule, communeEtab, zapEtab, telEtab})
    connection.query(req, [nomcli, prenomcli, adresse, telephone], (erreur, resultat) => {
        if(erreur){
            return res.status(500).json({message: 'Votre nom est dejà existe'})
        }
        else{
            return res.status(200).json({message: 'Donnee envoye'})
        }
    })

})


// modification client
router.put('/updateClient/:numcli', (req, res, next) => {
    var numcli = req.params.numcli
    var nomcli = req.body.nomcli;
    var prenomcli = req.body.prenomcli;
    var adresse = req.body.adresse;
    var telephone = req.body.telephone;
    var req = "UPDATE client SET  nomcli = ?, prenomcli = ?, adresse = ?, telephone = ? WHERE numcli = ?";
    
    connection.query(req, [ nomcli, prenomcli, adresse, telephone, numcli], (erreur, resultat) => {
        if(erreur){
            // return res.status(500).json({message: 'Erreur server'})
            console.log(erreur)
        }
        else{
            return res.status(200).json({message: 'Modification reussite'})
        }
    })
})

// suppression etablisement
router.delete('/deleteClient/:numcli', (req, res, next) => {
    var numcli = req.params.numcli;
    var req = "DELETE FROM client WHERE numcli = ?";
    connection.query(req, [numcli], (erreur, resultat) => {
        if(erreur){
            return res.status(500).json({message: 'Erreur server'})
        }
        else{
            return res.status(200).json({message: 'Supression reussit'})
        }
    })
})

// Get tous les client
router.get('/toutclient/limit', (req, res, next) => {
    var req = 'SELECT * FROM client order by numcli desc LIMIT 5';
    connection.query(req ,(erreur , resultat) => {
        if (erreur) {
            return res.status(500).json({message : 'Erreur Server'});
        }
        else {
            
            return res.status(200).json(resultat); 
        }
    });
})


module.exports = router;