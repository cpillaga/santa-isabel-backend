const express = require('express');

let Lugar = require('../models/lugar');

let app = express();

//=====================================
//mostrar todos los lugares
//=====================================

app.get('/lugar', (req, res) => {
    Lugar.find({})
        // .populate('sector','nombre')
        .populate('sector')
        .sort('titulo')
        .exec((err, lugar) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                lugar
            });
        });
});

//=====================================
//mostrar un lugar por id.
//=====================================

app.get('/lugar/:id', (req, res) => {
    let id = req.params.id;
    Lugar.findById(id)
        .populate('sector')
        .exec((err, lugarDB) => {
            if (!lugarDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        mensaje: 'el id no existe en la tabla lugar'
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
                lugar: lugarDB
            });
        });
});

//=====================================
//crear nuevo lugar
//=====================================

app.post('/lugar', (req, res) => {
    let body = req.body;
    let lugar = new Lugar({
        nombre: body.nombre,
        descripcion: body.descripcion,
        img: body.img,
        sector: body.sector,
    });

    lugar.save((err, lugarBD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!lugarBD) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            lugar: lugarBD
        });
    });
});

//=====================================
//actualizar lugar
//=====================================

app.put('/lugar/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;

    let descLugar = {
        nombre: body.nombre,
        descripcion: body.descripcion,
        img: body.img,
        sector: body.sector,
    };

    Lugar.findByIdAndUpdate(id, descLugar, {
        new: true,
        // runValidators: true
    }, (err, lugarDB) => {
        if (!lugarDB) {
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
            lugar: lugarDB
        });
    });

});

//=====================================
//eliminar lugar
//=====================================

app.delete('/lugar/:id', (req, res) => {
    let id = req.params.id;

    Lugar.findByIdAndRemove(id, (err, lugarBD) => {
        if (!lugarBD) {
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
            mensaje: 'lugar borrado'
        });
    });
});

//=====================================
//Filtrar un lugar
//=====================================

app.get('/lugar/buscar/:termino', (req, res) => {
    let termino = req.params.termino;
    let regex = new RegExp(termino, 'i');
    Lugar.find({
            nombre: regex
        })
        .populate('sector')
        .sort('nombre')
        .exec((err, lugar) => {
            if (err) {
                res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                lugar
            });
        });
});

module.exports = app;