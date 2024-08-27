const mysql = require('mysql');



const config = mysql.createConnection({
    host: "localhost",
    user: "ritesh" ,
    password: "LiveLifeKingSize007",
    database: "letsDonate"
});

config.connect(function(fault){
    if(!fault){
        console.log("Connected");
        config.query("Create Database if not exists letsDonate;");
        config.query("USE letsDonate;", function (e, r, f) {});
        config.query("CREATE TABLE IF NOT EXISTS products("+ 
                    "name varchar(30), " + 
                    "description varchar(30), " + 
                    "productType varchar(30), "+
                    "productImage varchar(255) );",
                  function(e,r,f){console.log(e)});
    }else{
        console.log("Not Connected", fault);
        return;
    }
    
});

module.exports = config;