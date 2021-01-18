const express = require('express');

let Tipo = require('../models/tipo');

let app = express();

const cors = require('cors');

app.use(cors({ origin: '*' }));

//=====================================
//mostrar todas las rutas
//=====================================

app.get('/tipo', (req, res) => {
    Tipo.find({})
        .exec((err, tipo) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                tipo
            });
        });
});

//=====================================
//mostrar un ruta por id.
//=====================================

app.get('/tipo/:id', (req, res) => {
    let id = req.params.id;
    Tipo.findById(id, (err, tipoDB) => {
        if (!tipoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    mensaje: 'el id no existe en la tabla tipo'
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
            tipo: tipoDB
        });
    });
});

//=====================================
//crear nuevo ruta ss
//=====================================

app.post('/tipo', (req, res) => {
    let body = req.body;

    let tipo = new Tipo({
        descripcion: body.descripcion,
        color: body.color
    });

    tipo.save((err, tipoBD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!tipoBD) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            tipo: tipoBD
        });
    });
});

//=====================================
//actualizar ruta
//=====================================

app.put('/tipo/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;

    let descTipo = {
        descripcion: body.descripcion,
        color: body.color
    };

    Tipo.findByIdAndUpdate(id, descTipo, {
        new: true,
        // runValidators: true
    }, (err, tipoBD) => {
        if (!tipoBD) {
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
            tipo: tipoBD
        });
    });
});


module.exports = app;