const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let fileSchema = new Schema({
    descripcion: {
        type: String,
        unique: true,
        required: [true, 'La descripcion es obligatoria']
    },
    url: {
        type: String,
        required: [true, 'El url es obligatorio']
    }
});

fileSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser unico' });

module.exports = mongoose.model('File', fileSchema);