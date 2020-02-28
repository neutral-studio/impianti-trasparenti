const express = require('express');
const controller_admin_users = require('../controllers/controller_admin_resps');
const router = express.Router();

// Routes
router.route('/').get(controller_admin_users.get_resps);

router.route('/new').get(controller_admin_users.get_new).post(controller_admin_users.new);

router
    .route('/edit/:id')
    .get(controller_admin_users.get_edit)
    .post(controller_admin_users.edit);

router.route('/:id').delete(controller_admin_users.remove);

module.exports = router;