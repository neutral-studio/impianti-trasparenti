/* Importazione pacchetti necessari */
const express = require('express');
const controller_admin = require('../controllers/controller_admin');

/* Definizione router dall'oggetto express */
const router = express.Router();

/* Routes - Ricordiamo che anteposto al contenuto di 'router.route('/url)' è presente la route chiamante '/admin' */
router
    .route('/dashboard')
    .get(controller_admin.get_dashboard);

module.exports = router;