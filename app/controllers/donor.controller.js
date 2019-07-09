const Donor = require('../models/donor.model.js');
//const { Donor, validate } = require('../models/user');
const express = require('express');

// Create and Save a new Note
exports.create = (req, res) => {

    // Create a Donor
    const donor = new Donor({
        username: req.body.username
    });


    // Save Donor in the database
    donor.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Donor user profile."
        });
    });
};


// Find a single donor with a noteId
exports.findOne = (req, res) => {
    Donor.findById(req.params.donorId)
    .then(donor => {
        if(!donor) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.donorId
            });
        }
        res.send(donor);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.donorId
            });
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.donorId
        });
    });
};


// Retrieve and return all donors from the database.
exports.findAll = (req, res) => {
    Donor.find()
    .then(donor => {
        res.send(donor);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving donors."
        });
    });
};
