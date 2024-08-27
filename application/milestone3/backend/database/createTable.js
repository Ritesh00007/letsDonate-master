const mysql = require('mysql');

const config = mysql.createConnection({
    host: "localhost", 
    user: "ritesh", 
    password: "LiveLifeKingSize007", 
    database: "letsDonate"
});

config.connect(function(fault) {
    if (!fault) {
        console.log("Connected");

        // Use the letsDonate database
        config.query("USE letsDonate;", function(e, r, f) {});

        // Create products table
        config.query("CREATE TABLE IF NOT EXISTS products(" +
            "id int NOT NULL AUTO_INCREMENT, " +
            "name varchar(30), " +
            "description varchar(255), " +
            "productType varchar(30), " +
            "productImage varchar(255), " +
            "owner varchar(255), " +
            "PRIMARY KEY (id) );",
            function(e, r, f) {
                if (e) console.log("Error creating products table:", e);
                else console.log("Products table created");
            });

        // Create fundraisers table
        config.query("CREATE TABLE IF NOT EXISTS fundraisers(" +
            "id int NOT NULL AUTO_INCREMENT, " +
            "title varchar(30) NOT NULL, " +
            "description varchar(255) NOT NULL, " +
            "fundType varchar(255) NOT NULL, " +
            "requiredAmount varchar(30) NOT NULL," +
            "image varchar(255) NOT NULL, " +
            "endorsement int NOT NULL, " +
            "owner varchar(255) NOT NULL, " +
            "PRIMARY KEY (id) );",
            function(e, r, f) {
                if (e) console.log("Error creating fundraisers table:", e);
                else console.log("Fundraisers table created");
            });

        // Create chat table
        config.query("CREATE TABLE IF NOT EXISTS chat(" +
            "id int NOT NULL AUTO_INCREMENT, " +
            "room varchar(30) NOT NULL, " +
            "message varchar(255) NOT NULL, " +
            "PRIMARY KEY (id) );",
            function(e, r, f) {
                if (e) console.log("Error creating chat table:", e);
                else console.log("Chat table created");
            });

        // Create users table
        config.query("CREATE TABLE IF NOT EXISTS users(" +
            "id int NOT NULL AUTO_INCREMENT, " +
            "name varchar(30) NOT NULL, " +
            "email varchar(255) NOT NULL, " +
            "zipcode varchar(30) NOT NULL, " +
            "password varchar(255) NOT NULL, " +
            "userImage varchar(255) NOT NULL, " +
            "recovery1 varchar(255) NOT NULL, " +
            "recovery2 varchar(255) NOT NULL, " +
            "claimedProducts int NOT NULL, " +
            "PRIMARY KEY (id) );",
            function(e, r, f) {
                if (e) console.log("Error creating users table:", e);
                else console.log("Users table created");
            });

    } else {
        console.log("Not Connected", fault);
        return;
    }
});

module.exports = config;
