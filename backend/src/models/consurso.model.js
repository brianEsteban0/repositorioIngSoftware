"use strict";
// Importa el modulo 'mongoose' para crear la conexion a la base de datos
const mongoose = require('mongoose');

const concursoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    // Otros campos relacionados con el concurso
});
const Concurso = mongoose.model('Concurso', concursoSchema);

module.exports = Concurso;
