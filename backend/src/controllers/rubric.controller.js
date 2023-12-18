/* eslint-disable require-jsdoc */
"use strict";

const RubricService = require("../services/rubric.service.js");
const { respondSuccess, respondError } = require("../utils/resHandler");
const { handleError } = require("../utils/errorHandler");
const Rubrica = require("../models/rubric.model.js");

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
    const { name, contestType, criteria } = body;

    if (typeof name !== "string" || name.length < 4 || name.length > 20) {
      return respondError(
        req,
        res,
        400,
        "Verificar largo del titulo (min 4 max 20 caracteres).",
      );
    }

    const regexTitulo = /^(?=.*[a-zA-Z])[a-zA-Z\d\s!#-¿?]+$/;

    if (!regexTitulo.test(name)) {
      return respondError(
        req,
        res,
        400,
        "El titulo debe contener al menos una letra",
      );
    }

    if (
      typeof contestType !== "string" ||
      contestType.length < 2 ||
      contestType.length > 50
    ) {
      return respondError(
        req,
        res,
        400,
        "Verificar largo de la descripcion (min 2 max 50 caracteres).",
      );
    }
    const regexDescripcion = /^(?=.*[a-zA-Z])[a-zA-Z\d\s!@#$%^&*.,?]+$/;
    if (!regexDescripcion.test(contestType)) {
      return respondError(req, res, 400, "Debe contener al menos una letra.");
    }

    let isValidCriteria = true;
    const regexObjetivo = /^(?=.*[a-zA-Z])[a-zA-Z\d\s!@#$%^&*.,?]+$/;
    for (const item of criteria) {
      if (!regexObjetivo.test(item.name)) {
        return respondError(
          req,
          res,
          400,
          "El Criterio debe contener al menos una letra.",
        );
      }
      if (
        typeof item.name !== "string" ||
        item.name.length < 3 ||
        item.name.length > 300
      ) {
        isValidCriteria = false;
        break; // Stop the loop as soon as an invalid criterion is found
      }
    }

    if (!isValidCriteria || criteria.length < 1 || criteria.length > 60) {
      return respondError(
        req,
        res,
        400,
        "minimo 1 criterio.",
      );
    }

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
    const { params } = req;
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
    const { name, contestType, criteria } = body;

    if (typeof name !== "string" || name.length < 4 || name.length > 20) {
      return respondError(
        req,
        res,
        400,
        "Verificar largo del titulo (min 4 max 20 caracteres).",
      );
    }

    const regexTitulo = /^(?=.*[a-zA-Z])[a-zA-Z\d\s!#-¿?]+$/;

    if (!regexTitulo.test(name)) {
      return respondError(
        req,
        res,
        400,
        "El titulo debe contener al menos una letra",
      );
    }

    if (
      typeof contestType !== "string" ||
      contestType.length < 2 ||
      contestType.length > 50
    ) {
      return respondError(
        req,
        res,
        400,
        "Verificar largo de la descripcion (min 2 max 50 caracteres).",
      );
    }
    const regexDescripcion = /^(?=.*[a-zA-Z])[a-zA-Z\d\s!@#$%^&*.,?]+$/;
    if (!regexDescripcion.test(contestType)) {
      return respondError(req, res, 400, "Debe contener al menos una letra.");
    }

    let isValidCriteria = true;
    const regexObjetivo = /^(?=.*[a-zA-Z])[a-zA-Z\d\s!@#$%^&*.,?]+$/;
    for (const item of criteria) {
      if (!regexObjetivo.test(item.name)) {
        return respondError(
          req,
          res,
          400,
          "El Criterio debe contener al menos una letra.",
        );
      }
      if (
        typeof item.name !== "string" ||
        item.name.length < 3 ||
        item.name.length > 300
      ) {
        isValidCriteria = false;
        break; // Stop the loop as soon as an invalid criterion is found
      }
    }

    if (!isValidCriteria || criteria.length < 1 || criteria.length > 60) {
      return respondError(
        req,
        res,
        400,
        "minimo 1 criterio.",
      );
    }


    const [rubric, rubricError] = await RubricService.updateRubric(
      params.id,
      body,
    );

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
    const { params } = req;
    const rubric = await RubricService.deleteRubric(params.id);
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

async function getRubricByPublicacionId(req, res) {
  try {
    const { params } = req;
    const rubric = await Rubrica.findOne({ publicacion: params.id });

    respondSuccess(req, res, 200, rubric);
  } catch (error) {
    handleError(error, "rubric.controller -> getrubricById");
    respondError(req, res, 500, "No se pudo obtener la rubrica");
  }
}

module.exports = {
  getRubric,
  createRubric,
  getRubricById,
  updateRubric,
  deleteRubric,
  getRubricByPublicacionId,
};
