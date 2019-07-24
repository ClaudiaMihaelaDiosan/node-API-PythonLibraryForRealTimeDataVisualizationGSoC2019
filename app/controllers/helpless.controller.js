const express = require('express');
const {
  Helpless, validateHelpless
} = require('../models/helpless.model.js');
const bcrypt = require('bcrypt');


// Create and Save a new Helpless
exports.create = (req, res) => {

  //Validate helpless
  const {
    error
  } = validateHelpless(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  } else {

    Helpless.findOne({
      $and: [{
        FirstName: req.body.FirstName
      }, {
        LastName: req.body.LastName
      }, {
        Birthyear: req.body.Birthyear
      }, {
        Birthmonth: req.body.Birthmonth
      }, {
        Birthday: req.body.Birthday
      }]
    }).exec(function(err, helpless) {
      if (helpless) {
        return res.status(500).send({
          message: "There already exists a  user with this info."
        });
      } else {
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
          Location: req.body.Location,
          city: req.body.city
        });
        // Save Helpless in the database
        helpless.save()
          .then(data => {
            res.send(data);
          }).catch(err => {
            return res.status(500).send({
              message: err.message ||
                "Some error occurred while creating the Helpless user profile."
            });
          });
      }
    });
  }

};


// Find a single helpless with a helplessId
exports.findOne = (req, res) => {
  Helpless.findById(req.params.helplessId)
    .then(helpless => {
      if (!helpless) {
        return res.status(404).send({
          message: "Helpless not found with id " + req.params.helplessId
        });
      }
      res.send(helpless);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Helpless not found with id " + req.params.helplessId
        });
      }
      return res.status(500).send({
        message: "Error retrieving helpless with id " + req.params.helplessId
      });
    });
};

// Find all helpless by city
exports.findAllByCity = (req, res) => {
  Helpless.find({
      city: req.params.city
    })
    .then(helpless => {
      if (!helpless) {
        return res.status(404).send({
          message: "Helpless not found with city " + req.params.city
        });
      }
      res.send(helpless);
    }).catch(err => {
      if (err.kind === 'Helpless') {
        return res.status(404).send({
          message: "Helpless not found with city" + req.params.city
        });
      }
      return res.status(500).send({
        message: "Error retrieving helpless with city " + req.params.city
      });
    });
};

// Retrieve and return all helpless from the database.
exports.findAll = (req, res) => {
  Helpless.find()
    .then(helpless => {
      res.send(helpless);
    }).catch(err => {
      res.status(500).send({
        message: err.message ||
          "Some error occurred while retrieving helpless."
      });
    });
};


// Delete a helpless with the specified helplessId in the request
exports.delete = (req, res) => {
  Helpless.findByIdAndRemove(req.params.helplessId)
    .then(helpless => {
      if (!helpless) {
        return res.status(404).send({
          message: "Helpless not found with id " + req.params.helplessId
        });
      }
      res.send({
        message: "Helpless deleted successfully!"
      });
    }).catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: "Helpless not found with id " + req.params.helplessId
        });
      }
      return res.status(500).send({
        message: "Could not delete helpless with id " + req.params.helplessId
      });
    });
};


// Update a helpless identified by the helplessId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.city) {
    return res.status(400).send({
      message: "Helpless city can not be empty"
    });
  }

  // Find donor and update it with the request body
  Helpless.findByIdAndUpdate(req.params.helplessId, {
      city: req.body.city || "Username",
      Location: req.body.Location
    }, {
      new: true
    })
    .then(donor => {
      if (!donor) {
        return res.status(404).send({
          message: "Donor not found with id " + req.params.helplessId
        });
      }
      res.send(donor);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Donor not found with id " + req.params.helplessId
        });
      }
      return res.status(500).send({
        message: "Error updating donor with id " + req.params.helplessId
      });
    });
};
