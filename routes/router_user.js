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
    res.redirect('/user/');
});

/* Login page */
router.route('/login').get(controller_user.get_login);
router.route('/register').get(controller_user.get_register);
router.route('/about').get(controller_user.get_about);

/* Esportazione modulo router per app.js */
module.exports = router;