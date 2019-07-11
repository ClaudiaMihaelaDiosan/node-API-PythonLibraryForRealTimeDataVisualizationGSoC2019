module.exports = (app) => {
  const helpless = require('../controllers/helpless.controller.js');




//Create and save a new Helpless
app.post('/helpless', helpless.create);

}
