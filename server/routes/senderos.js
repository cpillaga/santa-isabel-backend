const express = require('express');

let Sendero = require('../models/senderos');

let app = express();

const cors = require('cors');

app.use(cors({ origin: '*' }));

app.get('/sendero/:idRuta', (req, res) => {
    let id = req.params.idRuta;
    Sendero.find({ ruta: id })
        .exec((err, senderoDB) => {
            if (!senderoDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        mensaje: 'el id no existe en la tabla sendero'
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
                sendero: senderoDB
            });
        });
});

app.post('/sendero', (req, res) => {
    let body = req.body;

    let sendero = new Sendero({
        lat: body.lat,
        lng: body.lng,
        ruta: body.ruta
    });

    sendero.save((err, senderoBD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!senderoBD) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            sendero: senderoBD
        });
    });
});

module.exports = app;