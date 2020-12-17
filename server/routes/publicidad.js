const express = require("express");

let app = express();

let Publicidad = require("../models/publicidad");

const cors = require('cors');

app.use(cors({ origin: '*' }));

//=====================================
//mostrar todas las publicidades
//=====================================

app.get("/publicidad", (req, res) => {
    Publicidad.find()
        .exec((err, publicidades) => {
            if (err) {
                res.status(500).json({
                    ok: false,
                    err,
                });
            }
            res.json({
                ok: true,
                publicidades,
            });
        });
});
//=====================================
//mostrar todas las publicidades x tipo
//=====================================

app.get("/publicidad-type/:id", (req, res) => {
    let termino = req.params.id;
    Publicidad.find({ type: termino })
        .exec((err, publicidades) => {
            if (err) {
                res.status(500).json({
                    ok: false,
                    err,
                });
            }
            res.json({
                ok: true,
                publicidades,
            });
        });
});


//=====================================
//obtener un publicidad por id
//=====================================

app.get("/publicidad/:id", (req, res) => {
    let id = req.params.id;
    Publicidad.findById(id)
        .exec((err, publicidadDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err,
                });
            }
            if (!publicidadDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        mensaje: "el id no existe",
                    },
                });
            }
            res.json({
                ok: true,
                publicidad: publicidadDB,
            });
        });
});

//=====================================
//crear una nueva publicidad
//=====================================

app.post("/publicidad", (req, res) => {
    let body = req.body;
    let publicidad = new Publicidad({
        img: body.img,
        type: body.type,
    });

    publicidad.save((err, publicidadBD) => {
        if (err) {
            res.status(500).json({
                ok: false,
                err,
            });
        }
        res.status(201).json({
            ok: true,
            publicidad: publicidadBD,
        });
    });
});

//=====================================
//borrar publicidad
//=====================================

app.delete("/publicidad/:id", (req, res) => {
    let id = req.params.id;
    Publicidad.findByIdAndRemove(id, (err, publicidadDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err,
            });
        }
        if (!publicidadDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    mensaje: "el id no existe",
                },
            });
        }
        res.json({
            ok: true,
            mensaje: "Publicidad eliminada",
        });
    });
});


module.exports = app;