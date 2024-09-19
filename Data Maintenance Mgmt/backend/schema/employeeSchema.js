const mongoose = require('mongoose');

const EmployeeData = new mongoose.Schema({
    name : String,
    email : String,
    address : String,
    contact : String
});

module.exports = mongoose.model('Employee_Data' , EmployeeData);

