const mongoose = require('mongoose');

const ObjectSchema = mongoose.Schema({
    type: String,
    value: String,
    date: { type: Date }
});

module.exports = mongoose.model('object1', ObjectSchema);