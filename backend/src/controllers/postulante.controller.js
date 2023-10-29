"use strict";

const { respondSuccess, respondError, respondInternalError } = require("../utils/resHandler");
const PostulanteService = require("../services/postulante.service.js");
const { handleError } = require("../utils/errorHandler.js");
const Postulante = require("../models/postulante.model.js");


/**
 * Obtiene todos los postulantes.
 * @returns [postulantes, error]
 */
async function getPostulantes(req, res) {
    try {
        const postulantes = await Postulante.find().exec();
        if (!postulantes) return [null, "No hay postulantes"];

        return [postulantes, null];
    } catch (error) {
        handleError(error, "postulante.service -> getPostulantes");
    }
}

/**
 * Crea un nuevo usuario
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function createPostulantes(req, res) {
    try {
        const { body } = req;
        const [postulante, errorPostulante] = await PostulanteService.createPostulantes(body);
        
        if (errorPostulante) {
            return respondInternalError(req, res, 404, errorPostulante);
        }
        if (!postulante) {
            return respondError(req, res, 400, "No se pudo crear el postulante");
        }
        respondSuccess(req, res, 201, postulante);
    } catch (error) {
        handleError(error, "postulante.controller -> createPostulantes");
        respondError(req, res, 500, "Error al crear el postulante");
    }
}


module.exports = {
    createPostulantes,
    getPostulantes,
};
