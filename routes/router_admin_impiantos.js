/* Importazione pacchetti necessari */
const express = require('express');
const controller_admin_impiantos = require('../controllers/controller_admin_impiantos');

/* Definizione router dall'oggetto express */
const router = express.Router();

/* Routes - Ricordiamo che anteposto al contenuto di 'router.route('/url)' è presente la route chiamante '/admin' */
router
    .route('/dashboard')
    .get(controller_admin_impiantos.get_dashboard);

/* */
router
    .route('/impianti/new')
    .get(controller_admin_impiantos.get_new)
    .post(controller_admin_impiantos.new);

/* */
router
    .route('/impianti/edit/:id')
    .get(controller_admin_impiantos.get_edit)
    .post(controller_admin_impiantos.edit);


/* deleting an Impianto */
router
    .route('/impianti/:id')
    .delete(controller_admin_impiantos.remove);


/* Routes - Ricordiamo che anteposto al contenuto di 'router.route('/url)' è presente la route chiamante '/admin' */
router
    .route('/impianti')
    .get(controller_admin_impiantos.get_impianti);


/* Esportazione modulo router per app.js */
module.exports = router;