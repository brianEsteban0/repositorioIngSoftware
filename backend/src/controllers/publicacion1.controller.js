"use strict";

const {respondSuccess, respondError } = require("../utils/resHandler")
const PublicacionService = require("../services/publicacion.service");
const { handleError } = require("../utils/errorHandler");
const Publicacion = require('../models/publicacion.model');

async function getPublicaciones(req, res) {
    try {
        const [publicaciones, errorPublicaciones] = await PublicacionService.getPublicaciones();
        if (errorPublicaciones) return respondInternalError(req, res, 404, errorPublicaciones);
        
        if (publicaciones.length === 0) {
            respondSuccess(req, res, 204); // No Content
        } else {
            respondSuccess(req, res, 200, publicaciones);
        }
    } catch (error) {
        handleError(error, "publicacion.controller -> getPublicaciones");
    }
}

/**
 * Crea un nuevo usuario
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function createPublicacion(req, res) {
    try {
        const { body } = req;
        const [publicaciones, errorPublicaciones] = await PublicacionService.createPublicacion(body);
        if (errorPublicaciones) return respondInternalError(req, res, 404, errorPublicaciones);
  
      if (errorPublicaciones) return respondError(req, res, 400, errorPublicaciones);
      if (!publicaciones) {
        return respondError(req, res, 400, "No se creo la rubrica");
      }
  
      respondSuccess(req, res, 201, publicaciones);
    } catch (error) {
      handleError(error, "publicacion.controller -> createPublicacion");
      respondError(req, res, 500, "No se creo la publicacion");
    }
  }
  async function updatePublicacion(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body; // Los nuevos datos de la publicación
  
      // Busca la publicación por ID
      const publicacion = await Publicacion.findById(id);
  
      if (!publicacion) {
        return res.status(404).json({ message: 'Publicación no encontrada' });
      }
  
      // Actualiza la publicación con los nuevos datos
      publicacion.set(updateData);
      const updatedPublicacion = await publicacion.save();
  
      return res.status(200).json(updatedPublicacion);
    } catch (error) {
      handleError(error, "publicacion.controller -> updatePublicacion");
      return res.status(500).json({ message: 'Error al actualizar la publicación' });
    }
  }

  async function deletePublicacion(req, res) {
    try {
      const { id } = req.params; // Obtén el ID de la URL
  
      // Busca la publicación por ID y elimínala
      const publicacion = await Publicacion.findByIdAndRemove(id);
  
      if (!publicacion) {
        return res.status(404).json({ message: 'Publicación no encontrada' });
      }
  
      return res.status(204).send(); // Respuesta exitosa con estado 204 (No Content)
    } catch (error) {
      handleError(error, "publicacion.controller -> deletePublicacion");
      return res.status(500).json({ message: 'Error al eliminar la publicación' });
    }
  }

module.exports = {
    getPublicaciones,
    createPublicacion,
    updatePublicacion,
    deletePublicacion,
};