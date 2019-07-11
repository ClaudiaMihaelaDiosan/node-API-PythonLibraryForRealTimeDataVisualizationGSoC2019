const mongoose = require("mongoose");
const Joi = require('@hapi/joi');

const helplessSchema = mongoose.model('User', new mongoose.Schema({
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
  Description:{
    type: String,
    required: true,
  },
  Need:{
    type: String,
    require: true,
  },
  Schedule:{
    type: String,
    require: true,
  },
  Location:{
    type: [Number],
    required: true
  }
}));

function validateHelpless(helpless){
  const schema = Joi.object().keys({
    FirstName: Joi.string().min(2).max(50).required(),
    LastName: Joi.string().min(2).max(50).required(),
    Birthyear: Joi.number().integer().min(1900).max(2003).positive().required(),
    Description: Joi.string().min(20).max(500).required(),
    Need: Joi.string().required(),
    Schedule: Joi.string().required(),
    Location: Joi.number().required()
  });

  return Joi.validate(volunteer, schema);
}

exports.Helpless = helplessSchema;
exports.validateHelpless = validateHelpless;
