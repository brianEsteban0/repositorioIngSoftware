/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable eol-last */
/* eslint-disable require-jsdoc */
"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const PublicacionService = require("../services/publicacion.service");
const { handleError } = require("../utils/errorHandler");
const Publicacion = require('../models/publicacion.model');
const { respondInternalError } = require("../utils/resHandler");

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

    // Aquí continúa con la creación de la publicación sin formatear las fechas

    const {
      titulo,
      descripcion,
      objetivo,
      fecha_inicio,
      fecha_termino,
      monto,
      cupos
    } = body;
    
    //validaciones titulo
    if (typeof titulo !== "string" || titulo.length < 10 || titulo.length > 70) {
      return respondError(req, res, 400, "Verificar largo del titulo (min 10 max 70 caracteres).");
    }

    const regexTitulo = /^(?=.*[a-zA-Z])[a-zA-Z\d\s!@#-]+$/;
    
    if (!regexTitulo.test(titulo)) {
      return respondError(req, res, 400, "El titulo debe al menos una letra y los siguientes simbolos: ! @ # -");
    }
    //validaciones descripcion
    if (typeof descripcion !== "string" || descripcion.length < 2 || descripcion.length > 600) {
      return respondError(req, res, 400, "Verificar largo de la descripcion (min 1 max 600 caracteres).");
    }
    const regexDescripcion = /^(?=.*[a-zA-Z])[a-zA-Z\d\s!@#$%^&*.,?]+$/;
    if (!regexDescripcion.test(descripcion)) {
      return respondError(req, res, 400, "La descripción debe contener al menos una letra.");
    }
    //validaciones objetivo
    if (typeof objetivo !== "string" || objetivo.length < 2 || objetivo.length > 600) {
      return respondError(req, res, 400, "Verificar largo del  objetivo (min 1 max 600 caracteres).");
    }
    const regexObjetivo = /^(?=.*[a-zA-Z])[a-zA-Z\d\s!@#$%^&*.,?]+$/;
    if (!regexObjetivo.test(objetivo)) {
      return respondError(req, res, 400, "El objetivo debe contener al menos una letra.");
    }
    //validaciones fecha_inicio
    const currentDate = new Date(); // Fecha actual
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 150); // 150 años desde la fecha actual

    const parsedFechaInicio = new Date(fecha_inicio);
    const parsedFechaTermino = new Date(fecha_termino);

    // Validar la fecha de inicio
    if (
      parsedFechaInicio < currentDate || // La fecha de inicio no puede ser menor que la fecha actual
      parsedFechaInicio > parsedFechaTermino || // La fecha de inicio no puede ser mayor que la fecha de término
      parsedFechaInicio > maxDate // El año no puede ser mayor a la fecha actual + 150 años
    ) {
      if (parsedFechaInicio < currentDate) {
        return respondError(req, res, 400, "La fecha de inicio no puede ser menor que la fecha actual");
      } else if (parsedFechaInicio > parsedFechaTermino) {
        return respondError(req, res, 400, "La fecha de inicio no puede ser mayor que la fecha de término");
      } else {
        return respondError(req, res, 400, "El año ingresado no puede ser mayor a 150 años desde la fecha actual");
      }
    }
    if (
      parsedFechaTermino <= parsedFechaInicio || // La fecha de término no puede ser menor o igual que la fecha de inicio
      parsedFechaTermino > maxDate // No puede exceder 250 años desde la fecha actual
    ) {
      if (parsedFechaTermino <= parsedFechaInicio) {
        return respondError(req, res, 400, "La fecha de término debe ser posterior a la fecha de inicio");
      } else {
        return respondError(req, res, 400, "La fecha de término no puede exceder los 250 años desde la fecha actual");
      }
    }
    //validaciones monto
    const parsedMonto = parseInt(monto, 10); // Parsear a número entero

    if (
      isNaN(parsedMonto) || // Verificar si no es un número
      parsedMonto <= 0 || // No puede ser negativo o igual a 0
      parsedMonto !== parseFloat(monto) ||
      parsedMonto > 999999999 // No puede exceder los 999.999.999
    ) {
      if (isNaN(parsedMonto)) {
        return respondError(req, res, 400, "El monto debe ser un número válido");
      } else if (parsedMonto <= 0) {
        return respondError(req, res, 400, "El monto no puede ser negativo o igual a 0");
      } else if (isNaN(parsedMonto) || parsedMonto !== parseFloat(monto)) {
        return respondError(req, res, 400, "El monto deben ser un número entero válido");
      } else {
        return respondError(req, res, 400, "El monto no puede exceder los 999.999.999");
      }
    }
    //validaciones cupos
    const parsedCupos = parseInt(cupos, 10); // Parsear a número entero

    if (
      isNaN(parsedCupos) || // Verificar si no es un número
      parsedCupos !== parseFloat(cupos) ||
      parsedCupos <= 10 || // No puede ser menor o igual a 10
      parsedCupos > 100000 // No puede exceder los 100,000
    ) {
      if (isNaN(parsedCupos) || parsedCupos !== parseFloat(cupos)) {
        return respondError(req, res, 400, "Los cupos deben ser un número entero válido");
      } else if (parsedCupos < 0) {
        return respondError(req, res, 400, "Los cupos no pueden ser valores negativos");
      } else if (parsedCupos <= 10) {
        return respondError(req, res, 400, "Los cupos no pueden ser menores o iguales a 10");
      } else {
        return respondError(req, res, 400, "Los cupos no pueden exceder los 100,000");
      }
    }

    const publicacion = {
      titulo,
      descripcion,
      objetivo,
      fecha_inicio,
      fecha_termino,
      monto,
      cupos
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

module.exports = { createPublicacion };


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
      const {
        titulo,
        descripcion,
        objetivo,
        fecha_inicio,
        fecha_termino,
        monto,
        cupos
      } = updateData;

      //validaciones titulo
    if (typeof titulo !== "string" || titulo.length < 10 || titulo.length > 70) {
      return respondError(req, res, 400, "Verificar largo del titulo (min 10 max 70 caracteres).");
    }

    const regexTitulo = /^[a-zA-Z\d\s-!@]+$/;
    
    if (!regexTitulo.test(titulo)) {
      return respondError(req, res, 400, "Revisar que el titulo no contenga simbolos.");
    }
    //validaciones descripcion
    if (typeof descripcion !== "string" || descripcion.length < 2 || descripcion.length > 600) {
      return respondError(req, res, 400, "Verificar largo de la descripcion (min 1 max 600 caracteres).");
    }
    const regexDescripcion = /^(?=.*[a-zA-Z])[a-zA-Z\d\s!@#$%^&*.,?]+$/;
    if (!regexDescripcion.test(descripcion)) {
      return respondError(req, res, 400, "La descripción debe contener al menos una letra.");
    }
    //validaciones objetivo
    if (typeof objetivo !== "string" || objetivo.length < 2 || objetivo.length > 600) {
      return respondError(req, res, 400, "Verificar largo del  objetivo (min 1 max 600 caracteres).");
    }
    const regexObjetivo = /^(?=.*[a-zA-Z])[a-zA-Z\d\s!@#$%^&*.,?]+$/;
    if (!regexObjetivo.test(objetivo)) {
      return respondError(req, res, 400, "El objetivo debe contener al menos una letra.");
    }
    //validaciones fecha_inicio
    const currentDate = new Date(); // Fecha actual
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 150); // 150 años desde la fecha actual

    const parsedFechaInicio = new Date(fecha_inicio);
    const parsedFechaTermino = new Date(fecha_termino);

    // Validar la fecha de inicio
    if (
      parsedFechaInicio < currentDate || // La fecha de inicio no puede ser menor que la fecha actual
      parsedFechaInicio > parsedFechaTermino || // La fecha de inicio no puede ser mayor que la fecha de término
      parsedFechaInicio > maxDate // El año no puede ser mayor a la fecha actual + 150 años
    ) {
      if (parsedFechaInicio < currentDate) {
        return respondError(req, res, 400, "La fecha de inicio no puede ser menor que la fecha actual");
      } else if (parsedFechaInicio > parsedFechaTermino) {
        return respondError(req, res, 400, "La fecha de inicio no puede ser mayor que la fecha de término");
      } else {
        return respondError(req, res, 400, "El año ingresado no puede ser mayor a 150 años desde la fecha actual");
      }
    }
    if (
      parsedFechaTermino <= parsedFechaInicio || // La fecha de término no puede ser menor o igual que la fecha de inicio
      parsedFechaTermino > maxDate // No puede exceder 250 años desde la fecha actual
    ) {
      if (parsedFechaTermino <= parsedFechaInicio) {
        return respondError(req, res, 400, "La fecha de término debe ser posterior a la fecha de inicio");
      } else {
        return respondError(req, res, 400, "La fecha de término no puede exceder los 250 años desde la fecha actual");
      }
    }
    //validaciones monto
    const parsedMonto = parseInt(monto, 10); // Parsear a número entero

    if (
      isNaN(parsedMonto) || // Verificar si no es un número
      parsedMonto <= 0 || // No puede ser negativo o igual a 0
      parsedMonto !== parseFloat(monto) ||
      parsedMonto > 999999999 // No puede exceder los 999.999.999
    ) {
      if (isNaN(parsedMonto)) {
        return respondError(req, res, 400, "El monto debe ser un número válido");
      } else if (parsedMonto <= 0) {
        return respondError(req, res, 400, "El monto no puede ser negativo o igual a 0");
      } else if (isNaN(parsedMonto) || parsedMonto !== parseFloat(monto)) {
        return respondError(req, res, 400, "El monto deben ser un número entero válido");
      } else {
        return respondError(req, res, 400, "El monto no puede exceder los 999.999.999");
      }
    }
    //validaciones cupos
    const parsedCupos = parseInt(cupos, 10); // Parsear a número entero

    if (
      isNaN(parsedCupos) || // Verificar si no es un número
      parsedCupos !== parseFloat(cupos) ||
      parsedCupos <= 10 || // No puede ser menor o igual a 10
      parsedCupos > 100000 // No puede exceder los 100,000
    ) {
      if (isNaN(parsedCupos) || parsedCupos !== parseFloat(cupos)) {
        return respondError(req, res, 400, "Los cupos deben ser un número entero válido");
      } else if (parsedCupos < 0) {
        return respondError(req, res, 400, "Los cupos no pueden ser valores negativos");
      } else if (parsedCupos <= 10) {
        return respondError(req, res, 400, "Los cupos no pueden ser menores o iguales a 10");
      } else {
        return respondError(req, res, 400, "Los cupos no pueden exceder los 100,000");
      }
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