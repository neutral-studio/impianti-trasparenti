const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: String,
    address: String,
    sport: Array,
    activities: Array,
    contact: mongoose.Schema.Types.ObjectId
});

var Society = mongoose.model('Society', schema);

module.exports = Society;