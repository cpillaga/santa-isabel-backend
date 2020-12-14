const express = require('express');

let Informacion = require('../models/informacion');

let app = express();

//=====================================
//mostrar todas las informaciones
//=====================================

app.get('/informacion', (req, res) => {
    Informacion.find({})
        .sort('titulo')
        .exec((err, informacion) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                informacion
            });
        });
});

//=====================================
//mostrar una informacion por id.
//=====================================

app.get('/informacion/:id', (req, res) => {
    let id = req.params.id;
    Informacion.findById(id, (err, informacionDB) => {
        if (!informacionDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    mensaje: 'el id no existe en la tabla informacion'
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
            informacion: informacionDB
        });
    });
});

//=====================================
//crear nueva informacion
//=====================================

app.post('/informacion', (req, res) => {
    let body = req.body;
    let informacion = new Informacion({
        titulo: body.titulo,
        subtitulo: body.subtitulo,
        descripcion: body.descripcion,
        img: body.img,
    });

    informacion.save((err, informacionBD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!informacionBD) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            informacion: informacionBD
        });
    });
});

//=====================================
//actualizar informacion
//=====================================

app.put('/informacion/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;

    let descInformacion = {
        titulo: body.titulo,
        subtitulo: body.subtitulo,
        descripcion: body.descripcion,
        img: body.img,
    };

    Informacion.findByIdAndUpdate(id, descInformacion, {
        new: true,
        // runValidators: true
    }, (err, informacionDB) => {
        if (!informacionDB) {
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
            informacion: informacionDB
        });
    });

});

//=====================================
//eliminar informacion
//=====================================

app.delete('/informacion/:id', (req, res) => {
    let id = req.params.id;

    Informacion.findByIdAndRemove(id, (err, informacionBD) => {
        if (!informacionBD) {
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
            mensaje: 'informacion borrada'
        });
    });
});

//=====================================
//Filtrar una informacion
//=====================================

app.get('/informacion/buscar/:termino', (req, res) => {
    let termino = req.params.termino;
    let regex = new RegExp(termino, 'i');
    Informacion.find({
            titulo: regex
        })
        .sort('titulo')
        .exec((err, informacion) => {
            if (err) {
                res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                informacion
            });
        });
});

module.exports = app;