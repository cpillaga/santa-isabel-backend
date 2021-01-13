const express = require('express');

let Actividad = require('../models/actividad');

let app = express();

const cors = require('cors');

app.use(cors({ origin: '*' }));

//=====================================
//mostrar todas las actividades
//=====================================

app.get('/actividad', (req, res) => {
    Actividad.find({})
        .sort('titulo')
        .exec((err, sector) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                sector
            });
        });
});

//=====================================
//mostrar una actividad por id.
//=====================================

app.get('/actividad/:id', (req, res) => {
    let id = req.params.id;
    Actividad.findById(id, (err, actividadDB) => {
        if (!actividadDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    mensaje: 'el id no existe en la tabla actividad'
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
            actividad: actividadDB
        });
    });
});

//=====================================
//crear nueva actividad
//=====================================

app.post('/actividad', (req, res) => {
    let body = req.body;
    let actividad = new Actividad({
        titulo: body.titulo,
        descripcion: body.descripcion,
        icono: body.icono,
    });

    actividad.save((err, actividadBD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!actividadBD) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            actividad: actividadBD
        });
    });
});

//=====================================
//actualizar actividad
//=====================================

app.put('/actividad/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;

    let descActividad = {
        titulo: body.titulo,
        descripcion: body.descripcion,
        icono: body.icono,
    };

    Actividad.findByIdAndUpdate(id, descActividad, {
        new: true,
        // runValidators: true
    }, (err, actividadDB) => {
        if (!actividadDB) {
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
            actividad: actividadDB
        });
    });

});

//=====================================
//eliminar actividad
//=====================================

app.delete('/actividad/:id', (req, res) => {
    let id = req.params.id;

    Actividad.findByIdAndRemove(id, (err, actividadBD) => {
        if (!actividadBD) {
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
            mensaje: 'actividad borrada'
        });
    });
});

//=====================================
//Filtrar una actividad
//=====================================

app.get('/actividad/buscar/:termino', (req, res) => {
    let termino = req.params.termino;
    let regex = new RegExp(termino, 'i');
    Actividad.find({
            titulo: regex
        })
        .sort('titulo')
        .exec((err, actividad) => {
            if (err) {
                res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                actividad
            });
        });
});

module.exports = app;