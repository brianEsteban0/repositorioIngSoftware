"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const Publicacion_resultados_service = require("../services/publicacion_resultados.service.js");
const { handleError } = require("../utils/errorHandler");
const Publicacion_resultados = require('../models/publicacion_resultados.model');
const { respondInternalError } = require("../utils/resHandler");

// Obtiene una publicación de resultados
async function getPublicacion_resultados(req, res) {
    try {
        const publicacioResultado = await Publicacion_resultados.find().exec();

        if (!publicacioResultado || publicacioResultado.length === 0) {
            respondSuccess(req, res, 204, "No hay publicaciones de resultados disponibles");
        } else {
            respondSuccess(req, res, 200, publicacioResultado);
        }
    } catch (error) {
        handleError(error, "publicacion_resultados.controller -> getPublicacion_resultados");
        respondError(req, res, 500, "Error al obtener las publicaciones de resultados");
    }
}

// Crea una publicación de resultados
async function createPublicacion_resultados(req, res) {
    try {
        const { body } = req;

        // Crea una nueva instancia de Publicacion_resultados utilizando los datos del cuerpo de la solicitud
        const nuevaPublicacion_resultado = new Publicacion_resultados(body);

        // Guarda la nueva publicación en la base de datos
        const publicacionResultadoCreada = await nuevaPublicacion_resultado.save();

        respondSuccess(req, res, 201, publicacionResultadoCreada);
    } catch (error) {
        handleError(error, "publicacion_resultados.controller -> createPublicacion_resultados");
        respondError(req, res, 500, "Error al crear la publicación de resultados");
    }
}

// Actualiza una publicación de resultados
async function updatePublicacion_resultados(req, res) {
    try {
        const { id } = req.params;
        const updatePresults = req.body; // Los nuevos datos de la publicación

        // Busca la publicación por ID
        const publicacion_resultados = await Publicacion_resultados.findByIdAndUpdate(id, updatePresults, { new: true });

        if (!publicacion_resultados) {
            return respondError(req, res, 404, "Publicación no encontrada, intente nuevamente");
        }

        respondSuccess(req, res, 200, publicacion_resultados);
    } catch (error) {
        handleError(error, "publicacion_resultados.controller -> updatePublicacion_resultados");
        respondError(req, res, 500, "Error al actualizar la publicación, intente nuevamente");
    }
}

async function getPublicacion_resultadosById(req, res) {
    try {
        const { id } = req.params; // Obtén el ID de la URL

        // Busca la publicación por ID
        const publicacion_resultados = await Publicacion_resultados.findById(id);

        if (!publicacion_resultados) {
            return res.status(404).json({ message: 'Publicación no encontrada' });
        }

        return res.status(200).json(publicacion_resultados);
    } catch (error) {
        handleError(error, "publicacion_resultados.controller -> getPublicacion_resultadosById");
        return res.status(500).json({ message: 'Error al obtener la publicación' });
    }
}

// Elimina una publicación de resultados
async function deletePublicacion_resultados(req, res) {
    try {
        const { id } = req.params;

        // Busca la publicación por ID y la elimina
        const deletedPublicacion_resultados = await Publicacion_resultados.findByIdAndRemove(id);

        if (!deletedPublicacion_resultados) {
            return respondError(req, res, 404, "Publicación no encontrada, no se pudo eliminar, intente nuevamente");
        }

        respondSuccess(req, res, 204, "Publicación eliminada correctamente");
    } catch (error) {
        handleError(error, "publicacion_resultados.controller -> deletePublicacion_resultados");
        respondError(req, res, 500, "Error al eliminar la publicación, intente nuevamente");
    }
}

module.exports = {
    getPublicacion_resultados,
    createPublicacion_resultados,
    updatePublicacion_resultados,
    deletePublicacion_resultados,
    getPublicacion_resultadosById,
};


