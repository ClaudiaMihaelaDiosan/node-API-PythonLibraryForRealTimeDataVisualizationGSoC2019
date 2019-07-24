module.exports = (app) => {
  const volunteer = require('../controllers/volunteer.controller.js');



  //Create and save a new Volunteer
  app.post('/volunteer', volunteer.create);

  // Retrieve a single Volunteer with volunteerId
  app.get('/volunteer/:volunteerId', volunteer.findOne);

  // Retrieve all Volunteer
  app.get('/volunteers', volunteer.findAll);

  // Retrieve all Volunteers by city
  app.get('/volunteers/:city', volunteer.findAllByCity);

  // Delete a Volunteer with volunteerId
  app.delete('/volunteer/:volunteerId', volunteer.delete);

  // Update a Volunteer with volunteerId
  app.put('/volunteer/:volunteerId', volunteer.update);

}
