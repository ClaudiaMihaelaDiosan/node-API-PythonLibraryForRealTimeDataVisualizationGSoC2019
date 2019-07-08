module.exports = (app) => {
  const donor = require('../controllers/donor.controller.js');

  //Create a new Donor profile
  app.post('/donor',donor.create);

}
