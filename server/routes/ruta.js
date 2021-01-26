const express = require('express');
const fs = require('fs');
const path = require('path');

let Ruta = require('../models/ruta');

let app = express();

const cors = require('cors');

app.use(cors({ origin: '*' }));

//=====================================
//mostrar todas las rutas
//=====================================

app.get('/ruta', (req, res) => {
    Ruta.find({})
        .exec((err, ruta) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                ruta
            });
        });
});

//=====================================
//mostrar un ruta por id.
//=====================================

app.get('/ruta/:id', (req, res) => {
    let id = req.params.id;
    Ruta.findById(id, (err, rutaDB) => {
        if (!rutaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    mensaje: 'el id no existe en la tabla ruta'
                }
            });
        }
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            ruta: rutaDB
        });
    });
});

//=====================================
//crear nuevo ruta ss
//=====================================

app.post('/ruta', (req, res) => {
    let body = req.body;

    let ruta = new Ruta({
        descripcion: body.descripcion
    });

    ruta.save((err, rutaBD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!rutaBD) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            ruta: rutaBD
        });
    });
});

//=====================================
//actualizar ruta
//=====================================

app.put('/ruta/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;

    let descRuta = {
        descripcion: body.descripcion
    };

    Ruta.findByIdAndUpdate(id, descRuta, {
        new: true,
        // runValidators: true
    }, (err, rutaBD) => {
        if (!rutaBD) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            ruta: rutaBD
        });
    });

});

//=====================================
//eliminar ruta
//=====================================

app.delete('/ruta/:id', (req, res) => {
    let id = req.params.id;

    Ruta.findByIdAndRemove(id, (err, rutaBD) => {
        if (!rutaBD) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'el id no existe'
                }
            });
        }
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            mensaje: 'ruta borrado'
        });
    });
});

module.exports = app;