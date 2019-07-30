const mongoose = require("mongoose");
const Joi = require('@hapi/joi');

const helplessSchema = mongoose.model('Helpless', new mongoose.Schema({
  completeName:{
    type: String,
    required: true,
  },
  birthyear:{
    type: Number,
    required: false,
  },
  lifeHistory:{
    type: String,
    required: true,
  },
  need:{
    type: String,
    required: true,
  },
  schedule:{
    type: String,
    required: true,
  },
  location: {
    type: Array,
    required: true
  },
  city: {
    type: String,
    required: true
  }
}));

function validateHelpless(helpless){
  const schema = Joi.object().keys({
    completeName: Joi.string().min(2).max(50).required(),
    Birthyear: Joi.number().integer().min(1900).max(2003).positive().required(),
    lifeHistory: Joi.string().min(20).max(500).required(),
    need: Joi.string().required(),
    schedule: Joi.string().required(),
    location: Joi.array().ordered([Joi.number().min(-180).max(180).required(),Joi.number().min(-90).max(90).required()]).description("Please use this format [ longitude, latitude]"),
    city: Joi.string().min(3).max(20).valid("Lleida","Barcelona","New York").required().description("Accepted values:Lleida,Barcelona,New York")
   });

  return Joi.validate(helpless, schema);
}

exports.Helpless = helplessSchema;
exports.validateHelpless = validateHelpless;
