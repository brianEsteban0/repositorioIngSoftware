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

/**
 * Obtiene un usuario por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getPostulantesBypostulacionId(req, res) {
    try {
      const { params} = req;
      const [postulantes, errorPostulante] = await PostulanteService.getPostulantesByIdpostulacion(params.id);
  
      if (errorPostulante) return respondError(req, res, 404, errorPostulante);
  
      respondSuccess(req, res, 200, postulantes);
    } catch (error) {
      handleError(error, "postulante.controller -> getPostulanteById");
      respondError(req, res, 500, "No se pudo obtener los postulantes");
    }
  }

module.exports = {
    createPostulantes,
    getPostulantes,
    getPostulantesBypostulacionId,
};
