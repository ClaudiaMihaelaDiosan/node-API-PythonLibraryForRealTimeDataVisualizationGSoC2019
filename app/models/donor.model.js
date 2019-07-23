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
  },
  donationType:{
    type: String,
    required: true,
  },
  city:{
    type:String,
    required:true
  },
  Location: {
    type: Array,
    required: true
  },
  helpType:{
    type:String,
    required: true,
  }
  
}));




function validateDonor(donor){
  const schema = Joi.object().keys({
    username: Joi.string().min(5).max(20).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{6,16}$/).min(6).required(),
    donationType: Joi.string().valid("Food","Clothes","Work","Lodging","Work","Hygiene products").required().description("Accepted values:Food,Clothes,Work,Lodging,Hygiene products"),
    city: Joi.string().min(3).max(20).valid("Lleida","Barcelona","New York").required().description("Accepted values:Lleida,Barcelona,New York"),
    Location: Joi.array().ordered([Joi.number().min(-180).max(180).required(),Joi.number().min(-90).max(90).required()]).description("Please use this format [ longitude, latitude]"),
    helpType: Joi.string().valid("Personally","Through a volunteer").required().description("Accepted values: Personally, Through a volunteer")
  }).with('email', 'password');

  return Joi.validate(donor, schema);
}


exports.Donor = donorSchema;
exports.validateDonor = validateDonor;
