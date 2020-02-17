/* Definizione delle funzioni disponibili per il lato admin dell'applicazione */

const mongoose = require('mongoose');
const express = require('express');
const Impianto = require('../models/Impianto');
const Society = require('../models/Society');

const app = express();


exports.get_dashboard = (req, res) => {
    /* Impostazione dello stato HTTP success e rendering della pagina della dashboard (admin_dashboard.ejs) */
    Impianto.find((err, dataImp) => {
        if (err) {
            /* */
            res.status(404).render('404');
        } else {
            Society.find((err, dataSoc) => {
                if (err) {
                    res.status(404).render('404');
                } else {
                    /* Impostazione dello stato HTTP success e rendering della pagina degli impianti (admin_impianti.ejs) */
                    res.render('admin_dashboard', { impianti: dataImp, society: dataSoc });
                }
            })
        }
    })
}