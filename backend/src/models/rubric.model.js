"use strict";
// Importa el modulo 'mongoose' para crear la conexion a la base de datos
const mongoose = require('mongoose');

const rubricSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    contestType: {
      type: String, // Podría ser un tipo de concurso específico
      required: true
    },
    criteria: [{
      name: String,
      Score: {
        type: Number,
        min: 1,
        max: 100,
        default: 100
      }
    }],
    publicacion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Publicacion'
    },
    // Otros campos relevantes para la rúbrica
});
  

const Rubric = mongoose.model('Rubric', rubricSchema);

module.exports = Rubric;
