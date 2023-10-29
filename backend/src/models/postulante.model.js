"use strict";
// Importa el modulo 'mongoose' para crear la conexion a la base de datos
const mongoose = require('mongoose');

const postulanteSchema = new mongoose.Schema({
    Organizacion: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true,
    },
    Ubicación: {
        type: String,
        required: true,
    },
    Representante: {
        type: String,
        required: true,
    },
    Rut_Representante: {
        type: String,
        required: true,
    },
    Rut_Organizacion: {
        type: String,
        required: true,
    },
    Telefono: {
        type: String,
        required: true,
    },
    Correo: {
        type: String,
        required: true,
    },
});

const Postulante = mongoose.model('Postulante', postulanteSchema);

module.exports = Postulante;