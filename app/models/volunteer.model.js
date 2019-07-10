const mongoose = require("mongoose");
const Joi = require('@hapi/joi');

const volunteerSchema = mongoose.model('Volunteer', new mongoose.Schema({
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
  },
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  Age: {
    type: Number,
    required: true,
  }
}));


function validateVolunteer(volunteer){
  const schema = Joi.object().keys({
    username: Joi.string().min(5).max(20).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{6,16}$/).min(6).required(),
    FirstName: Joi.string().min(2).max(50).required(),
    LastName: Joi.string().min(2).max(50).required(),
    Age: Joi.number().greater(16).integer().positive().required(),
  }).with('email', 'password');

  return Joi.validate(volunteer, schema);
}


exports.Volunteer = volunteerSchema;
exports.validateVolunteer = validateVolunteer;
