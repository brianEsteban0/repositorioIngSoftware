"use strict";

const {respondSuccess, respondError } = require("../utils/resHandler")
const PublicacionService = require("../services/publicacion.service");
const { handleError } = require("../utils/errorHandler");
const Publicacion = require('../models/publicacion.model');

/**
 * Crea un nuevo usuario
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */

// funcion para mostrar la fecha en dd/mm/año
function formatDateToDDMMYYYY(date) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return date.toLocaleDateString('es-ES', options);
}

//funcion para obtener publicaciones
async function getPublicaciones(req, res) {
  try {
    const [publicaciones, errorPublicaciones] = await PublicacionService.getPublicaciones();

    if (errorPublicaciones) {
      return respondInternalError(req, res, 404, errorPublicaciones);
    }

    if (publicaciones.length === 0) {
      respondSuccess(req, res, 204); // No content
    } else {
      // formatea las fechas de las publicaciones
      const publicacionesFormateadas = publicaciones.map((publicacion) => {
        const fechaInicioFormateada = formatDateToDDMMYYYY(publicacion.fecha_inicio);
        const fechaTerminoFormateada = formatDateToDDMMYYYY(publicacion.fecha_termino);

        return {
          ...publicacion.toObject(),
          fecha_inicio: fechaInicioFormateada,
          fecha_termino: fechaTerminoFormateada,
        };
      });

      respondSuccess(req, res, 200, publicacionesFormateadas);
    }
  } catch (error) {
    handleError(error, "publicacion.controller -> getPublicaciones");
  }
}

//funcion para crear publicacion
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

  //funcion para editar publicacion
  async function updatePublicacion(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body; //nuevos datos de la pub
  
      // busca publicaciobn por id
      const publicacion = await Publicacion.findById(id);
  
      if (!publicacion) {
        return res.status(404).json({ message: 'Publicación no encontrada' });
      }
  
      //se actualiza la publicacion
      publicacion.set(updateData);
      const updatedPublicacion = await publicacion.save();
  
      return res.status(200).json(updatedPublicacion);
    } catch (error) {
      handleError(error, "publicacion.controller -> updatePublicacion");
      return res.status(500).json({ message: 'Error al actualizar la publicación' });
    }
  }

  //funcion para eliminar publicacion
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