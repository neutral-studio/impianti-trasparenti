const mongoose = require('mongoose');
const Society = require('../models/Society');
const Resp = require('../models/Resp');
const utils = require('../config/utils');


exports.get_resps = (req, res) => {
    Resp.find((err, data) => {
        if (err) {
            res.status(404).render('404');
        } else {
            res.render('admin_resps', {
                resps: data,
                user: req.user
            });
        }
    });
}


exports.new = (req, res) => {
    /* Getting data from forms */
    const newResp = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        cf: req.body.cf,
        email: req.body.email
            /* --- */


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
    Resp.create(newResp, (err, data) => {
        if (err) {
            res.status(400).json({
                status: 'fail',
                message: 'Resp could not be created'
            });
        } else {
            /* Society created */
            /* res.send('Society has been created successfully'); */
            res.redirect('/admin/resps');
        }
    })
};

exports.get_new = (req, res) => {
    /* Impostazione dello stato HTTP success e rendering della pagina dedicata alla creazione di un nuovo Resp (newResp.ejs) */
    res.status(200).render('admin_newResp', {
        user: req.user
    });
};

exports.get_edit = (req, res) => {
    let id = req.params.id;
    Resp.findById(id, (err, data) => {
        if (err) {
            res.status(404).render('404');
        } else {
            res.render('admin_editResps', {
                resp: data,
                user: req.user
            });
        }
    });
}

exports.edit = (req, res) => {
    let id = req.params.id;
    const updated = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        cf: req.body.cf,
        email: req.body.email
    }
    Resp.findById(id, (err, data) => {
        if (err) {
            res.status(404).json({
                status: 'failed',
                message: 'Resp does not exist | Invalid ID'
            })
        }
        data.replaceOne(updated, err => {
            if (err) {
                res.status(500).json({
                    status: 'failed',
                    message: 'Resp could not edited'
                })
            } else {
                res.redirect('/admin/resps');
            }
        })
    })
}



/* deleting Resp */
exports.remove = (req, res) => {
    let id = req.params.id;
    Resp.deleteOne({
        _id: id
    }, (err, data) => {
        if (err) {
            res.status(500).json({
                status: 'fail',
                message: 'Resp could not be deleted'
            })
        } else {
            res.redirect('/admin/resps');
        }
    })
}