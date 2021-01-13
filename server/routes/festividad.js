const express = require('express');

let Festividad = require('../models/festividad');

let app = express();

const cors = require('cors');

app.use(cors({ origin: '*' }));

//=====================================
//mostrar todas las festividades
//=====================================

app.get('/festividad', (req, res) => {
    Festividad.find({})
        .sort('nombre')
        .exec((err, festividad) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                festividad
            });
        });
});

//=====================================
//mostrar una festividad por id.
//=====================================

app.get('/festividad/:id', (req, res) => {
    let id = req.params.id;
    Festividad.findById(id, (err, festividadDB) => {
        if (!festividadDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    mensaje: 'el id no existe en la tabla festividad'
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
            festividad: festividadDB
        });
    });
});

//=====================================
//crear nueva festividad
//=====================================

app.post('/festividad', (req, res) => {
    let body = req.body;
    let festividad = new Festividad({
        nombre: body.nombre,
        descripcion: body.descripcion,
        fecha: body.fecha,
        img: body.img,
    });

    festividad.save((err, festividadBD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!festividadBD) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            festividad: festividadBD
        });
    });
});

//=====================================
//actualizar festividad
//=====================================

app.put('/festividad/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;

    let descFestividad = {
        nombre: body.nombre,
        descripcion: body.descripcion,
        fecha: body.fecha,
        img: body.img,
    };

    Festividad.findByIdAndUpdate(id, descFestividad, {
        new: true,
        // runValidators: true
    }, (err, festividadDB) => {
        if (!festividadDB) {
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
            festividad: festividadDB
        });
    });

});

//=====================================
//eliminar festividad
//=====================================

app.delete('/festividad/:id', (req, res) => {
    let id = req.params.id;

    Festividad.findByIdAndRemove(id, (err, festividadBD) => {
        if (!festividadBD) {
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
            mensaje: 'festividad borrada'
        });
    });
});

//=====================================
//Filtrar una festividad
//=====================================

app.get('/festividad/buscar/:termino', (req, res) => {
    let termino = req.params.termino;
    let regex = new RegExp(termino, 'i');
    Festividad.find({
            nombre: regex
        })
        .sort('nombre')
        .exec((err, festividad) => {
            if (err) {
                res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                festividad
            });
        });
});

module.exports = app;