module.exports = (app) => {
  const donor = require('../controllers/donor.controller.js');



    //Create and save a new Donor
  app.post('/donor', donor.create);


  // Retrieve a single Donor with donorId
  app.get('/donor/:donorId', donor.findOne);

  // Retrieve all Donors by city
  app.get('/donors/:city', donor.findAllByCity);

  // Retrieve all Donors
  app.get('/donors', donor.findAll);

  // Delete a Donor with donorId
  app.delete('/donor/:donorId', donor.delete);

  // Update a Donor with donorId
  app.put('/donor/:donorId', donor.update);

}
