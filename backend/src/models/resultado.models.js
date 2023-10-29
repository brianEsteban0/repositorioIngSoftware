const mongoose = require('mongoose');

const resultadoSchema = new mongoose.Schema({
    postulacion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Publicacion',
        required: true
    },
    postulante: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Postulante',
        required: true
    },
    rubrica: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rubrica',
        required: true
    },
    puntaje_total: {
        type: Number,
        required: true
    },
    ganador:{
        type: Boolean,
        requiered: true
    }
});

const Resultado = mongoose.model('Resultado', resultadoSchema);

module.exports = Resultado;
