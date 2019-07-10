module.exports = (app) => {
  const volunteer = require('../controllers/volunteer.controller.js');




//Create and save a new Volunteer
app.post('/volunteer', volunteer.create);

}
