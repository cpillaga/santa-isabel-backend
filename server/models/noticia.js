const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let noticiaSchema = new Schema({
    titulo: {
        type: String,
        required: [true, 'El titulo es necesario'],
    },
    descripcion: {
        type: String,
        required: true,
    },
    fecha: {
        type: Date,
        required: true,
    },
    referencia: {
        type: String,
    },
});

module.exports = mongoose.model('Noticia', noticiaSchema);