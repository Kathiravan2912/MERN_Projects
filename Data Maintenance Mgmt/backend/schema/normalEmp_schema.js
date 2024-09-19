const mongoose = require('mongoose');

const NormalEmployeeSchema = new mongoose.Schema({
    name: String,
    email: String,
    position: String,
    salary: Number,
    address: String,
    contact: String,
});

module.exports = mongoose.model('NormalEmployee', NormalEmployeeSchema);
