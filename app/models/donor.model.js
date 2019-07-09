const mongoose = require("mongoose");
const Joi = require('@hapi/joi');


const donorSchema = mongoose.model('User', new mongoose.Schema({
  username:{
    type: String,
    required: true,

  },
  email: {
        type: String,
        required: true,
    },
    password: {
            type: String,
            required: true,
        }
}));




function validateDonor(donor){
  const schema = Joi.object().keys({
    username: Joi.string().min(5).max(20).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{6,16}$/).min(6).required()
  }).with('email', 'password');

  return Joi.validate(donor, schema);
}


exports.Donor = donorSchema;
exports.validateDonor = validateDonor;
