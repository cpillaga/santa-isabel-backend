const express = require('express');

let Redes = require('../models/redSocial');

let app = express();

const cors = require('cors');

app.use(cors({ origin: '*' }));

//=====================================
//mostrar todas las agenda
//=====================================

app.get('/redes/:id', (req, res) => {
    let id = req.params.id;

    Redes.find({ lugar: id })
        .exec((err, redes) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                redes
            });
        });
});

//=====================================
//crear nueva agenda
//=====================================

app.post('/redes', (req, res) => {
    let body = req.body;

    let redes = new Redes({
        paginaWeb: body.paginaWeb,
        facebook: body.facebook,
        instagram: body.instagram,
        telefono: body.telefono,
        lugar: body.lugar
    });

    redes.save((err, redesBD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!redesBD) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            redes: redesBD
        });
    });
});

//=====================================
//actualizar actividad
//=====================================

app.put('/redes/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;

    let descRedes = {
        paginaWeb: body.paginaWeb,
        facebook: body.facebook,
        instagram: body.instagram,
        telefono: body.telefono,
        lugar: body.lugar
    };

    Redes.findByIdAndUpdate(id, descRedes, { new: true }, (err, redesDB) => {
        if (!redesDB) {
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
            redes: redesDB
        });
    });

});

//=====================================
//eliminar agenda
//=====================================

app.delete('/redes/:id', (req, res) => {
    let id = req.params.id;

    Redes.findByIdAndRemove(id, (err, redesBD) => {
        if (!redesBD) {
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
            mensaje: 'redes borrada'
        });
    });
});

module.exports = app;