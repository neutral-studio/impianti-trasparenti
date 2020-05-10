/* Importazione pacchetti necessari */
const express = require('express');
const controller_admin_resps = require('../controllers/controller_admin_resps');

// const Sosciety = require('./../models/Society');

/* Definizione router dall'oggetto express */
const router = express.Router();

/* */
router
    .route('/new')
    .get(controller_admin_resps.get_new)
    .post(controller_admin_resps.new);

/* */
router
    .route('/edit/:id')
    .get(controller_admin_resps.get_edit)
    .post(controller_admin_resps.edit);


/* deleting a Resp */
router
    .route('/:id')
    .delete(controller_admin_resps.remove);


/* Routes - Ricordiamo che anteposto al contenuto di 'router.route('/url)' è presente la route chiamante '/admin' */
router
    .route('/')
    .get(controller_admin_resps.get_resps);

router.route('/api').get(controller_admin_resps.api_society);


/* Esportazione modulo router per app.js */
module.exports = router;