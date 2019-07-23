const mongoose = require("mongoose");
const Joi = require('@hapi/joi');

const helplessSchema = mongoose.model('Helpless', new mongoose.Schema({
  FirstName:{
    type: String,
    required: true,
  },
  LastName:{
    type:String,
    required:true,
  },
  Birthyear:{
    type: Number,
    required: false,
  },
  Birthmonth:{
    type:Number,
    required: true,
  },
  Birthday:{
    type:Number,
    required: true
  },
  Description:{
    type: String,
    required: true,
  },
  Need:{
    type: String,
    required: true,
  },
  Schedule:{
    type: String,
    required: true,
  },
  Location: {
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
    FirstName: Joi.string().min(2).max(50).required(),
    LastName: Joi.string().min(2).max(50).required(),
    Birthyear: Joi.number().integer().min(1900).max(2003).positive().required(),
    Birthmonth: Joi.number().integer().min(1).max(12).positive().required(),
    Birthday: Joi.number().integer().min(1).max(31).positive().required(),
    Description: Joi.string().min(20).max(500).required(),
    Need: Joi.string().required(),
    Schedule: Joi.string().required(),
    Location: Joi.array().ordered([Joi.number().min(-180).max(180).required(),Joi.number().min(-90).max(90).required()]).description("Please use this format [ longitude, latitude]"),
    city: Joi.string().min(3).max(20).valid("Lleida","Barcelona","New York").required().description("Accepted values:Lleida,Barcelona,New York")
   });

  return Joi.validate(helpless, schema);
}

exports.Helpless = helplessSchema;
exports.validateHelpless = validateHelpless;
