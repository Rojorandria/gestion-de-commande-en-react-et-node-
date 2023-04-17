// package installer
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const connection = require("./connection");
const Login = require("./route/Login");

const Client = require("./route/Client")
const Produits =require("./route/Produits")
//const Vendeur =require("./route/Vendeur")
const Vendeur =require("./route/Vendeur");
const Livreur =require("./route/Livreur");
const Categorie =require("./route/Categorie");
const nouveaux_commande=require("./route/nouveaux_commande")
 
/*------------------------CONNECTION FRONT-------------------------------*/

app.use(express.static("Public"));

//extraction des donnees au formulaire
app.use(express.urlencoded({extended : true}));

app.use(express.json());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended : true}));

app.use(cors());

// app.use(errHandler);  

/*------------------------MIDELWARE------------------------------*/

app.use("/login", Login);

app.use("/client", Client)
app.use("/produits", Produits)
app.use("/vendeur", Vendeur)
app.use("/livreur", Livreur)
app.use("/categorie", Categorie)
app.use("/nouveaux_commande",nouveaux_commande)
module.exports = app;
