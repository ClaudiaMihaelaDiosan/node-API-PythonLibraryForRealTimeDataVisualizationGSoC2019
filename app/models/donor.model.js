const mongoose = require("mongoose");
const Joi = require('@hapi/joi');

const donorSchema = mongoose.model('User', new mongoose.Schema({
  username:{
    type: String,
    required: true,

  },
  email: String,
  password:String
}));

function validateDonor(donor){
  const schema = {
    username: Joi.string().min(5).max(20).required()
  };
  return Joi.validate(donor, schema);
}


exports.Donor = donorSchema;
exports.validateDonor = validateDonor;
