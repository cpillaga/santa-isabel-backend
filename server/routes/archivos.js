const express = require('express');

let Archivo = require('../models/archivo');

let app = express();

const cors = require('cors');

app.use(cors({ origin: '*' }));

//=====================================
//mostrar todos los lugares
//=====================================

app.get('/archivo', (req, res) => {
    Archivo.find({})
        .exec((err, archivo) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                archivo
            });
        });
});

//=====================================
//mostrar un lugar por id.
//=====================================

app.get('/archivo/:id', (req, res) => {
    let id = req.params.id;
    Archivo.findById(id)
        .exec((err, archivoDB) => {
            if (!archivoDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        mensaje: 'el id no existe en la tabla archivo'
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
                archivo: archivoDB
            });
        });
});

//=====================================
//crear nuevo lugar
//=====================================

app.post('/archivo', (req, res) => {
    let body = req.body;
    let archivo = new Archivo({
        descripcion: body.descripcion,
        url: body.url,
    });

    archivo.save((err, archivoBD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!archivoBD) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            archivo: archivoBD
        });
    });
});

//=====================================
//actualizar lugar
//=====================================

app.put('/archivo/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;

    let desArchivo = {
        descripcion: body.descripcion,
        url: body.url,
    };

    Archivo.findByIdAndUpdate(id, desArchivo, {
        new: true,
        // runValidators: true
    }, (err, archivoDB) => {
        if (!archivoDB) {
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
            archivo: archivoDB
        });
    });

});

//=====================================
//eliminar lugar
//=====================================

app.delete('/archivo/:id', (req, res) => {
    let id = req.params.id;

    Archivo.findByIdAndRemove(id, (err, archivoBD) => {
        if (!archivoBD) {
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
            mensaje: 'archivo borrado'
        });
    });
});

//=====================================
//Filtrar un archivo
//=====================================

app.get('/archivo/buscar/:termino', (req, res) => {
    let termino = req.params.termino;
    let regex = new RegExp(termino, 'i');
    Archivo.find({
            descripcion: regex
        })
        .exec((err, archivo) => {
            if (err) {
                res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                archivo
            });
        });
});

module.exports = app;