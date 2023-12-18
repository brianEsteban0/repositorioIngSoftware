/* eslint-disable max-len */
const EvaluacionService = require("../services/evaluacion.service.js");
const { respondSuccess, respondError } = require("../utils/resHandler");
const { handleError } = require("../utils/errorHandler");
const Evaluacion = require("../models/puntajePost.model.js");




async function getEvaluacion(req, res) {
  try {
    const [evaluacion, errorEvaluacion] = await EvaluacionService.getEvaluaciones();
    if (errorEvaluacion) return respondError(req, res, 404, errorEvaluacion);

    evaluacion.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, evaluacion);
  } catch (error) {
    handleError(error, "evaluacion.controller -> getEvaluacion");
    respondError(req, res, 400, error.message);
  }
}

/**
 * Crea un nuevo usuario
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function createEvaluacion(req, res) {
  try {
    const { body } = req;
    const [newEvaluacion, evaluacionError] = await EvaluacionService.createEvaluacion(body);

    if (evaluacionError) return respondError(req, res, 400, evaluacionError);
    if (!newEvaluacion) {
      return respondError(req, res, 400, "No se creo la rubric");
    }

    respondSuccess(req, res, 201, newEvaluacion);
  } catch (error) {
    handleError(error, "evaluacion.controller -> createEvaluaciones");
    respondError(req, res, 500, "No se creo la Evaluacion");
  }
}

/**
 * Obtiene un usuario por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getEvaluacionById(req, res) {
  try {
    const { params} = req;
    const [evaluacion, errorEvaluacion] = await EvaluacionService.getEvaluacionById(params.postulanteRut);

    if (errorEvaluacion) return respondError(req, res, 404, errorEvaluacion);

    respondSuccess(req, res, 200, evaluacion);
  } catch (error) {
    handleError(error, "evaluacion.controller -> getEvaluacionById");
    respondError(req, res, 500, "No se pudo obtener la evaluacion");
  }
}

/**
 * Actualiza un usuario por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function updateEvaluacion(req, res) {
  try {
    const { params, body } = req;
    const { scores } = body;

    for (const score of scores) {
      if (typeof score !== "number" || score < 0 || score > 100) {
        return respondError(
          req,
          res,
          400,
          "Los puntajes deben ser números en el rango de 0 a 100.",
        );
      }
    }

    const [evaluacion, errorEvaluacion] = await EvaluacionService.updateEvaluacion(params.postulanteRut, body);
    
    if (errorEvaluacion) return respondError(req, res, 400, errorEvaluacion);

    respondSuccess(req, res, 200, evaluacion);
  } catch (error) {
    handleError(error, "evaluacion.controller -> updateEvaluacion");
    respondError(req, res, 500, "No se pudo actualizar la evaluacion");
  }
}

/**
 * Elimina un usuario por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function deleteEvaluacion(req, res) {
  try {
    const {params} = req;
    const evaluacion = await EvaluacionService.deleteEvaluacion(params.postulanteRut);
    !evaluacion
      ? respondError(
          req,
          res,
          404,
          "No se encontro la rubrica solicitado",
          "Verifique el id ingresado",
        )
      : respondSuccess(req, res, 200, evaluacion);
  } catch (error) {
    handleError(error, "evaluacion.controller -> deleteEvaluacion");
    respondError(req, res, 500, "No se pudo eliminar la evaluacion");
  }
}

// eslint-disable-next-line require-jsdoc
async function getEvaluacionByPostulacion(req, res) {
  try {
    const { params } = req;
    const evaluacion = await Evaluacion.find({ publicacion: params.idpostulacion }).exec();


    respondSuccess(req, res, 200, evaluacion);
  } catch (error) {
    handleError(error, "evaluacion.controller -> getEvaluacionByPostulacion");
    respondError(req, res, 500, "No se pudo obtener la evaluacion");
  }
}

module.exports = {
  getEvaluacion,
  createEvaluacion,
  getEvaluacionById,
  updateEvaluacion,
  deleteEvaluacion,
  getEvaluacionByPostulacion,
};