const mongoose = require("mongoose");
const Joi = require('@hapi/joi');

var donorSchema = new mongoose.Schema({
  username:{
    type: String,
    required: true,
    minlength: 5,
    maclength: 20
  },
  email: String,
  password:String
});

function validateDonor(donor){
  const schema = {
    username: Joi.string().min(5).max(20).required()
  };
  return Joi.validate(donor, schema);
}

//create the model
module.exports = mongoose.model('Donor', donorSchema);
exports.validate = validateDonor;
