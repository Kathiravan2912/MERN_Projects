const mongoose  = require('mongoose');
const DataSchema = new mongoose.Schema({
    Name:String,
    Email:String,
    Password:String
})

const dataModel = mongoose.model("signupdata",DataSchema)
module.exports = dataModel

