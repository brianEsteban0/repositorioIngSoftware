const ResultadoService = require("../services/resultado.service.js");
const { respondSuccess, respondError } = require("../utils/resHandler");
const { handleError } = require("../utils/errorHandler");

async function getResultado(req, res) {
    try {
      const [resultado, errorResultado] = await ResultadoService.getResultado();
      if (errorResultado) return respondError(req, res, 404, errorResultado);

      resultado.length === 0
        ? respondSuccess(req, res, 204)
        : respondSuccess(req, res, 200, resultado);
    } catch (error) {
      handleError(error, "evaluacion.controller -> getResultado");
      respondError(req, res, 400, error.message);
    }
}

  /**
 * Crea un nuevo usuario
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function createResultado(req, res) {
    try {
      const { body } = req;
      const [newResultado, errorResultado] = await ResultadoService.createResultado(body);
  
      if (errorResultado) return respondError(req, res, 400, errorResultado);
      if (!newResultado) {
        return respondError(req, res, 400, "No se creo la rubric");
      }
  
      respondSuccess(req, res, 201, newResultado);
    } catch (error) {
      handleError(error, "resultado.controller -> createResultado");
      respondError(req, res, 500, "No se creo el Resultado");
    }
}
  async function getResultadoPostulacion(req, res) {
    try {
      const { params } = req;
      const [resultado, errorResultado] = await ResultadoService.getResultadoPostulacion(params.id);
  
      if (errorResultado) return respondError(req, res, 404, errorResultado);
  
      resultado.length === 0
        ? respondSuccess(req, res, 204)
        : respondSuccess(req, res, 200, resultado);
    } catch (error) {
      handleError(error, "evaluacion.controller -> getResultadoPostulacion");
      respondError(req, res, 400, error.message);
    }
}
/**
 * actualiza un resultado por id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function updateResultado(req, res) {
  try {
    const { params, body } = req;
    const [resultado, resultadoError] = await ResultadoService.updateResultado(params.id, body);
    
    if (resultadoError) return respondError(req, res, 400, resultadoError);

    respondSuccess(req, res, 200, resultado);
  } catch (error) {
    handleError(error, "resultado.controller -> updateResultado");
    respondError(req, res, 500, "No se pudo actualizar el resultado");
  }
}

/**
 * Elimina un resultado por id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function deleteResultado(req, res) {
  try {
    const { params } = req;
    const resultado = await ResultadoService.deleteResultado(params.id);
    !resultado
      ? respondError(
          req,
          res,
          404,
          "No se encontro el resultado solicitado",
          "Verifique el id ingresado",
        )
      : respondSuccess(req, res, 200, resultado);
  } catch (error) {
    handleError(error, "resultado.controller -> deleteResultado");
    respondError(req, res, 500, "No se pudo eliminar el Resultado");
  }
}

module.exports = {
    createResultado,
    getResultado,
    getResultadoPostulacion,
    updateResultado,
    deleteResultado,
};