"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const Publicacion_resultados_service = require("../services/publicacion_resultados.service.js");
const { handleError } = require("../utils/errorHandler");
const Publicacion_resultados = require('../models/publicacion_resultados.model');
const ResultadoService = require("../services/resultado.service.js"); // Importa el servicio de resultados
const Postulante = require("../models/postulante.model.js");

// Obtiene una publicación de resultados
async function getPublicacion_resultados(req, res) {
    try {
        // Obtiene los resultados de los participantes
        const [resultado, errorResultado] = await ResultadoService.getResultado();
        if (errorResultado) {
            return respondError(req, res, 404, errorResultado);
        }

        if (resultado.length === 0) {
            respondSuccess(req, res, 204, "No hay resultados ingresados");
        } else {
            // Combina los resultados de los participantes con los resultados de la publicación
            const publicacionResultados = { publicacion: Publicacion_resultados, resultados: resultado };
            respondSuccess(req, res, 200, publicacionResultados);
        }
    } catch (error) {
        handleError(error, "publicacion_resultados.controller -> getPublicacion_resultados");
    }
}

// Crea una nueva publicación de resultados
async function createPublicacion_resultados(req, res) {
    try {
        const { body } = req;

        // Verifica si existen postulantes antes de continuar
        const postulantes = await Postulante.find();

        if (postulantes.length === 0) {
            return respondError(req, res, 400, "No hay postulantes para publicar resultados por lo tanto la publicación se cancelará");
        }

        // Continúa con la creación de la publicación de resultados
        const [Publicacion_resultados, error_publicacion_resultados] = await Publicacion_resultados_service.createPublicacion_resultados(body);

        if (error_publicacion_resultados) return respondInternalError(req, res, 404, error_publicacion_resultados);

        if (!Publicacion_resultados) {
            return respondError(req, res, 400, "No se entregarán resultados");
        }

        respondSuccess(req, res, 201, Publicacion_resultados);
    } catch (error) {
        handleError(error, "publicacion_resultados.controller -> createPublicacion_resultados");
        respondError(req, res, 500, "No se creó la publicación de resultados");
    }
}



// Actualiza una publicación de resultados
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

// Elimina una publicación de resultados
  async function deletePublicacion_resultados(req, res) {
    try{
      const { id } = req.params;

      // Busca la publicación por ID y la elimina
      const publicacion_resultados = await Publicacion_resultados.findByIdAndRemove(id);

      if (!publicacion_resultados) {
        return res.status(404).json({ message: ' publicación no encontrada, no se pudo eliminar intente nuevamente' });
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

/**
async function createPublicacion_resultados(req, res) {
    try {
        const { body } = req;
        const [Publicacion_resultados, error_publicacion_resultados] = await Publicacion_resultados_service.createPublicacion_resultados(body);
        if (error_publicacion_resultados) {
            return respondError(req, res, 400, error_publicacion_resultados);
        }
        if (!Publicacion_resultados) {
            return respondError(req, res, 400, "No se entregaran los resultados");
        }

        // Después de crear la publicación, obtén los resultados de getPublicacion_resultados
        const [resultado, errorResultado] = await ResultadoService.getResultado();
        if (errorResultado) {
            return respondError(req, res, 404, errorResultado);
        }

        if (resultado.length === 0) {
            respondSuccess(req, res, 204, "No hay resultados ingresados");
        } else {
            // Combina los resultados de la publicación con los resultados de getPublicacion_resultados
            const publicacionResultados = { publicacion: Publicacion_resultados, resultados: resultado };
            respondSuccess(req, res, 201, publicacionResultados);
        }
    } catch (error) {
        handleError(error, "publicacion_resultados.controller -> createPublicacion_resultados");
        respondError(req, res, 500, "No se creo la publicacion de resultados");
    }
}
 */