const mongoose = require('mongoose');

const evaluacionSchema = new mongoose.Schema({
    postulanteRut: { type: String },// Rut del representate a evaluar 
    rubric: { type: mongoose.Schema.Types.ObjectId, ref: 'Rubric' },
    publicacion:{ type: mongoose.Schema.Types.ObjectId, ref: 'Publicacion'},
    scores: [Number], // Puntajes otorgados por el evaluador
    scoretotal: Number, // Puntaje total del postulante
});

const Evaluacion = mongoose.model('PuntajePost', evaluacionSchema);

module.exports = Evaluacion;
