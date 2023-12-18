/* eslint-disable require-jsdoc */
"use strict";

const mongoose = require("mongoose");

// esquema de las publucaciones resultados
const publicacionResultadosSchema = new mongoose.Schema(
{
    Titulo: {
        type: String,
        required: [true, "El título de la publicación es obligatorio"],
        unique: true,
    },
    Descripcion: {
        type: String,
        required: [true, "La descripción es obligatoria"],
    },
    Organizacion: {
        type: String,
        required: [true, "El nombre de la organización es obligatorio"],
    },
    Representante: {
        type: String,
        required: [true, "El nombre del representante es obligatorio"],
    }, Resultado: {
        type: String,
        required: [true, "Beneficiario es obligatorio"],
    },
});

const PublicacionResultados = mongoose.model(
    "Publicacion_resultados",
    publicacionResultadosSchema,
);

module.exports = PublicacionResultados;

