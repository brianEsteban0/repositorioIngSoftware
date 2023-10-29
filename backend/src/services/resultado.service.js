const Resultado = require("../models/resultado.models.js");
const { handleError } = require("../utils/errorHandler");


/**
 * Obtiene todos las  de la base de datos
 * @returns {Promise} Promesa con el objeto de los usuarios
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
 * Crea un nuevo usuario en la base de datos
 * @param {Object} resultado Objeto de usuario
 * @param {Object} id Objeto de usuario
 * @returns {Promise} Promesa con el objeto de usuario creado
 */
async function createResultado(resultado) {
    try {
      const {id} = resultado;
  
      const resultadoFound = await Resultado.findOne({ _id: id });
      if (resultadoFound) return [null, "La evaluacion ya existe"];
  
  
      const newResultado = new Resultado({
          puntaje_total,
          ganador
      });
      await newResultado.save();
  
      return [newResultado, null];
    } catch (error) {
      handleError(error, "resultado.service -> createResultado");
    }
  }

module.exports = {
    createResultado,
    getResultado,
};
