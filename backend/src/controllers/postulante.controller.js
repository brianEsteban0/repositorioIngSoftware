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
        if (!postulantes) {
            return [null, "No hay postulantes"];

        }
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
async function updatePostulantes(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body; // Los nuevos datos del postulante
  
      // Busca el postulante por ID
      const postulante = await Postulante.findById(id);
  
      if (!postulante) {
        return res.status(404).json({ message: 'Postulante no encontrado' });
      }
  
      // Actualiza el postulante con los nuevos datos
      postulante.set(updateData);
      const updatedPostulante = await postulante.save();
  
      return res.status(200).json(updatedPostulante);
    } catch (error) {
      handleError(error, "postulante.controller -> updatePostulante");
      return res.status(500).json({ message: 'Error al actualizar el postulante' });
    }
}
  
async function deletePostulantes(req, res) {
    try {
      const { id } = req.params; // Obtén el ID de la URL
  
      // Busca el postulante por ID y elimínalo
      const postulante = await Postulante.findByIdAndRemove(id);
  
      if (!postulante) {
        return res.status(404).json({ message: 'Postulante no encontrado' });
      }
  
      return res.status(204).send();
    } catch (error) {
      handleError(error, "postulante.controller -> deletePostulante");
      return res.status(500).json({ message: 'Error al eliminar el postulante' });
    }
}

module.exports = {
    createPostulantes,
    getPostulantes,
    updatePostulantes,
    deletePostulantes,
    getPostulantesBypostulacionId,
};
