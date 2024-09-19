// const mongoose = require('mongoose');

// const CustomerSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     accountNumber: Number,
//     address: String,
//     contact: String,
// });

// module.exports = mongoose.model('Customers-Data', CustomerSchema);


const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    name: String,
    email: String,
    accountNumber: { type: Number, required: true },
    address: String,
    contact: String,
});

module.exports = mongoose.model('Customers', CustomerSchema);
