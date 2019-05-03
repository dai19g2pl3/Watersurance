const Ocurrence = require('../models/occurrenceSensorModel.js');

exports.findAll = (req, res) => {
    Ocurrence.find()
    .then(ocurrences => {
        res.send(ocurrences);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving ocurrence sensor data."
        });
    });
};

exports.create = (req, res) => {
    // Validate request
    if(!req.body.value) {
        return res.status(400).send({
            message: "Ocurrence sensor data content can not be empty"
        });
    }

    // Create a Note
    const ocurrence = new Ocurrence({
        type: 'watter level',
        value: req.body.value, 
        date: new Date()
    });

    // Save Note in the database
    ocurrence.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the sensor data Ocurrence."
        });
    });
};

exports.findLastOnes = (req, res) => {
    Ocurrence.find().sort({date:-1}).limit(10)
    .then(ocurrences => {
        res.send(ocurrences);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving ocurrence sensor data."
        });
    });
}

exports.findOne = (req, res) => {
    Ocurrence.findById(req.params.noteId)
    .then(ocurrence => {
        if(!ocurrence) {
            return res.status(404).send({
                message: "ocurrence sensor not found with id " + req.params.noteId
            });            
        }
        res.send(ocurrence);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "ocurrence sensor not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving ocurrence sensor with id " + req.params.noteId
        });
    });
};