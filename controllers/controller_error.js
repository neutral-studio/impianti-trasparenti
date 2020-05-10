const express = require("express");

const app = express();

exports.errPage = (req, res) => {

    if (!isNaN(req.params.code)) {
        res.render("error", { err: req.params.code });
    } else {
        res.redirect("/home/");

    }
};

exports.pageNotFound = (req, res) => {
    res.status(404).render("404");
};

