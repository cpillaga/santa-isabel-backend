const express = require('express');

let Noticia = require('../models/noticia');

let app = express();

const cors = require('cors');

app.use(cors({ origin: '*' }));

//=====================================
//mostrar todas las noticias
//=====================================

app.get('/noticia', (req, res) => {
    Noticia.find({})
        .sort('titulo')
        .exec((err, noticia) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                noticia
            });
        });
});

//=====================================
//mostrar una noticia por id.
//=====================================

app.get('/noticia/:id', (req, res) => {
    let id = req.params.id;
    Noticia.findById(id, (err, noticiaDB) => {
        if (!noticiaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    mensaje: 'el id no existe en la tabla noticia'
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
            noticia: noticiaDB
        });
    });
});

//=====================================
//crear nueva noticia
//=====================================

app.post('/noticia', (req, res) => {
    let body = req.body;
    let noticia = new Noticia({
        titulo: body.titulo,
        descripcion: body.descripcion,
        fecha: Date.now(),
        referencia: body.referencia,
    });

    noticia.save((err, noticiaBD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!noticiaBD) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            noticia: noticiaBD
        });
    });
});

//=====================================
//actualizar noticia
//=====================================

app.put('/noticia/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;

    let descNoticia = {
        titulo: body.titulo,
        descripcion: body.descripcion,
        fecha: Date.now(),
        referencia: body.referencia,
    };

    Noticia.findByIdAndUpdate(id, descNoticia, {
        new: true,
        // runValidators: true
    }, (err, noticiaDB) => {
        if (!noticiaDB) {
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
            noticia: noticiaDB
        });
    });

});

//=====================================
//eliminar noticia
//=====================================

app.delete('/noticia/:id', (req, res) => {
    let id = req.params.id;

    Noticia.findByIdAndRemove(id, (err, noticiaBD) => {
        if (!noticiaBD) {
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
            mensaje: 'noticia borrada'
        });
    });
});

//=====================================
//Filtrar una noticia
//=====================================

app.get('/noticia/buscar/:termino', (req, res) => {
    let termino = req.params.termino;
    let regex = new RegExp(termino, 'i');
    Noticia.find({
            titulo: regex
        })
        .sort('titulo')
        .exec((err, noticia) => {
            if (err) {
                res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                noticia
            });
        });
});

module.exports = app;