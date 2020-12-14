const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let festividadSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El titulo es necesario'],
    },
    descripcion: {
        type: String,
        required: true,
    },
    fecha: {
        type: String,
        required: true,
    },
    img: {
        type: String,
    },
});

module.exports = mongoose.model('Festividad', festividadSchema);