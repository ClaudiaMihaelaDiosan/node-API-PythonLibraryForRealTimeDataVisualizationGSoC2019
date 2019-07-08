const mongoose = require ('mongoose');

const DonorSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String
});

module.exports = mongoose.model('Donor', DonorSchema);
