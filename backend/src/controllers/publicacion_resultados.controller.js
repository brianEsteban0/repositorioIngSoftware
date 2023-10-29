"use strict";

const { respondSuccess, respondError, } = require("../utils/resHandler");
const Publicacion_resultados_service = require("../services/publicacion_resultados.service.js");
const {handleError} = require("../utils/errorHandler");
const Publicacion_resultados = require('../models/publicacion_resultados.model');

  async function getPublicacion_resultados(req, res) {
    try {
        const [Publicacion_resultados, error_publicacion_resultados] = await Publicacion_resultados_service.getPublicacion_resultados();//cambiar por el servicio de resultados
        if (error_publicacion_resultados) return respondInternalError(req, res, 404, error_publicacion_resultados);//Error en el servicio de resultados
    
        if (Publicacion_resultados.length === 0) {
            respondSuccess(req, res, 204, "No hay resultados ingresados");//El largo de resultados es 0 por ende no hay resultados que mostrar
        } else {
            respondSuccess(req, res, 200, Publicacion_resultados);//Se envian los resultados
        }
    } catch (error) {
        handleError(error, "publicacion_resultados.controller -> getPublicacion_resultados");

    }
}

/**
 * Crea un nuevo usuario
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */

  async function createPublicacion_resultados(req, res) {
    try {
        const { body } = req;
        const [Publicacion_resultados, error_publicacion_resultados] = await PublicacionService.createPublicacion_resultados(body);
        if (error_publicacion_resultados) return respondInternalError(req, res, 404, error_publicacion_resultados);
  
      if (error_publicacion_resultados) return respondError(req, res, 400, error_publicacion_resultados);
      if (!Publicacion_resultados) {
        return respondError(req, res, 400, "No se entregaran los resultados");
      }
  
      respondSuccess(req, res, 201, Publicacion_resultados);
    } catch (error) {
      handleError(error, "publicacion_resultados.controller -> createPublicacion_resultados");
      respondError(req, res, 500, "No se creo la publicacion de resultados");
    }
  }

  async function updatePublicacion_resultados(req, res) {
    try{
      const { id } = req.params;
      const updatePresults = req.body; // Los nuevos datos de la publicación

      // Busca la publicación por ID
      const publicacion_resultados = await Publicacion_resultados.findById(id);

      if (!publicacion_resultados) {
        return res.status(404).json({ message: ' publicación no se pudo encontrar, intente nuevamente' });
    }

    // Actualiza la publicación con los nuevos datos
    publicacion_resultados.set(updatePresults);
    const updatedPublicacion_resultados = await publicacion_resultados.save();

    return res.status(200).json(updatedPublicacion_resultados);
  }catch(error){
    handleError(error, "publicacion_resultados.controller -> updatePublicacion_resultados");
    return res.status(500).json({ message: 'Error al actualizar la publicación, intente nuevamente' });
  }
}

  async function deletePublicacion_resultados(req, res) {
    try{
      const { id } = req.params;

      // Busca la publicación por ID y la elimina
      const publicacion_resultados = await Publicacion_resultados.findByIdAndRemove(id);

      if (!publicacion_resultados) {
        return res.status(404).json({ message: ' publicación no encontrada, intente nuevamente' });
    }

    return res.status(204).send();
  }catch(error){
    handleError(error, "publicacion_resultados.controller -> deletePublicacion_resultados");
    return res.status(500).json({ message: 'Error al eliminar la publicación, intente nuevamente' });
  }
}

module.exports = {
    getPublicacion_resultados,
    createPublicacion_resultados,
    updatePublicacion_resultados,
    deletePublicacion_resultados,
};