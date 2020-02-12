const passport = require('passport');
/* Importazione pacchetti necessari */
const express = require('express');
const controller_user = require('./../controllers/controller_user');

/* Definizione router dall'oggetto express */
const router = express.Router();

/* Routes - Ricordiamo che anteposto al contenuto di 'router.route('/url)' è presente la route chiamante '/user' */
router.route('/').get(controller_user.get_home);

/*Redirecting to the home route*/
router.route('/index').get((req, res) => {
    res.redirect('/user/');
});

/*Redirecting to the home route*/
router.route('/home').get((req, res) => {
    res.redirect('/use r/');
});

/* Login page */
router.route('/login').get(controller_user.get_login);
router.route('/register').get(controller_user.get_register);
router.route('/about').get(controller_user.get_about);
router.route('/logout').get(controller_user.get_logout);


/*using passport*/
//TODO Integrate google login in controller
router.get('/google', passport.authenticate('google', {
    scope:['profile']
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res) =>{
    res.send("Callback");
});

/* Esportazione modulo router per app.js */
module.exports = router;