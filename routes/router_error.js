const express = require('express');
const controller_error = require('./../controllers/controller_error');
const router = express.Router();

router.route("/:code").get(controller_error.errPage);

module.exports = router; 