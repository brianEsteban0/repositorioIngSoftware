const Resultado = require("../models/resultado.models.js");
const { handleError } = require("../utils/errorHandler");


/**
 * Obtiene todos los resultados de la base de datos
 * @returns {Promise} Promesa con el objeto
 */
async function getResultado() {
    try {
        const resultado = await Resultado.find().exec();
        if (!resultado) return [null, "No existen "];
        return [resultado, null];
        } catch (error) {
        handleError(error, "resultado.service -> getResultado");
        }
}

/**
 * Crea un nuevo resultado en la base de datos
 * @param {Object} resultado Objeto 
 * @param {Object} id Objeto 
 * @returns {Promise} Promesa con el objeto 
 */
async function createResultado(resultado) {
    try {
      const {id} = resultado;
      const resultadoFound = await Resultado.findOne({ _id: id });
      if (resultadoFound) return [null, "La evaluacion ya existe"];
      if(!(estadoEvaluacion == "Pendiente" || estadoEvaluacion == "Finalizada" || estadoEvaluacion == "Revision")) return [null, "estado no aceptado por el sistema"];
      const newResultado = new Resultado({
        postulacion,
        postulante,
        rubrica,
        puntaje_total,
        ganador,
        estadoEvaluacion,
      });
      await newResultado.save();
      return [newResultado, null];
    } catch (error) {
      handleError(error, "resultado.service -> createResultado");
    }
}
/**
 * Obtener el resultado de una publicacion a travez de su id
 * @param {Object} resultadoFound Objeto de resultado
 * @param {Object} postId Objeto de publicacion
 * @returns {Promise} Promesa con el objeto 
 */
async function getResultadoPostulacion(postId) {
    try {
      const resultadoFound = await Resultado.find({ publicacion: postId }).exec();
      if (!resultadoFound) return [null, "los postulantes aun no tienen su resultado"];
      return [resultadoFound, null];
    } catch (error) {
      handleError(error, "resultado.service -> getResultadoPostulacion");
    }
}

/**
 * Actualiza un resultado por id
 * @param {string} id del resultado
 * @param {Object} resultado Objeto 
 * @returns {Promise} Promesa con el objeto
 */
async function updateResultado(id, resultado) {
  try {
    const resultadoFound = await Resultado.findById({ _id: id });
    if (!resultadoFound) return [null, "El resultado no existe"];

    const { postulacion, postulante, rubrica ,puntaje_total ,ganador, estadoEvaluacion } = resultado;

    if(!(estadoEvaluacion == "Pendiente" || estadoEvaluacion == "Finalizada" || estadoEvaluacion == "Revision")) return [null, "estado no aceptado por el sistema"];

    const resultadoUpdated = await Resultado.findByIdAndUpdate(
      id,
      {
        postulacion,
        postulante,
        rubrica,
        puntaje_total,
        ganador,
        estadoEvaluacion,
      },
      { new: true },
    );

    return [resultadoUpdated, null];
  } catch (error) {
    handleError(error, "resultado.service -> updateResultado");
  }
}

/**
 * Elimina un resultado por el id
 * @param {string} id de resultado
 * @returns {Promise} Promesa con el objeto
 */
async function deleteResultado(id) {
  try {
    return await Resultado.findByIdAndDelete({ _id: id });
  } catch (error) {
    handleError(error, "resultado.service -> deleteResultado");
  }
}
module.exports = {
    createResultado,
    getResultado,
    getResultadoPostulacion,
    updateResultado,
    deleteResultado,
};
