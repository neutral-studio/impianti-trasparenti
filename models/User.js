/*
User model, creation: 02/12/2020
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*User schema*/
const userSchema = new Schema({
    username: String,
    fName: String,
    lName: String,
    Id: String,
    picture: String,
    role: Number 

    /*ROLE DEF:
        _0: simple user;

        TODO
        _1: superUser;


        _2: admin
    */ 


});

const User = mongoose.model('user', userSchema);

module.exports = User;