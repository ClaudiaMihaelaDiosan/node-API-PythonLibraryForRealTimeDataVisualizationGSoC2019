const Donor = require('../models/donor.model.js');

//Create and Save a new Donor profile
exports.create = (req, res) =>{
  //Validate request
  if(!req.body.email){
    return res.status(400).send({
      message:"Email cannot be empty"
    });
  }
};
