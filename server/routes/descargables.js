const express = require('express');

let Descargables = require('../models/descargables');

let app = express();

const cors = require('cors');

app.use(cors({ origin: '*' }));

//=====================================
//mostrar todas las descargables
//=====================================

app.get('/descargables', (req, res) => {
    Descargables.find()
        .exec((err, descargables) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                descargables
            });
        });
});

//=====================================
//crear nueva descargables
//=====================================

app.post('/descargables', (req, res) => {
    let body = req.body;
    let descargables = new Descargables({
        descripcion: body.descripcion,
        link: body.link
    });

    descargables.save((err, descargablesBD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!descargablesBD) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            descargables: descargablesBD
        });
    });
});

//=====================================
//actualizar descargables
//=====================================

app.put('/descargables/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;

    let descDescargables = {
        descripcion: body.descripcion,
        link: body.link
    };

    Descargables.findByIdAndUpdate(id, descDescargables, {
        new: true,
        // runValidators: true
    }, (err, descargablesDB) => {
        if (!descargablesDB) {
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
            descargables: descargablesDB
        });
    });

});

//=====================================
//eliminar descargables
//=====================================

app.delete('/descargables/:id', (req, res) => {
    let id = req.params.id;

    Descargables.findByIdAndRemove(id, (err, descargablesBD) => {
        if (!descargablesBD) {
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
            mensaje: 'descargables borrada'
        });
    });
});

//=====================================
//Filtrar una descargables
//=====================================

app.get('/descargables/buscar/:termino', (req, res) => {
    let termino = req.params.termino;
    let regex = new RegExp(termino, 'i');
    Descargables.find({ descripcion: regex }).exec((err, descargables) => {
        if (err) {
            res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            descargables
        });
    });
});

module.exports = app;