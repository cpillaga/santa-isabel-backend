const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let informacionSchema = new Schema({
    titulo: {
        type: String,
        required: [true, 'El titulo es necesario'],
        unique: true,
    },
    subtitulo: {
        type: String,
    },
    descripcion: {
        type: String,
        required: true,
    },
    img: {
        type: String,
    },
});

informacionSchema.plugin(uniqueValidator, {
    message: '{PATH} debe ser único'
});

module.exports = mongoose.model('Informacion', informacionSchema);