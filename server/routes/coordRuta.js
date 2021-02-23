const express = require('express');

let Coords = require('../models/coordRuta');

let app = express();

const cors = require('cors');

app.use(cors({ origin: '*' }));

app.get('/coordRuta/:idRuta', (req, res) => {
            let id = req.params.idRuta;
            Coords.find({ ruta: id }
                .exec((err, agenda) => {
                    if (!coordsDB) {
                        return res.status(400).json({
                            ok: false,
                            err: {
                                mensaje: 'el id no existe en la tabla coords'
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
                        coords: coordsDB
                    });
                });
            });


        app.post('/coordRuta', (req, res) => {
            let body = req.body;

            let coord = new Coords({
                lat: body.lat,
                lng: body.lng,
                ruta: body.ruta
            });

            coord.save((err, coordBD) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }

                if (!coordBD) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }
                res.json({
                    ok: true,
                    coord: coordBD
                });
            });
        });

        module.exports = app;