const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    eventname: String,
    description: String,
    date: Date,         //{ type: Date, required: true }
    place: String,
});

module.exports = mongoose.model('Events', EventSchema);
