"use strict";


const RubricService = require("../services/rubric.service.js");
const { respondSuccess, respondError } = require("../utils/resHandler");
const { handleError } = require("../utils/errorHandler");




async function getRubric(req, res) {
  try {
    const [rubricas, errorRubrics] = await RubricService.getRubrics();
    if (errorRubrics) return respondError(req, res, 404, errorRubrics);

    rubricas.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, rubricas);
  } catch (error) {
    handleError(error, "rubric.controller -> getRubrics");
    respondError(req, res, 400, error.message);
  }
}

/**
 * Crea un nuevo usuario
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function createRubric(req, res) {
  try {
    const { body } = req;   
    const [newRubric, rubricError] = await RubricService.createRubrics(body);

    if (rubricError) return respondError(req, res, 400, rubricError);
    if (!newRubric) {
      return respondError(req, res, 400, "No se creo la rubric");
    }

    respondSuccess(req, res, 201, newRubric);
  } catch (error) {
    handleError(error, "rubric.controller -> createRubric");
    respondError(req, res, 500, "No se creo la rubrica");
  }
}

/**
 * Obtiene un usuario por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getRubricById(req, res) {
  try {
    const { params} = req;
    const [rubric, errorRubric] = await RubricService.getRubricById(params.id);

    if (errorRubric) return respondError(req, res, 404, errorRubric);

    respondSuccess(req, res, 200, rubric);
  } catch (error) {
    handleError(error, "rubric.controller -> getrubricById");
    respondError(req, res, 500, "No se pudo obtener la rubrica");
  }
}

/**
 * Actualiza un usuario por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function updateRubric(req, res) {
  try {
    const { params, body } = req;
    const [rubric, rubricError] = await RubricService.updateRubric(params.id, body);
    
    if (rubricError) return respondError(req, res, 400, rubricError);

    respondSuccess(req, res, 200, rubric);
  } catch (error) {
    handleError(error, "rubric.controller -> updateRubric");
    respondError(req, res, 500, "No se pudo actualizar la rubrica");
  }
}

/**
 * Elimina un usuario por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function deleteRubric(req, res) {
  try {
    const { params} = req;
    const rubric = await RubricServiceService.deleteRubric(params.id);
    !rubric
      ? respondError(
          req,
          res,
          404,
          "No se encontro la rubrica solicitado",
          "Verifique el id ingresado",
        )
      : respondSuccess(req, res, 200, rubric);
  } catch (error) {
    handleError(error, "rubric.controller -> deleteRubric");
    respondError(req, res, 500, "No se pudo eliminar la Rubrica");
  }
}

module.exports = {
  getRubric,
  createRubric,
  getRubricById,
  updateRubric,
  deleteRubric,
};
