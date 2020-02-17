const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: String,
    address: String,
    sport: Array
        /* iFrame: String,
        managementType: Number,
        manager: String,
        imgs: Array,
        desc: String,
        tags: Array */
});

var Society = mongoose.model('Society', schema);

module.exports = Society;