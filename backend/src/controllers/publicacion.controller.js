/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable eol-last */
/* eslint-disable require-jsdoc */
"use strict";

const {respondSuccess, respondError } = require("../utils/resHandler")
const PublicacionService = require("../services/publicacion.service");
const { handleError } = require("../utils/errorHandler");
const Publicacion = require('../models/publicacion.model');
const { respondInternalError} = require("../utils/resHandler");

// Importa una librería para manejar fechas en formato 'dd/mm/aa'
const { parse } = require('date-fns');
/**
 * Crea un nuevo usuario
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */

// Función para mostrar la fecha en dd/mm/año
function formatDateToDDMMYYYY(date) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return date.toLocaleDateString('es-ES', options);
}

function validateFechas(fechaInicio, fechaTermino) {
  const fechaInicioParsed = new Date(fechaInicio);
  const fechaTerminoParsed = new Date(fechaTermino);
  return fechaInicioParsed <= fechaTerminoParsed;
}

// funcion para obtener publicaciones
async function getPublicaciones(req, res) {
  try {
    const currentDate = new Date(); // obtiene fecha actual

    const publicaciones = await Publicacion.find()
      .sort({ fecha_termino: 1 }) // lista las fechas mas cercanas a terminar segun la rubrica
      .exec();

    if (publicaciones.length === 0) {
      respondSuccess(req, res, 204); // No Content
    } else {
      // sigue las fechas de dd/mm/año
      const publicacionesFormateadas = publicaciones.map((publicacion) => {
        const fechaInicioFormateada = formatDateToDDMMYYYY(publicacion.fecha_inicio);
        const fechaTermino = publicacion.fecha_termino;
        const fechaTerminoFormateada = formatDateToDDMMYYYY(fechaTermino);

        if (fechaTermino < currentDate) {
          // muestra plazo vencido si la fecha de termino es menor a la fecha actual
          return {
            ...publicacion.toObject(),
            fecha_inicio: fechaInicioFormateada,
            fecha_termino: "Plazo vencido",
          };
        } else {
          return {
            ...publicacion.toObject(),
            fecha_inicio: fechaInicioFormateada,
            fecha_termino: fechaTerminoFormateada,
          };
        }
      });

      respondSuccess(req, res, 200, publicacionesFormateadas);
    }
  } catch (error) {
    handleError(error, "publicacion.controller -> getPublicaciones");
  }
}

// Función para crear la publicación
async function createPublicacion(req, res) {
  try {
    const { body } = req;

    // Formatea las fechas al formato adecuado
    const fechaInicio = formatDateToDDMMYYYY(new Date(body.fecha_inicio));
    const fechaTermino = formatDateToDDMMYYYY(new Date(body.fecha_termino));

    // Valida que la fecha de inicio no sea mayor que la fecha de termino
    if (!validateFechas(fechaInicio, fechaTermino)) {
      // Avisa al usuario por mensaje del error
      return respondError(req, res, 400, "La fecha de inicio no puede ser mayor que la fecha de termino");
    }

    // Aquí continúa con la creación de la publicación

    const publicacion = {
      ...body,
      fecha_inicio: fechaInicio,
      fecha_termino: fechaTermino,
    };

    const [publicaciones, errorPublicaciones] = await PublicacionService.createPublicacion(publicacion);

    if (errorPublicaciones) {
      return respondInternalError(req, res, 404, errorPublicaciones);
    }

    if (!publicaciones) {
      return respondError(req, res, 400, "No se creó la publicación");
    }

    respondSuccess(req, res, 201, publicaciones);
  } catch (error) {
    handleError(error, "publicacion.controller -> createPublicacion");
    respondError(req, res, 500, "No se creó la publicación");
  }
}


  // funcion para editar publicacion
  async function updatePublicacion(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body; // nuevos datos de la pub
  
      // busca publicaciobn por id
      const publicacion = await Publicacion.findById(id);
  
      if (!publicacion) {
        return res.status(404).json({ message: 'Publicación no encontrada' });
      }
  
      // se actualiza la publicacion
      publicacion.set(updateData);
      const updatedPublicacion = await publicacion.save();
  
      return res.status(200).json(updatedPublicacion);
    } catch (error) {
      handleError(error, "publicacion.controller -> updatePublicacion");
      return res.status(500).json({ message: 'Error al actualizar la publicación' });
    }
  }

  // eslint-disable-next-line spaced-comment
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

  async function getPublicacionById(req, res) {
    try {
      const { id } = req.params; // Obtén el ID de la URL
  
      // Busca la publicación por ID
      const publicacion = await Publicacion.findById(id);
  
      if (!publicacion) {
        return res.status(404).json({ message: 'Publicación no encontrada' });
      }
  
      return res.status(200).json(publicacion);
    } catch (error) {
      handleError(error, "publicacion.controller -> getPublicacionById");
      return res.status(500).json({ message: 'Error al obtener la publicación' });
    }
  }

module.exports = {
    getPublicaciones,
    createPublicacion,
    updatePublicacion,
    deletePublicacion,
    getPublicacionById,
  };