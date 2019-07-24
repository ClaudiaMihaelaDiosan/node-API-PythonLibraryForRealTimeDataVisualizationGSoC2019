module.exports = (app) => {
  const helpless = require('../controllers/helpless.controller.js');



  //Create and save a new Helpless
  app.post('/helpless', helpless.create);

  // Retrieve a single Helpless with helplessId
  app.get('/helpless/:helplessId', helpless.findOne);

  // Retrieve all Helpless
  app.get('/allhelpless', helpless.findAll);

  // Retrieve all Helpless by city
  app.get('/allhelpless/:city', helpless.findAllByCity);

  // Delete a Helpless with helplessId
  app.delete('/helpless/:helplessId', helpless.delete);

  // Update a Helpless with helplessId
  app.put('/helpless/:helplessId', helpless.update);

}
