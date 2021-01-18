const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let lugarSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario'],
        unique: true,
    },
    descripcion: {
        type: String,
    },
    lat: {
        type: String,
    },
    lng: {
        type: String,
    },
    img: {
        type: String,
        required: true,
    },
    sector: {
        type: Schema.Types.ObjectId,
        ref: 'Sector',
        required: true,
    },
    tipo: {
        type: Schema.Types.ObjectId,
        ref: 'Tipo',
        required: true,
    }
});

lugarSchema.plugin(uniqueValidator, {
    message: '{PATH} debe ser único'
});

module.exports = mongoose.model('Lugar', lugarSchema);