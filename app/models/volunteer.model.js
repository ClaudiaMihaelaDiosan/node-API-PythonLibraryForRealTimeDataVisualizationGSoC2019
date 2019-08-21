const mongoose = require("mongoose");
const Joi = require('@hapi/joi');

const volunteerSchema = mongoose.model('Volunteer', new mongoose.Schema({
  completeName:{
    type: String,
    required: true,

  },
  email: {
    type: String,
    required: true,
  },
  birthyear: {
    type: Number,
    required: true,
  },
  location: {
    type: Array,
    required: true
  },
  city:{
    type:String,
    required: true
  }
}));


function validateVolunteer(volunteer){
  const schema = Joi.object().keys({
    completeName: Joi.string().min(2).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    birthyear: Joi.number().integer().min(1900).max(2005).positive().required(),
    location: Joi.array().ordered([Joi.number().min(-180).max(180).required(),Joi.number().min(-90).max(90).required()]).description("Please use this format [ longitude, latitude]"),
    city: Joi.string().min(3).max(20).valid("Lleida","Barcelona","New York").required().description("Accepted values:Lleida,Barcelona,New York"),
  });

  return Joi.validate(volunteer, schema);
}


exports.Volunteer = volunteerSchema;
exports.validateVolunteer = validateVolunteer;
