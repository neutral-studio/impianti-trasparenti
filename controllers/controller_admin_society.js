/* Definizione delle funzioni disponibili per il lato admin dell'applicazione */

const mongoose = require('mongoose');
const express = require('express');
const Society = require('../models/Society');
const Resp = require('../models/Resp');
const app = express();


exports.get_dashboard = (req, res) => {
    /* Impostazione dello stato HTTP success e rendering della pagina della dashboard (admin_dashboard.ejs) */
    res.status(200).render('admin_dashboard');
}


/* get page impianti */
exports.get_society = (req, res) => {
    /* */
    Society.find((err, data) => {
        if (err) {
            /* */
            res.status(404).render('404');
        } else {
            /* Impostazione dello stato HTTP success e rendering della pagina degli impianti (admin_impianti.ejs) */
            res.render('admin_society', {
                society: data
            });
        }
    })
}


/* creating a new Impianto */
exports.new = (req, res) => {
    /* Getting data from forms */
    let requestName = req.body.contact.split(' ');
    // res.send(requestName);
    var contactID = new mongoose.Types.ObjectId()
    Resp.find({
        firstName: requestName[0]
    }, (err, data) => {
        // res.send(data);
        if (err) {
            res.send('Fra, non funziona');
        } else {
            contactID = data._id;
        }
    })

    const newSociety = {
        name: req.body.name,
        address: req.body.address,
        sport: req.body.sport.replace(/\s+/g, '').split(','),
        activities: req.body.activities.replace(/\s+/g, '').split(','),
        contact: contactID
    };
    // res.send(newSociety);
    /* Creating the Impianto */
    Society.create(newSociety, (err, data) => {
        if (err) {
            res.status(400).json({
                status: 'fail',
                message: 'Society could not be created'
            });
        } else {
            /* Society created */
            /* res.send('Society has been created successfully'); */
            res.redirect('/admin/society');
        }
    })
};


/* creating Society page */
exports.get_new = (req, res) => {
    let namesArr = [];
    /* Impostazione dello stato HTTP success e rendering della pagina dedicata alla creazione di un nuovo impianto (newImpianto.ejs) */
    Resp.find((err, data) => {
        data.forEach((item, index) => {
            namesArr.push(item.firstName + " " + item.lastName);
        })
        if (err) {
            res.status(404).render('404');
        } else {
            res.status(200).render('admin_newSociety', {
                resps: namesArr
            });
        }
    })
};

/* editing an Society */
exports.edit = (req, res) => {
    let id = req.params.id;
    let requestName = req.body.contact.split(' ')[0];
    var contactID = new mongoose.Types.ObjectId;
    Resp.find({
        firstName: requestName
    }, (err, data) => {
        if (err) {
            res.send('Fra, non funziona');
        } else {
            contactID = data._id;
        }
    })
    const updated = {
        name: req.body.name,
        address: req.body.address,
        sport: req.body.sport.replace(/\s+/g, '').split(','),
        activities: req.body.activities.replace(/\s+/g, '').split(','),
        contact: contactID
    }

    Society.findById(id, (err, data) => {
        if (err) {
            res.status(404).json({
                status: 'failed',
                message: 'Society does not exist | Invalid ID'
            });
        }
        data.replaceOne(updated, err => {
            if (err) {
                res.status(500).json({
                    status: 'failed',
                    message: 'Society could not edited'
                });
            } else {
                res.redirect('/admin/society');
            }
        });
    });
}


/* editing Society page */
exports.get_edit = (req, res) => {
    let namesArr = [];
    /* Impostazione dello stato HTTP success e rendering della pagina dedicata alla creazione di un nuovo impianto (newImpianto.ejs) */
    Resp.find((err, data) => {
        data.forEach((item, index) => {
            namesArr.push(item.firstName + " " + item.lastName);
        })
        if (err) {
            res.status(404).render('404');
        } else {
            Society.findById(req.params.id, (err, socData) => {
                if (err) {
                    res.status(404).render('404');
                } else {
                    res.send(socData);
                    Resp.findById(socData.contact, (err, resp) => {
                        res.render('admin_editSociety', {
                            society: socData,
                            resps: namesArr,
                            respName: resp.firstName + " " + resp.lastName
                        });
                    })

                }
            })
        }
    });


}


/* deleting Society */
exports.remove = (req, res) => {
    let id = req.params.id;
    Society.deleteOne({
        _id: id
    }, (err, data) => {
        if (err) {
            res.status(500).json({
                status: 'fail',
                message: 'Society could not deleted'
            })
        } else {
            res.redirect('/admin/society');
        }
    })
}