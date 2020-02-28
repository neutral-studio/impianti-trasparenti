/* Definizione delle funzioni disponibili per il lato admin dell'applicazione */

const mongoose = require('mongoose');
const express = require('express');
const Impianto = require('../models/Impianto');
const Society = require('./../models/Society');

const app = express();


exports.get_dashboard = (req, res) => {
    /* Impostazione dello stato HTTP success e rendering della pagina della dashboard (admin_dashboard.ejs) */
    res.status(200).render('admin_dashboard');
}


/* get page impianti */
exports.get_impianti = (req, res) => {
    /* */
    Impianto.find((err, data) => {
        if (err) {
            /* */
            res.status(404).render('404');
        } else {
            /* Impostazione dello stato HTTP success e rendering della pagina degli impianti (admin_impianti.ejs) */
            res.render('admin_impianti', {
                impianti: data
            });
        }
    })
}


/* creating a new Impianto */
exports.new = (req, res) => {
    /* Getting data from forms */
    const newImpianto = {
        name: req.body.name,
        address: req.body.address,
        iFrame: req.body.iFrame,
        sport: req.body.sport.replace(/\s+/g, '').split(','),
        managementType: req.body.managementType * 1,
        manager: req.body.manager,
        desc: req.body.desc.replace('<p>', ''),
        imgs: req.body.imgs.replace(/\s+/g, '').split(','),
        tags: req.body.tags.replace(/\s+/g, '').split(',')
    };
    newImpianto.desc = newImpianto.desc.replace('</p>', '');
    // res.send(newImpianto);
    /* Split tags */
    for (var i = 0; i < newImpianto.tags.length; i++) {
        newImpianto.tags[i] = newImpianto.tags[i].replace(/\s+/g, '').split('-');
    }
    /* Array to Object */
    var obj = {};
    newImpianto.tags.forEach(item => {
        item.forEach(function (val, i) {
            if (i % 2 === 1) return
            if (item[i + 1] == '') obj[val] = 'true';
            else obj[val] = item[i + 1];
        })
    })
    newImpianto.tags = obj;

    /* Creating the Impianto */
    Impianto.create(newImpianto, (err, data) => {
        if (err) {
            res.status(400).json({
                status: 'fail',
                message: 'Impianto could not be created'
            });
        } else {
            /* Impianto created */
            /* res.send('Impianto has been created successfully'); */
            res.redirect('/admin/impianti');
        }
    })
};


/* creating Impianto page */
exports.get_new = (req, res) => {
    let namesArr = [];
    /* Impostazione dello stato HTTP success e rendering della pagina dedicata alla creazione di un nuovo impianto (newImpianto.ejs) */
    Society.find((err, data) => {
        data.forEach((item, index) => {
            namesArr.push(item.name);
            console.log(item.name);
        })
        if (err) {
            console.log(err);
        } else {
            res.status(200).render('admin_newImpianto', {
                resps: namesArr
            });
        }
    })
};


/* editing an Impianto */
exports.edit = (req, res) => {
    let id = req.params.id;
    const updated = {
        name: req.body.name,
        address: req.body.address,
        iFrame: req.body.iFrame,
        sport: req.body.sport.replace(/\s+/g, '').split(','),
        managementType: req.body.managementType * 1,
        manager: req.body.manager,
        desc: req.body.desc.replace('<p>', ''),
        imgs: req.body.imgs.replace(/\s+/g, '').split(','),
        tags: req.body.tags.replace(/\s+/g, '').split(',')
    }
    updated.desc = updated.desc.replace('</p>', '');

    /* Split tags */
    for (var i = 0; i < updated.tags.length; i++) {
        updated.tags[i] = updated.tags[i].replace(/\s+/g, '').split('-');
    }
    /* Array to Object */
    var obj = {};
    updated.tags.forEach(item => {
        item.forEach(function (val, i) {
            if (i % 2 === 1) return
            if (item[i + 1] == '') obj[val] = 'true';
            else obj[val] = item[i + 1];
        })
    })
    updated.tags = obj;



    Impianto.findById(id, (err, data) => {
        if (err) {
            res.status(404).json({
                status: 'failed',
                message: 'Impianto does not exist | Invalid ID'
            })
        }
        data.replaceOne(updated, err => {
            if (err) {
                res.status(500).json({
                    status: 'failed',
                    message: 'Impianto could not edited'
                })
            } else {
                res.redirect('/admin/impianti');
            }
        })
    })
}


/* editing Impianto page */
exports.get_edit = (req, res) => {
    Impianto.findById(req.params.id, (err, data) => {
        if (err) {
            res.status(404).render('404');
        } else {
            res.render('admin_editImpianto', {
                impianto: data
            });
        }
    })
}


/* deleting Impianto */
exports.remove = (req, res) => {
    let id = req.params.id;
    Impianto.deleteOne({
        _id: id
    }, (err, data) => {
        if (err) {
            res.status(500).json({
                status: 'fail',
                message: 'Impianto could not deleted'
            })
        } else {
            res.redirect('/admin/impianti');
        }
    })
}