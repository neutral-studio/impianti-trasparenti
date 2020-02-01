const express = require("express");

const app = express();

exports.errPage = (req, res) => {
    res.render("error", { err: req.params.code });
};

exports.pageNotFound = (req, res) => {
    res.status(404).render("404");
}