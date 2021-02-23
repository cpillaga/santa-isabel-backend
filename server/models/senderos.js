const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let senderoSchema = new Schema({
    lat: {
        type: String,
    },
    lng: {
        type: String,
    },
    ruta: {
        type: Schema.Types.ObjectId,
        ref: 'Ruta',
        required: true,
    }
});

module.exports = mongoose.model('Sendero', senderoSchema);