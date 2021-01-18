const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let rutaSchema = new Schema({
    descripcion: {
        type: String,
        required: [true, 'La descripción es necesaria'],
        unique: true,
    }
});

rutaSchema.plugin(uniqueValidator, {
    message: '{PATH} debe ser único'
});

module.exports = mongoose.model('Ruta', rutaSchema);