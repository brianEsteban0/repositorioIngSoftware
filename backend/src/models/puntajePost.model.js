const mongoose = require('mongoose');

const evaluacionSchema = new mongoose.Schema({
    postulante: { type: mongoose.Schema.Types.ObjectId, ref: 'Postulante' },
    rubric: { type: mongoose.Schema.Types.ObjectId, ref: 'Rubric' },
    scores: [Number], // Puntajes otorgados por el evaluador
    scoretotal: Number, // Puntaje total del postulante
});

const Evaluacion = mongoose.model('PuntajePost', evaluacionSchema);

module.exports = Evaluacion;
