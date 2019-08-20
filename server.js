const express = require('express');
const bodyParser = require('body-parser');
const {dialogflow, SimpleResponse, RichResponse} = require('actions-on-google')
var webhook = dialogflow()
var cors = require('cors');
var axios = require('axios');
var FormData = require('form-data');
require('dotenv').config();


//create express app
const app = express();


// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}))

// parse requests of content-type - application/json
app.use(bodyParser.json())

app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS");
  res.header('Cache-Control', 'no-store, no-cache, must-revalidate, private')
  next();
});

// define a simple route
app.get('/', (req, res) => {
  res.json({
    "message": "Welcome to SocialCare app. A GSoC2019 project."
  });
});


//Require Donor routes
require('./app/routes/donor.routes.js')(app);

//Require Volunteer routes
require('./app/routes/volunteer.routes.js')(app);

//Require Needy routes
require('./app/routes/helpless.routes.js')(app);


// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
  useNewUrlParser: true
}).then(() => {
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});

// listen for requests
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
