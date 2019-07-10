const express = require('express');
const {Volunteer, validateVolunteer} = require('../models/volunteer.model.js');
const bcrypt = require('bcrypt');


// Create and Save a new Volunteer
exports.create = (req, res) => {

  //Validate volunteer
  const { error } = validateVolunteer(req.body);
     if (error) {
         return res.status(400).send(error.details[0].message);
     }

     bcrypt.hash(req.body.email, 10, (err, hash) =>{
       if (err){
         return res.status(500).json({
           error: err
         });
       }else{
         Volunteer.findOne({ email: req.body.email}).exec(function(err,volunteer){
           if (volunteer){
             return res.status(500).send({
                 message: "There is already a user with this email address."
             });
           }else{
             // Create a Volunteer
               const volunteer = new Volunteer({
                   username: req.body.username,
                   email: req.body.email,
                   password: hash,
                   FirstName: req.body.FirstName,
                   LastName: req.body.LastName,
                   Age: req.body.Age
             });
             // Save Volunteer in the database
             volunteer.save()
             .then(data => {
                 res.send(data);
             }).catch(err => {
                 return res.status(500).send({
                     message: err.message || "Some error occurred while creating the Volunteer user profile."
                 });
             });
           }
         });
            }

     });
};



// Find a single volunteer with a volunteerId
exports.findOne = (req, res) => {
    Volunteer.findById(req.params.volunteerId)
    .then(volunteer => {
        if(!volunteer) {
            return res.status(404).send({
                message: "Volunteer not found with id " + req.params.volunteerId
            });
        }
        res.send(volunteer);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Volunteer not found with id " + req.params.volunteerId
            });
        }
        return res.status(500).send({
            message: "Error retrieving volunteer with id " + req.params.volunteerId
        });
    });
};

// Retrieve and return all volunteers from the database.
exports.findAll = (req, res) => {
    Volunteer.find()
    .then(volunteer => {
        res.send(volunteer);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving volunteers."
        });
    });
};

// Delete a volunteer with the specified volunteerId in the request
exports.delete = (req, res) => {
    Volunteer.findByIdAndRemove(req.params.volunteerId)
    .then(volunteer => {
        if(!volunteer) {
            return res.status(404).send({
                message: "Volunteer not found with id " + req.params.volunteerId
            });
        }
        res.send({message: "Volunteer deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Volunteer not found with id " + req.params.volunteerId
            });
        }
        return res.status(500).send({
            message: "Could not delete volunteer with id " + req.params.volunteerId
        });
    });
};

// Update a volunteer identified by the volunteerId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.username) {
        return res.status(400).send({
            message: "Volunteer username can not be empty"
        });
    }

    // Find volunteer and update it with the request body
    Volunteer.findByIdAndUpdate(req.params.volunteerId, {
        username: req.body.username || "Username",
        Age: req.body.Age
    }, {new: true})
    .then(volunteer => {
        if(!volunteer) {
            return res.status(404).send({
                message: "Volunteer not found with id " + req.params.volunteerId
            });
        }
        res.send(volunteer);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Volunteer not found with id " + req.params.volunteerId
            });
        }
        return res.status(500).send({
            message: "Error updating volunteer with id " + req.params.volunteerId
        });
    });
};
