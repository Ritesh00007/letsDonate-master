const express = require("express");
const path = require("path");
const config = require('./backend/database/createTable');
const app = express();
const parser = require('body-parser');

app.use(parser.json());


app.get('/api', function(req, res){
    config.query(`SELECT * FROM products`, function (e, response, f) {
      console.log(response);
      res.json(response);
    });
    
});

const multer = require("multer");
const storage = multer.diskStorage({
  destination: "frontend/src/images",
  filename: function(req, file, a) {
    a(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

app.post('/api/postProduct', upload.single("imageFile"),function(req, res){
      console.log(req.file.originalname);
      config.query(`INSERT INTO products VALUES ('${req.body.name}', '${req.body.description}', '${req.body.productType}', '${req.file.originalname}')`, function (e, response, f) {
        
      });

    res.send({success:true});
});

app.post('/api/makeSearch', function(req, res){

      config.query(`SELECT * FROM products WHERE name LIKE '${req.body.searchItem}'`, function (e, response, f) {
        res.json({success:true, products:response});

      });
      
});

app.post('/api/filterClothes', function(req, res){

      config.query("SELECT * FROM products WHERE productType LIKE 'cloth'", function (e, response, f) {
        res.json({success:true, products:response});
      });
      

      
});

app.post('/api/filterFurniture', function(req, res){
        config.query("SELECT * FROM products WHERE productType LIKE 'furniture'", function (e, response, f) {
          res.json({success:true, products:response});
        });

});

app.use(express.static(path.join(__dirname, "frontend/build")));

app.get("/*", function(req, res){
    res.sendFile(path.join(__dirname, "frontend/build", "index.html"));
})


app.listen(5000);