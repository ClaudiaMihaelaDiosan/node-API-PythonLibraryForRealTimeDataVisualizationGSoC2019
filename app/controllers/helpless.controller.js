const express = require('express');
const {Helpless, validateHelpless} = require('../models/helpless.model.js');
const bcrypt = require('bcrypt');


// Create and Save a new Helpless
exports.create = (req, res) => {

  //Validate helpless
  const { error } = validateHelpless(req.body);
     if (error) {
         return res.status(400).send(error.details[0].message);
     }else{

         Helpless.findOne({$and:[{ FirstName: req.body.FirstName},{LastName: req.body.LastName}, {Birthyear: req.body.Birthyear},{Birthmonth: req.body.Birthmonth},{Birthday: req.body.Birthday}]}).exec(function(err,helpless){
           if (helpless){
             return res.status(500).send({
                 message: "There already exists a  user with this info."
             });
           }else{
             // Create a Helpless
               const helpless = new Helpless({
                 FirstName: req.body.FirstName,
                 LastName: req.body.LastName,
                 Birthyear: req.body.Birthyear,
                 Birthmonth: req.body.Birthmonth,
                 Birthday: req.body.Birthday,
                 Description: req.body.Description,
                 Need: req.body.Need,
                 Schedule: req.body.Schedule,
                 Location: req.body.Location
             });
             // Save Helpless in the database
             helpless.save()
             .then(data => {
                 res.send(data);
             }).catch(err => {
                 return res.status(500).send({
                     message: err.message || "Some error occurred while creating the Helpless user profile."
                 });
             });
           }
         });
            }

};
