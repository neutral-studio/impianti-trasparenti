const mongoose = require('mongoose');

exports.get_about = (req, res) => {
    res.render('about');
}