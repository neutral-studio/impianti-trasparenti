const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/User');


passport.use(
    new GoogleStrategy({
        
        callbackURL:'/user/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret

    },(accessToken, refreshToken, profile, done) =>{
        /*Callback*/
        console.log("IMPIANTI-TRASPARENTI | User information received ");
        console.log(profile);
        
        new User({
            username: profile.displayName,
            fName: profile.name.familyName,
            lName: profile.name.givenName,
            Id: profile.id,
            picture: profile.photos[0].value,
            role: 2



        }).save().then((newUser) =>{
            console.log('Impianti-Trasparenti | Nuovo utente creato ' + newUser );
        })
    })
)