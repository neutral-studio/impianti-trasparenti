const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const keys = require('./keys');
const User = require('../models/User');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    })

});

passport.use(
    new LocalStrategy( {usernameField: 'mail'}, (mail, password, done) =>{
        User.findOne({mail: mail})
        .then(user =>{
            console.log("2");
            if(!user){
                console.log("MAIL INESISTENTE");
                return done(null, false/*, {message: 'Non esiste alcun account associato a questa mail'}*/);
            }

            bcrypt.compare(password, user.password, (err, isMatch) =>{
                if(err){throw err};

                /*EMAIL+PWD MATCH*/
                if(isMatch){
                    console.log("ACCESSO EFFETTUATO");
                    return done(null, user);
                }else{
                    console.log("PWD ERRATA");
                    return done(null, false/*, {message: 'La password inserita è errata.'}*/);
                }
            });
        })
        .catch(err => console.log(err));

     } )
);

passport.use(
    new GoogleStrategy({

        callbackURL: '/user/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret

    }, (accessToken, refreshToken, profile, done) => {

        /*Callback*/
        User.findOne({ Id: profile.id }).then((currentUser) => {
            console.log(profile);
            if (currentUser) {
                /*Already on db*/
                console.log('User is' + currentUser);
                done(null, currentUser);

            } else {
                new User({
                    username: profile.displayName,
                    fName: profile.name.givenName,
                    lName: profile.name.familyName,
                    Id: profile.id,
                    picture: profile.photos[0].value,
                    role: 2



                }).save().then((newUser) => {
                    console.log('Impianti-Trasparenti | Nuovo utente creato ' + newUser);
                    done(null, newUser);
                });

            }

        });

    })
)
