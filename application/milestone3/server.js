require('dotenv').config(); // Add this line at the very top

const express = require('express');
const http = require('http');
const path = require('path');
const config = require('./backend/database/createTable');
const multer = require("multer");
const multerS3 = require('multer-s3');
const cors = require('cors');
const aws = require('aws-sdk');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.json());
app.use(cors());

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Updated to use .env variable
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Updated to use .env variable
  Bucket: 'myy-unique-bucket-name-2024'
});


const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'myy-unique-bucket-name-2024',
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(null, path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now() + path.extname(file.originalname));
    }
  })
});

// io.on('connection', (socket) =>{
//   console.log("Connection established");
  
//   socket.on('joinedChat', ({name, room}, cb) => {
      
//       const {error, newUser} = addUser ({id:socket.id, name, room});
      
//       if(error) return cb(error);
//       console.log("newUser is" , newUser);
//       socket.join(newUser.room);
//       socket.emit('message', {text: `Hey ${newUser.name}, feel free to drop any message for ${newUser.room}`});
//       socket.broadcast.to(newUser.room).emit('message', {text: `${newUser.name} joined the chat.`})
      

//       cb();
//   });

//   socket.on('deliverMessage', (message, cb) => {
//       const user = getUser(socket.id);
//       console.log(user);
//       io.to(user.room).emit('message', {user:user.name, text: message});
//       cb();
//   });

//   socket.on('disconnect', () => {
//     console.log("Disconnected");
//     const user = removeUser(socket.id);
//   });
// });

// loads all items from the three tables tables
app.get('/api', function (req, res) {
  config.query(`SELECT * FROM products`, function (e, response, f) {
    console.log(response);
    res.json(response);
  });

});

app.get('/api/allUsers', function (req, res) {
  config.query(`SELECT * FROM users`, function (e, response, f) {
    console.log(response);
    res.json(response);
  });

});

app.get('/api/Fundraisers', function (req, res) {
  config.query(`SELECT * FROM fundraisers`, function (e, response, f) {
    console.log(response);
    res.json(response);
  });
});

// apis related to users
// find registered user
app.post('/api/loginUser', function (req, res) {
  config.query(`SELECT * FROM users WHERE email LIKE '%${req.body.searchEmail}%' LIMIT 1`, function (e, response, f) {
    res.json({ success: true, users: response });
    console.log(response);
  });

});

// api to register a new user
app.post('/api/registerUser', upload.single("imageFile"), function (req, res) {

  console.log(req.body.name);
  if (!req.body.imageFile) // not registering with image
  {
    config.query(`INSERT INTO users (name, email, zipcode, password, userImage, recovery1, recovery2, claimedProducts)
                VALUES ('${req.body.name}', '${req.body.email}', '${req.body.zipcode}', '${req.body.password}', '${req.file.location}', '${req.body.recovery1}', '${req.body.recovery2}', '${req.body.claimedProducts}')`, function (e, response, f) { });
    res.send({ success: true });
  }
  else // registering with image
  {
    config.query(`INSERT INTO users (name, email, zipcode, password, userImage, recovery1, recovery2, claimedProducts)
                VALUES ('${req.body.name}', '${req.body.email}', '${req.body.zipcode}', '${req.body.password}', '${req.body.imageFile}', '${req.body.recovery1}', '${req.body.recovery2}', '${req.body.claimedProducts}')`, function (e, response, f) { });
    res.send({ success: true });
  }
});

// api to edit a user profile
app.post('/api/editUser', upload.single("imageFile"), function (req, res) {
  console.log(req.body);

  if (!req.body.imageFile) // updating image
  {
    config.query(`UPDATE users SET
                  name = '${req.body.name}', email = '${req.body.email}', zipcode = '${req.body.zipcode}', password = '${req.body.password}', userImage = '${req.file.location}',
                  recovery1 = '${req.body.recovery1}', recovery2 = '${req.body.recovery2}', claimedProducts = '${req.body.claimedProducts}' WHERE email = '${req.body.currentEmail}'`, function (e, response, f) { });
    res.send({ success: true, fileLocation: req.file.location });

    console.log("Image URL: ", req.file.location);
  }
  else // if not updating user image
  {
    config.query(`UPDATE users SET
                  name = '${req.body.name}', email = '${req.body.email}', zipcode = '${req.body.zipcode}', password = '${req.body.password}', userImage = '${req.body.imageFile}',
                  recovery1 = '${req.body.recovery1}', recovery2 = '${req.body.recovery2}', claimedProducts = '${req.body.claimedProducts}' WHERE email = '${req.body.currentEmail}'`, function (e, response, f) { });
    res.send({ success: true });
  }
});

app.post('/api/deleteUser', function (req, res) {
  config.query(`DELETE FROM users WHERE email = '${req.body.searchEmail}'`, function (e, response, f) {
    res.json({ success: true });
  });
});

// api to edit a post
app.post('/api/editPost', upload.single("imageFile"), function (req, res) {
  console.log(req.body);

  if (!req.body.imageFile) // updating image
  {
    config.query(`UPDATE products SET
                  name = '${req.body.name}', description = '${req.body.description}', productType = '${req.body.productType}', productImage = '${req.file.location}',
                  owner = '${req.body.owner}' WHERE id = '${req.body.id}'`, function (e, response, f) { });
    res.send({ success: true, fileLocation: req.file.location });

    console.log("Image URL: ", req.file.location);
  }
  else // if not updating user image
  {
    config.query(`UPDATE products SET
                  name = '${req.body.name}', description = '${req.body.description}', productType = '${req.body.productType}', productImage = '${req.body.imageFile}',
                  owner = '${req.body.owner}' WHERE id = '${req.body.id}'`, function (e, response, f) { });
    res.send({ success: true });
  }
});

