const express = require('express');
const controller_basic = require('./../controllers/controller_basic');
const controller_error = require('./../controllers/controller_error');
const router = express.Router();

router.route('/*').get(controller_basic.pageNotFound);

router.route('/about').get(contoller_basic.get_about);

router.route("/err/:code").get(controller_error.errPage);

router.route("/*").get(controller_error.pageNotFound);

module.exports = router;