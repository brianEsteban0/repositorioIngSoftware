const Evaluacion = require('../models/puntajePost.model.js'); // Importa el modelo de evaluacion
const { handleError } = require("../utils/errorHandler");

/**
 * Obtiene todos las  de la base de datos
 * @returns {Promise} Promesa con el objeto de los usuarios
 */
async function getEvaluaciones() {
  try {
    const evaluacion = await Evaluacion.find().exec();
    if (!evaluacion) return [null, "No existen "];
    return [evaluacion, null];
    } catch (error) {
    handleError(error, "evaluacion.service -> getEvaluacion");
    }
}

/**
 * Crea un nuevo usuario en la base de datos
 * @param {Object} evaluacion Objeto de usuario
 * @param {Object} id Objeto de usuario
 * @returns {Promise} Promesa con el objeto de usuario creado
 */
async function createEvaluacion(evaluacion) {
  try {
    const {scores , scoretotal} = evaluacion;

    const evaluationFound = await Evaluacion.findOne({ _id: id });
    if (evaluationFound) return [null, "La evaluacion ya existe"];


    const newEvaluation = new Evaluacion({
        postulanteRut,
        rubric,
        publicacion,
        scores,
        scoretotal,
    });
    await newEvaluation.save();

    return [newEvaluation, null];
  } catch (error) {
    handleError(error, "evaluacion.service -> createEvaluacion");
  }
}

/**
 * Obtiene un postulante por el rut del representante
 * @param {string} id rut de  la organizacion
 * @returns {Promise} Promesa con el objeto de usuario
 */
async function getEvaluacionById(id ) {
  try {
    const evaluacion = await Evaluacion.findById({ postulanteRut: id }).exec();

    if (!evaluacion) return [null, "La evaluacion no existe"];

    return [evaluacion, null];
  } catch (error) {
    handleError(error, "evaluacion.service -> getevaluacionById");
  }
}

/**
 * Actualiza una evaluación por el id del postulante en la base de datos
 * @param {string} postulanteId Id del postulante
 * @param {Object} evaluacion Objeto de evaluación
 * @returns {Promise} Promesa con el objeto de evaluación actualizado
 */
async function updateEvaluacion(postulanteId, evaluacion) {
  try {
    const evaluacionFound = await Evaluacion.findOne({ postulanteRut: postulanteId });
    if (!evaluacionFound) return [null, "La evaluación no existe para este postulante"];

    const {postulanteRut,rubric,publicacion, scores, scoretotal } = evaluacion;

    const evaluacionUpdated = await Evaluacion.findOneAndUpdate(
      { postulanteRut: postulanteId },
      {
        postulanteRut,
        rubric,
        publicacion,
        scores,
        scoretotal,
      },
      { new: true },
    );

    return [evaluacionUpdated, null];
  } catch (error) {
    handleError(error, "evaluacion.service -> updateEvaluacionByPostulanteId");
  }
}


/**
 * Elimina un usuario por su id de la base de datos
 * @param {string} id del usuario
 * @returns {Promise} Promesa con el objeto de usuario eliminado
 */
async function deleteEvaluacion(id) {
  try {
    return await Evaluacion.findByIdAndDelete(id);
  } catch (error) {
    handleError(error, "evaluacion.service -> deleteEvaluacion");
  }
}

module.exports = {
    createEvaluacion,
    getEvaluaciones,
    getEvaluacionById,
    updateEvaluacion,
    deleteEvaluacion
};
