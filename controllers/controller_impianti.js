const mongoose = require('mongoose');
const Impianto = require('./../models/Impianto');

exports.get_impianti = (req, res) => {
    Impianto.find((err, data) => {
        if (err) {
            console.log(err);
        } else {
            // res.send(data[0].tags);
            res.render('impianti', {
                impianti: data
            });
        }
    })
}