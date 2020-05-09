/* Importazione pacchetti necessari */
const express = require('express');
const utils = require('./../config/utils');
const controller_admin = require('../controllers/controller_admin');

/* Definizione router dall'oggetto express */
const router = express.Router();

/* Routes - Ricordiamo che anteposto al contenuto di 'router.route('/url)' è presente la route chiamante '/admin' */
/*EDIT >> Aggiunto controllo admin*/
router.route('/dashboard').get(utils.adminCheck, controller_admin.get_dashboard);

module.exports = router;