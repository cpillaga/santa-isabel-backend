const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let agendaSchema = new Schema({
    titulo: {
        type: String,
        required: [true, 'El titulo es necesario']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es necesaria'],
    },
    fecha: {
        type: Date,
        required: [true, 'La fecha es necesaria'],
    },
    lugar: {
        type: String,
        required: [true, 'El lugar es necesario'],
    }
});


module.exports = mongoose.model('Agenda', agendaSchema);