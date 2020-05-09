/* Importazione pacchetti necessari */
const express = require('express');
const controller_admin_society = require('../controllers/controller_admin_society');

// const Sosciety = require('./../models/Society');

/* Definizione router dall'oggetto express */
const router = express.Router();

/* */
router
    .route('/new')
    .get(controller_admin_society.get_new)
    .post(controller_admin_society.new);

/* */
router
    .route('/edit/:id')
    .get(controller_admin_society.get_edit)
    .post(controller_admin_society.edit);


/* deleting an Impianto */
router
    .route('/:id')
    .delete(controller_admin_society.remove);


/* Routes - Ricordiamo che anteposto al contenuto di 'router.route('/url)' è presente la route chiamante '/admin' */
router
    .route('/')
    .get(controller_admin_society.get_society);

router.route('/api').get(controller_admin_society.api_society);


/* Esportazione modulo router per app.js */
module.exports = router;