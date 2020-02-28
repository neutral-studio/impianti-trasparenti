const express = require('express');
const controller_basic = require('./../controllers/controller_basic');
const controller_error = require('./../controllers/controller_error');
const router = express.Router();


router.route("/").get((req, res) => {
    res.redirect("/user/");
})
router.route("/home").get((req, res) => {
    res.redirect("/user/");
})
router.route("/index").get((req, res) => {
    res.redirect("/user/");
})



router.route("/*").get(controller_error.pageNotFound);

module.exports = router;