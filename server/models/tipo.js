const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let tipoSchema = new Schema({
    descripcion: {
        type: String,
        required: [true, 'La descripción es necesaria'],
        unique: true,
    },
    color: {
        type: String,
        required: [true, 'El color es necesario']
    }
});

tipoSchema.plugin(uniqueValidator, {
    message: '{PATH} debe ser único'
});

module.exports = mongoose.model('Tipo', tipoSchema);