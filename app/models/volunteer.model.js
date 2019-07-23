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
  Birthyear: {
    type: Number,
    required: true,
  },
  Birthmonth:{
    type:Number,
    required: true,
  },
  Birthday:{
    type:Number,
    required: true
  },
  city:{
    type:String,
    required: true
  }
}));


function validateVolunteer(volunteer){
  const schema = Joi.object().keys({
    username: Joi.string().min(5).max(20).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{6,16}$/).min(6).required(),
    FirstName: Joi.string().min(2).max(50).required(),
    LastName: Joi.string().min(2).max(50).required(),
    Birthyear: Joi.number().integer().min(1900).max(2005).positive().required(),
    Birthmonth: Joi.number().integer().min(1).max(12).positive().required(),
    Birthday: Joi.number().integer().min(1).max(31).positive().required(),
    city: Joi.string().min(3).max(20).valid("Lleida","Barcelona","New York").required().description("Accepted values:Lleida,Barcelona,New York"),
  });

  return Joi.validate(volunteer, schema);
}


exports.Volunteer = volunteerSchema;
exports.validateVolunteer = validateVolunteer;
