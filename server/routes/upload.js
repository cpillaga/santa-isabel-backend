const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(fileUpload());

app.post('/upload', function(req, res) {
    if (!req.files) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'NO se ha seleccionado archivos'
            }
        });
    }

    let archivo = req.files.archivo;

    let nombreCortado = archivo.name.split('.');
    let extension = nombreCortado[nombreCortado.length - 1];

    //Extensiones permitidas
    let extensionesValidas = ['json'];

    if (extensionesValidas.indexOf(extension) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'La extension permitida es JSON'
            }
        });
    }

    archivo.mv(`uploads/${archivo.name}`, (err) => {
        if (err) {
            return res, status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            message: 'Archivo subido correctamente'
        });
    });
});

app.get('/upload/:img', (req, res) => {
    let img = req.params.img;

    let imgPath = path.resolve(__dirname, `../../uploads/${img}`);
    if (fs.existsSync(imgPath)) {
        res.sendFile(imgPath);
    }
    // else {
    //     let defaultImg = path.resolve(__dirname, '../assets/avatar_simple.svg');
    //     res.sendFile(defaultImg);
    // }
});

app.get('/upload/borrar/:nombre', (req, res) => {
    let nombre = req.params.nombre;

    let pathFile = path.resolve(__dirname, `../../uploads/${nombre}`);

    if (fs.existsSync(pathFile)) {
        fs.unlinkSync(pathFile);
    }
});

module.exports = app;