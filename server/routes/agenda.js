const express = require('express');

let Agenda = require('../models/agenda');

let app = express();

const cors = require('cors');

app.use(cors({ origin: '*' }));

//=====================================
//mostrar todas las agenda
//=====================================

app.get('/agenda', (req, res) => {
    Agenda.find({})
        .exec((err, agenda) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                agenda
            });
        });
});

app.get('/agenda/fecha/:fecha', (req, res) => {
    let fechaI = req.params.fecha + "T00:00:00.000Z";
    let fechaF = req.params.fecha + "T23:59:59.000Z";

    Agenda.find({ $and: [{ fecha: { $gte: new Date(fechaI) } }, { fecha: { $lt: new Date(fechaF) } }] })
        .exec((err, agenda) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                agenda
            });
        });
});


//=====================================
//mostrar una actividad por id.
//=====================================

app.get('/agenda/:id', (req, res) => {
    let id = req.params.id;
    Agenda.findById(id, (err, agendadDB) => {
        if (!agendadDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    mensaje: 'el id no existe en la tabla agenda'
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
            agenda: agendaDB
        });
    });
});

//=====================================
//crear nueva agenda
//=====================================

app.post('/agenda', (req, res) => {
    let body = req.body;

    let agenda = new Agenda({
        titulo: body.titulo,
        descripcion: body.descripcion,
        fecha: body.fecha,
        lugar: body.lugar
    });

    agenda.save((err, agendaBD) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!agendaBD) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            agenda: agendaBD
        });
    });
});

//=====================================
//actualizar actividad
//=====================================

app.put('/agenda/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;

    let descAgenda = {
        titulo: body.titulo,
        descripcion: body.descripcion,
        fecha: body.fecha,
        lugar: body.lugar
    };

    Agenda.findByIdAndUpdate(id, descAgenda, {
        new: true,
        // runValidators: true
    }, (err, agendaDB) => {
        if (!agendaDB) {
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
            agenda: agendaDB
        });
    });

});

//=====================================
//eliminar agenda
//=====================================

app.delete('/agenda/:id', (req, res) => {
    let id = req.params.id;

    Agenda.findByIdAndRemove(id, (err, agendaBD) => {
        if (!agendaBD) {
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
            mensaje: 'agenda borrada'
        });
    });
});

//=====================================
//Filtrar una actividad
//=====================================

app.get('/agenda/buscar/:termino', (req, res) => {
    let termino = req.params.termino;
    let regex = new RegExp(termino, 'i');
    Agenda.find({
            titulo: regex
        })
        .exec((err, agenda) => {
            if (err) {
                res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                agenda
            });
        });
});

module.exports = app;