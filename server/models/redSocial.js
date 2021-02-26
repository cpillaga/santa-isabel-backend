const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let redesSchema = new Schema({
    paginaWeb: {
        type: String,
        required: false
    },
    facebook: {
        type: String,
        required: false
    },
    instagram: {
        type: String,
        required: false
    },
    telefono: {
        type: String,
        required: false
    },
    lugar: {
        type: Schema.Types.ObjectId,
        ref: 'Lugar',
        required: true,
    }
});

module.exports = mongoose.model('Redes', redesSchema);