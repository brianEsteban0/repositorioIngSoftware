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
        /* validate: [
            {
                validator: function(titulo) {
                // Expresión regular para permitir letras solas, letras combinadas con símbolos especiales,
                // letras con tildes, números con letras, pero no permitir números con símbolos,
                // ni números solos, ni caracteres solos
                    const regex = /^(?=.*[a-zA-ZñÑáéíóúÁÉÍÓÚ])[\w!@#$%^&*(),.?~\\/-]*$/;
                    // Verificar si el titulo cumple con la expresión regular
                    return regex.test(titulo);
                },
                message: "El Título de la publicación debe ser válido",
            },
            {
                validator: function(titulo) {
                    // Validar la longitud máxima del título
                    return titulo.length <= 50;
                },
                message: "El título no puede tener más de 50 caracteres",
            },
        ],*/
    },
    Descripcion: {
        type: String,
        required: [true, "La descripción es obligatoria"],
        /* validate: [
            {
                validator: function(descripcion) {
                // Expresión regular para permitir letras solas, letras combinadas con símbolos especiales,
                // letras con tildes, números con letras, pero no permitir números con símbolos,
                // ni números solos, ni caracteres solos
                const regex = /^(?=.*[a-zA-ZñÑáéíóúÁÉÍÓÚ])[\w!@#$%^&*(),.?~\\/-]*$/;
                    // Verificar si la descripcion cumple con la expresión regular
                    return regex.test(descripcion);
                },
                message: "La descripción de la publicación debe ser válida",
            },
            {
                validator: function(descripcion) {
                    // Validar la longitud máxima de la descripción
                    return descripcion.length <= 750;
                },
                message: "La descripción no puede tener más de 750 caracteres",
            },
        ],*/
    },
    Organizacion: {
        type: String,
        required: [true, "El nombre de la organización es obligatorio"],
        /* validate: [
            {
                validator: function(organizacion) {
                // Expresión regular para permitir letras solas, letras combinadas con símbolos especiales,
                // letras con tildes, números con letras, pero no permitir números con símbolos,
                // ni números solos, ni caracteres solos
                const regex = /^(?=.*[a-zA-ZñÑáéíóúÁÉÍÓÚ])[\w!@#$%^&*(),.?~\\/-]*$/;
                    // Verificar si el nombre de la organización cumple con la expresión regular
                    return regex.test(organizacion);
                },
                message: "Ingrese un nombre de organización válido",
            },
            {
                validator: function(organizacion) {
                    // Validar la longitud máxima del nombre de la organización
                    return organizacion.length <= 30;
                },
                message: "El nombre de la organización no puede tener más de 30 caracteres",
            },
        ],*/
    },
    Representante: {
        type: String,
        required: [true, "El nombre del representante es obligatorio"],
            /* validate: [
            {
                validator: function(representante) {
            // Expresión regular para permitir letras con la "ñ", espacios y tildes
            const regex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*$/;
            // Verificar si el representante cumple con la expresión regular
                    return regex.test(representante);
                },
                message: "Ingrese un nombre de Representante válido",
            },
            {
                validator: function(representante) {
                    // Validar la longitud máxima del representante
                    return representante.length <= 30;
                },
                message: "El nombre del representante no puede tener más de 30 caracteres",
            },
        ], */
    },
    Rut_Representante: {
        type: String,
        required: true,
    },
});

const PublicacionResultados = mongoose.model(
    "Publicacion_resultados",
    publicacionResultadosSchema,
);

module.exports = PublicacionResultados;

