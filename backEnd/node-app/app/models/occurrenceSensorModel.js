const mongoose = require('mongoose');

const OcurrenceSchema = mongoose.Schema({
    type: String,
    value: String,
    date: { type: Date }
});

module.exports = mongoose.model('ocurrence1', OcurrenceSchema);