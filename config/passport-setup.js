const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
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