/* eslint-disable require-jsdoc */
"use strict";

const mongoose = require("mongoose");

// esquema de las publucaciones resultados
const publicacionResultadosSchema = new mongoose.Schema(
{
    Titulo: {
        type: String,
        required: true,
    },
    Descripcion: {
        type: String,
        required: true,
    },
    Organizacion: {
        type: String,
        required: true,
    },
    Representante: {
        type: String,
        required: true,
    }, Resultado: {
        type: String,
        required: true,
    },
});

const PublicacionResultados = mongoose.model(
    "Publicacion_resultados",
    publicacionResultadosSchema,
);

module.exports = PublicacionResultados;

