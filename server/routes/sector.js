const express = require('express');

let Sector = require('../models/sector');

let app = express();

//=====================================
//mostrar todas los sectores
//=====================================

app.get('/sector', (req, res) => {
    Sector.find({})
        .sort('nombre')
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
//mostrar un sector por id.
//=====================================

app.get('/sector/:id', (req, res) => {
    let id = req.params.id;
    Sector.findById(id, (err, sectorDB) => {
        if (!sectorDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    mensaje: 'el id no existe en la tabla sector'
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
            sector: sectorDB
        });
    });
});

//=====================================
//crear nuevo sector
//=====================================

app.post('/sector', (req, res) => {
    let body = req.body;
    let sector = new Sector({
        nombre: body.nombre,
        descripcion: body.descripcion,
        img: body.img,
    });

    sector.save((err, sectorBD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!sectorBD) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            sector: sectorBD
        });
    });
});

//=====================================
//actualizar sector
//=====================================

app.put('/sector/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;

    let descSector = {
        nombre: body.nombre,
        descripcion: body.descripcion,
        img: body.img,
    };

    Sector.findByIdAndUpdate(id, descSector, {
        new: true,
        // runValidators: true
    }, (err, sectorBD) => {
        if (!sectorBD) {
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
            sector: sectorBD
        });
    });

});

//=====================================
//eliminar sector
//=====================================

app.delete('/sector/:id', (req, res) => {
    let id = req.params.id;

    Sector.findByIdAndRemove(id, (err, sectorBD) => {
        if (!sectorBD) {
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
            mensaje: 'sector borrado'
        });
    });
});

//=====================================
//Filtrar una sector
//=====================================

app.get('/sector/buscar/:termino', (req, res) => {
    let termino = req.params.termino;
    let regex = new RegExp(termino, 'i');
    Sector.find({
            nombre: regex
        })
        .sort('nombre')
        .exec((err, sector) => {
            if (err) {
                res.status(500).json({
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

module.exports = app;