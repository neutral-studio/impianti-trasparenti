const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    cf: String,
    email: String
});

var Resp = mongoose.model('Resp', schema);

module.exports = Resp;