/* Importazione pacchetti necessari */
const express = require('express');
const admin_controllers_impiantos = require('../controllers/admin_controllers_impiantos');

/* Definizione router dall'oggetto express */
const router = express.Router();

/* Routes - Ricordiamo che anteposto al contenuto di 'router.route('/url)' è presente la route chiamante '/admin' */
router
    .route('/dashboard')
    .get(admin_controllers_impiantos.get_dashboard);

/* */
router
    .route('/impianti/new')
    .get(admin_controllers_impiantos.get_new)
    .post(admin_controllers_impiantos.new);

/* Routes - Ricordiamo che anteposto al contenuto di 'router.route('/url)' è presente la route chiamante '/admin' */
router
    .route('/impianti')
    .get(admin_controllers_impiantos.get_impianti);


/* Esportazione modulo router per app.js */
module.exports = router;