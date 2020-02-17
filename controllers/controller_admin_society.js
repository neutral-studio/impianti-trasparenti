/* Definizione delle funzioni disponibili per il lato admin dell'applicazione */

const mongoose = require('mongoose');
const express = require('express');
const Society = require('../models/Society');

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
            res.render('admin_society', { society: data });
        }
    })
}


/* creating a new Impianto */
exports.new = (req, res) => {
    /* Getting data from forms */
    const newSociety = {
        name: req.body.name,
        address: req.body.address,
        sport: req.body.sport.replace(/\s+/g, '').split(',')
            /*iFrame: req.body.iFrame,
            ,
            managementType: req.body.managementType * 1,
            manager: req.body.manager,
            desc: req.body.desc.replace('<p>', ''),
            imgs: req.body.imgs.replace(/\s+/g, '').split(','),
            tags: req.body.tags.replace(/\s+/g, '').split(',')*/
    };
    /* newSociety.desc = newSociety.desc.replace('</p > ', ''); */

    /* Split tags */
    /*for (var i = 0; i < newImpianto.tags.length; i++) {
        newImpianto.tags[i] = newImpianto.tags[i].replace(/\s+/g, '').split('-');
    }*/
    /* Array to Object */
    /*var obj = {};
    newSociety.tags.forEach(item => {
        item.forEach(function(val, i) {
            if (i % 2 === 1) return
            if (item[i + 1] == '') obj[val] = 'true';
            else obj[val] = item[i + 1];
        })
    })
    newSociety.tags = obj;*/

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
    /* Impostazione dello stato HTTP success e rendering della pagina dedicata alla creazione di un nuovo impianto (newImpianto.ejs) */
    res.status(200).render('admin_newSociety');
};


/* editing an Society */
exports.edit = (req, res) => {
    let id = req.params.id;
    const updated = {
            name: req.body.name,
            address: req.body.address,
            sport: req.body.sport.replace(/\s+/g, '').split(',')


            /*iFrame: req.body.iFrame,
            ,
            managementType: req.body.managementType * 1,
            manager: req.body.manager,
            desc: req.body.desc.replace('<p>', ''),
            imgs: req.body.imgs.replace(/\s+/g, '').split(','),
            tags: req.body.tags.replace(/\s+/g, '').split(',')*/
        }
        /* updated.desc = updated.desc.replace('</p>', ''); */

    /* Split tags */
    /*for (var i = 0; i < updated.tags.length; i++) {
        updated.tags[i] = updated.tags[i].replace(/\s+/g, '').split('-');
    }*/
    /* Array to Object */
    /*var obj = {};
    updated.tags.forEach(item => {
        item.forEach(function(val, i) {
            if (i % 2 === 1) return
            if (item[i + 1] == '') obj[val] = 'true';
            else obj[val] = item[i + 1];
        })
    })
    updated.tags = obj;*/



    Society.findById(id, (err, data) => {
        if (err) {
            res.status(404).json({
                status: 'failed',
                message: 'Society does not exist | Invalid ID'
            })
        }
        data.replaceOne(updated, err => {
            if (err) {
                res.status(500).json({
                    status: 'failed',
                    message: 'Society could not edited'
                })
            } else {
                res.redirect('/admin/society');
            }
        })
    })
}


/* editing Society page */
exports.get_edit = (req, res) => {
    Society.findById(req.params.id, (err, data) => {
        if (err) {
            res.status(404).render('404');
        } else {
            res.render('admin_editSociety', { society: data });
        }
    })
}


/* deleting Society */
exports.remove = (req, res) => {
    let id = req.params.id;
    Society.deleteOne({ _id: id }, (err, data) => {
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