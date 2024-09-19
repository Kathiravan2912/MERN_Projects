const mongoose = require('mongoose');

const AwardsSchema = new mongoose.Schema({
    awardname: String,
    description: String,
    date: Date,         //{ type: Date, required: true }
    place: String,
});

module.exports = mongoose.model('Awards', AwardsSchema);
