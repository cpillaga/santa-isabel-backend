const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let coordSchema = new Schema({
    lat: {
        type: String,
    },
    lng: {
        type: String,
    },
    orden: {
        type: Number,
        required: true
    },
    ruta: {
        type: Schema.Types.ObjectId,
        ref: 'Ruta',
        required: true,
    }
});

module.exports = mongoose.model('Coord', coordSchema);