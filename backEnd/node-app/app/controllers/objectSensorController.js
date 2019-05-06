const object = require('../models/objectSensorModel.js');

exports.findAll = (req, res) => {
    object.find()
    .then(objects => {
        res.send(objects);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving object sensor data."
        });
    });
};

exports.findLastOnes = (req, res) => {
    object.find().sort({date:-1}).limit(1)
    .then(objects => {
        res.send(objects);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving object sensor data."
        });
    });
}

exports.findOne = (req, res) => {
    object.findById(req.params.noteId)
    .then(object => {
        if(!object) {
            return res.status(404).send({
                message: "object sensor not found with id " + req.params.noteId
            });            
        }
        res.send(object);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "object sensor not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving object sensor with id " + req.params.noteId
        });
    });
};