const express = require("express");
const connection = require("../connection");
const router = express.Router();

router.post('/users', (req, res, next) => {
    var nom = req.body.nom;
    var motdepasse = req.body.motdepasse
    var req = "SELECT username, password FROM users where username = ? ";
    var passworde = ''
    var anarana = ''
    if(nom && motdepasse){
        connection.query(req, [nom], (erreur,resultat) => {
            var session = resultat;
            if(!erreur && resultat.length > 0){
                passworde = resultat[0].password;
                anarana = resultat[0].username;
                if(passworde === motdepasse && anarana === nom){
                    return res.status(200).json({session, message: ''})
                }else if(passworde !== motdepasse  && anarana === nom){
                    return res.status(500).json({message: 'mot de passe invalide'})
                }else if(anarana !== nom && passworde === motdepasse  ){
                    return res.status(500).json({message: 'nom invalide'})
                }
            }
            else{
                return res.status(500).json({message: "nom invalide"})
            }
        })
    }else{
        return res.status(500).json({message: 'Completez tous les champs'})
    }

})

module.exports = router;
