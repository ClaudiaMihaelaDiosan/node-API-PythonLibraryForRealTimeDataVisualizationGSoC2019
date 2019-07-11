module.exports = (app) => {
  const helpless = require('../controllers/helpless.controller.js');




//Create and save a new Helpless
app.post('/helpless', helpless.create);

// Retrieve a single Helpless with helplessId
app.get('/helpless/:helplessId',helpless.findOne);

}