// api to edit a fundraiser post
app.post('/api/editFundraiser', upload.single("imageFile"), function (req, res) {
  console.log(req.body);

  if (!req.body.imageFile) // updating image
  {
    config.query(`UPDATE fundraisers SET
                  title = '${req.body.title}', description = '${req.body.description}', fundType = '${req.body.fundType}', requiredAmount = '${req.body.requiredAmount}',
                  endorsement = '${req.body.endorsement}', image = '${req.file.location}', owner = '${req.body.owner}' WHERE id = '${req.body.id}'`, function (e, response, f) { });
    res.send({ success: true, fileLocation: req.file.location });

    console.log("Image URL: ", req.file.location);
  }
  else // if not updating user image
  {
    config.query(`UPDATE fundraisers SET
                  title = '${req.body.title}', description = '${req.body.description}', fundType = '${req.body.fundType}',  requiredAmount = '${req.body.requiredAmount}',
                  endorsement = '${req.body.endorsement}', image = '${req.body.imageFile}', owner = '${req.body.owner}' WHERE id = '${req.body.id}'`, function (e, response, f) { });
    res.send({ success: true });
  }
});

app.post('/api/deleteProduct', function (req, res) {
  config.query(`DELETE FROM products WHERE id = '${req.body.id}'`, function (e, response, f) {
    res.json({ success: true });
  });
});

app.post('/api/deleteFundraiser', function (req, res) {
  config.query(`DELETE FROM fundraisers WHERE id = '${req.body.id}'`, function (e, response, f) {
    res.json({ success: true });
  });
});

app.post('/api/postProduct', upload.single("imageFile"), function (req, res) {
  req.body.description = req.body.description.replace(/'/g, "''"); // replaces ' so sql will not get confused

  config.query(`INSERT INTO products (name, description, productType, productImage, owner)
                VALUES ('${req.body.name}', '${req.body.description}', '${req.body.productType}', '${req.file.location}', '${req.body.owner}')`, function (e, response, f) {
  });
  res.send({ success: true });
});

app.post('/api/postFundraiser', upload.single("imageFile"), function (req, res) {
  req.body.description = req.body.description.replace(/'/g, "''"); // replaces ' so sql will not get confused

  config.query(`INSERT INTO fundraisers (title, description, fundType, requiredAmount, image, endorsement, owner)
                VALUES ('${req.body.title}', '${req.body.description}', '${req.body.fundType}', '${req.body.requiredAmount}', '${req.file.location}', '${req.body.endorsement}', '${req.body.owner}')`, function (e, response, f) {
  });
  res.send({ success: true });
});

// searches for product by name
app.post('/api/makeSearch', function (req, res) {
  config.query(`SELECT * FROM products WHERE name LIKE '%${req.body.searchItem}%'`, function (e, response, f) {
    res.json({ success: true, products: response });
    console.log(response);
  });
});
app.post('/api/makeFundSearch', function (req, res) {
  config.query(`SELECT * FROM fundraisers WHERE title LIKE '%${req.body.searchItem}%'`, function (e, response, f) {
    res.json({ success: true, fundraisers: response });
    console.log(response);
  });
})
app.post('/api/getMessages', function (req, res) {
  console.log(req.body.roomName);
  config.query(`SELECT * FROM chat WHERE room = '${req.body.roomName}'`, function (e, response, f) {
    console.log(response);
    if(!e){
      res.json({ success: true, messages: response });
    }
  });
});

app.post('/api/addMessage', function(req, res) {
  
  config.query(`INSERT INTO chat (room, message) VALUES ('${req.body.room}', '${req.body.message}')`, function (e, response, f){
    
  });
  res.send({ success: true });
});

app.post('/api/findPosts', function (req, res) {
  config.query(`SELECT * FROM products WHERE owner LIKE '%${req.body.searchEmail}%'`, function (e, response, f) {
    res.json({ success: true, products: response });
    console.log(response);
  });
});

app.post('/api/findFundraisers', function (req, res) {
  config.query(`SELECT * FROM fundraisers WHERE owner LIKE '%${req.body.searchEmail}%'`, function (e, response, f) {
    res.json({ success: true, fundraisers: response });
    console.log(response);
  });
});

// category filters
app.post('/api/filterClothes', function (req, res) {

  config.query("SELECT * FROM products WHERE productType LIKE 'cloth'", function (e, response, f) {
    res.json({ success: true, products: response });
  });
});

app.post('/api/filterFurniture', function (req, res) {
  config.query("SELECT * FROM products WHERE productType LIKE 'furniture'", function (e, response, f) {
    res.json({ success: true, products: response });
  });
});

app.post('/api/updateEndorsement', function (req, res) {
  console.log(req);
  config.query(`UPDATE fundraisers SET endorsement = '${req.body.endorsement}' WHERE id = '${req.body.id}';`, function (e, response, f) {
    res.json({success: true});
  });
});

app.use(express.static(path.join(__dirname, "frontend/build")));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "frontend/build", "index.html"));
})

app.listen(5000);