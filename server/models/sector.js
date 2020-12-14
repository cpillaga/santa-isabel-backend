const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let sectorSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario'],
        unique: true,
    },
    descripcion: {
        type: String,
    },
    img: {
        type: String,
        required: true,
    },
});

sectorSchema.plugin(uniqueValidator, {
    message: '{PATH} debe ser único'
});

module.exports = mongoose.model('Sector', sectorSchema);