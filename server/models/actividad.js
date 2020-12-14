const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let actividadSchema = new Schema({
    titulo: {
        type: String,
        required: [true, 'El titulo es necesario'],
        unique: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    icono: {
        type: String,
    },
});

actividadSchema.plugin(uniqueValidator, {
    message: '{PATH} debe ser único'
});

module.exports = mongoose.model('Actividad', actividadSchema);