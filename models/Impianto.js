const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: String,
    address: String,
    iFrame: String,
    sport: Array,
    managementType: Number,
    manager: String,
    imgs: Array,
    desc: String,
    tags: Array
});

var Impianto = mongoose.model('Impianto', schema);

module.exports = Impianto;