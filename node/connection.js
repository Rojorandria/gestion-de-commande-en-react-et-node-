const mysql = require("mysql");

const connection = mysql.createConnection({
    port : 3306,
    host :"localhost",
    user : "root",
    password: "",
    database: "zebu_madagascar"
});

connection.connect((erreur) => {
    if (!erreur) {
        console.log("Connected");
    }
    else {
        console.log(erreur);
    }
});

module.exports = connection;