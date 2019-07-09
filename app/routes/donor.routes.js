module.exports = (app) => {
  const donor = require('../controllers/donor.controller.js');



//Create and save a new Donor
app.post('/donor', donor.create);


 // Retrieve a single Donor with donorId
app.get('/donor/:donorId',donor.findOne);

// Retrieve all Donors
app.get('/donors',donor.findAll);

}
