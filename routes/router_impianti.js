const express = require('express');
const controller_impianti = require('./../controllers/controller_impianti');

const router = express.Router();

router.route('/').get(controller_impianti.get_impianti);

module.exports = router;