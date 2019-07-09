module.exports = (app) => {
  const donor = require('../controllers/donor.controller.js');



app.post('/donor', donor.create);

app.get('/donor/:donorId',donor.findOne);

}
