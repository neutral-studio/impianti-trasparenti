/* Importazione pacchetti necessari */
const express = require('express');
const userController = require('./../controllers/controller_user');

/* Definizione router dall'oggetto express */
const router = express.Router();

/* Routes - Ricordiamo che anteposto al contenuto di 'router.route('/url)' è presente la route chiamante '/user' */
router.route('/').get(userController.get_home);

/* Esportazione modulo router per app.js */
module.exports = router;