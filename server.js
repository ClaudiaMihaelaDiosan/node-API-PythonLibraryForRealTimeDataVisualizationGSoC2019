const express = require('express');
const bodyParser = require('body-parser');
const {dialogflow, SimpleResponse, RichResponse} = require('actions-on-google')
var webhook = dialogflow()
var cors = require('cors');
var axios = require('axios');
var FormData = require('form-data');
require('dotenv').config();
const nocache = require('nocache')


//create express app
const app = express();

app.use(nocache())

app.set('etag', false)

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


   function flyTo(city){
     var vm = this
     var longitude = ''
     var latitude = ''
     var range = ''


  
     if (city == 'Lleida'){
       longitude = 0.6419,
       latitude = 41.6109,
       range = 4000
     }else if(city == 'Barcelona'){
       longitude = 2.154007,
       latitude = 41.390205
       range = 9000
     }else if(city == 'New York'){
       longitude = -73.935242,
       latitude = 40.730610
       range = 13000
     }

     axios({
        method: 'get',
        url: process.env.VUE_APP_KML_API_URL + 'kml/flyto/'+ longitude + '/' + latitude + '/' + range
    //    data: formData,
    //    config: { headers: {'Content-Type': 'multipart/form-data' }}
      })
       .then(function (response) {
        //handle success
      //  console.log("cities Send")
      //  console.log(response)

      })
      .catch(function (response) {
        //handle error
        console.log("error",response);
      })

   }

   function showHomeless(city){
      var vm = this
      var roleInfo = []
      var scale = 1.3
      var icon = process.env.VUE_APP_KML_API_URL + 'images/homeless.png'
      var urlApi = process.env.VUE_APP_NODE_API_URL + 'allhelpless' + '/' + city
      var url = process.env.VUE_APP_KML_API_URL + 'kml/builder/addplacemark'

      axios.get(urlApi)
     .then(function (response){
       vm.roleInfo = response.data

       vm.roleInfo.forEach(function(item){
         //formData define
         var formData = new FormData()
         formData.append('id',item.completeName)
         formData.append('name',item.completeName)
         formData.append('longitude',item.location[0])
         formData.append('latitude',item.location[1])
         formData.append('range',0)
         formData.append('description',item.completeName)
         formData.append('icon',icon)
         formData.append('scale',scale)
        //addplacemark method
        axios({
           method: 'POST',
           url: url,
           data: formData,
           config: { headers: {'Content-Type': 'multipart/form-data' }}
         })
          .then(function (response) {
           //handle success
         })
         .catch(function (response) {
           //handle error


         });
       });
     }).catch(function(error){
        console.log(error);

     })
   }




  webhook.intent('homelessCity',function(conv){
  var vm = this
  var roleInfo = []
  var urlApi = process.env.VUE_APP_NODE_API_URL + 'allhelpless' + '/' + conv.parameters['city']



  if(conv.parameters['city'] == "Lleida" ||  conv.parameters['city'] == "Barcelona" || conv.parameters['city'] == "New York"){

    flyTo(conv.parameters['city']),
    showHomeless(conv.parameters['city']),

    response = new SimpleResponse({
      text: "Showing the list of homeless from " + conv.parameters['city'],
      speech:"Showing all homeless from" + conv.parameters['city']
    })
  }else{
    response = new SimpleResponse({
      text: "Sorry, no homeless yet there" ,
      speech:"Sorry, no homeless yet there"
    })
  }
  conv.ask( response )
})



webhook.intent('oneHomeless',function(conv){
  var completeName = conv.parameters['given-name'] + " " + conv.parameters['last-name']
  var vm = this
  var roleInfo = []
  var name = ''
  var longitude = ''
  var latitude = ''
  var range = 2000
  var description = ''
  var birthyear = ''
  var lifeHistory = ''
  var need = ''
  var schedule = ''
  var icon = process.env.VUE_APP_KML_API_URL + 'images/homeless.png'
  var urlApi = process.env.VUE_APP_NODE_API_URL + 'allhelpless' + '/' + conv.parameters['city']


  return axios.get(urlApi)
  .then(function (response){
    vm.roleInfo = response.data

    vm.roleInfo.forEach((item) =>{
      if(completeName == item.completeName){
        name = item.completeName
        longitude = item.location[0]
        latitude = item.location[1]
        birthyear = item.birthyear
        lifeHistory = item.lifeHistory
        need = item.need
        schedule = item.schedule
      }
    })
    if(name ==  completeName){

      description = description ='Birthyear: ' + birthyear + '\n'+ '\n' + 'Life History:' + '\n' + lifeHistory + '\n' + '\n' + 'Most important need:  ' + need+ '\n' + '\n' + 'Schedule: '  + schedule


      var formData = new FormData()
      formData.append('id',name)
      formData.append('name',name)
      formData.append('longitude',longitude)
      formData.append('latitude',latitude)
      formData.append('range',70)
      formData.append('icon',icon)
      formData.append('scale',1.3)
      formData.append('description',description)



      axios({
         method: 'get',
         url: process.env.VUE_APP_KML_API_URL + 'kml/flyto/'+ longitude + '/' + latitude + '/' + range
     //    data: formData,
     //    config: { headers: {'Content-Type': 'multipart/form-data' }}
       })
        .then(function (response) {
         //handle success
       //  console.log("cities Send")
       //  console.log(response)

       })
       .catch(function (response) {
         //handle error
         console.log("error",response);
       })

       //addplacemark method
   axios({
     method: 'post',
     url: process.env.VUE_APP_KML_API_URL + 'kml/builder/addplacemark',
     data: formData,
     config: { headers: {'Content-Type': 'multipart/form-data' }}
   })
    .then(function (response) {
     //handle success
  //   console.log("details Send")
  //   console.log(response)
   })
   .catch(function (response) {
     //handle error
    console.log("error",response);
  }).catch(function(error){
  console.log(error);
  })

  axios({
      method: 'get',
      url: process.env.VUE_APP_KML_API_URL + 'kml/manage/balloon/'+ name + '/' + 1
  //    data: formData,
  //    config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
     .then(function (response) {
      //handle success
    //  console.log("cities Send")
      console.log(response)

    })
    .catch(function (response) {
      //handle error
      console.log("error",response);
    })

      response = new SimpleResponse({
        text: "Showing info about " + conv.parameters['given-name'] + " " + conv.parameters['last-name'] + " from " + conv.parameters['city'],
        speech:"Showing ingo about " + conv.parameters['given-name'] + " " + conv.parameters['last-name'] + " from " + conv.parameters['city'],
        })
    }else{
      response = new SimpleResponse({
        text:"Sorry, this homeless is not registered in " + conv.parameters['city'],
        speech:"Sorry, this homeless is not registered in " + conv.parameters['city'],
     })
    }

    conv.ask( response )
  })
  .catch(function(response){
    console.log("error", response);
  })

});


app.post('/assistant', webhook)

// listen for requests
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
