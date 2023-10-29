"use strict";

const Postulante = require("../models/postulante.model.js"); // Asegúrate de importar el modelo correcto
const { handleError } = require("../utils/errorHandler");

/**
 * Obtiene todos los postulantes.
 * @returns
 */
async function getPostulantes() {
    try {
        const postulantes = await Postulante.find().exec();
        if (!postulantes) return [null, "No hay postulantes"];

        return [postulantes, null];

    } catch (error) {
        handleError(error, "postulante.service -> getPostulantes");
    }
}

/**
 * 
 * 
 */
async function createPostulantes(postulante) {
    try {
        const { Organizacion, descripcion, Ubicación, Representante, Rut_Representante, Rut_Organizacion, Telefono, Correo } = postulante;
        const postulanteFound = await Postulante.findOne({ Rut_Organizacion: postulante.Rut_Organizacion });
        if (postulanteFound) return [null, "El postulante ya existe"];

        const newPostulante = new Postulante({
            Organizacion,
            descripcion,
            Ubicación,
            Representante,
            Rut_Representante,
            Rut_Organizacion,
            Telefono,
            Correo
        });

        const myPostulante = await newPostulante.save();
        return [myPostulante, null];
    } catch (error) {
        handleError(error, "postulante.service -> createPostulantes");
    }
}

module.exports = {
    getPostulantes,
    createPostulantes,
};
