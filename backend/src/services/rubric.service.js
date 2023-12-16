const Rubric = require("../models/rubric.model.js");
const { handleError } = require("../utils/errorHandler");

/**
 * Obtiene todos las rubricas de la base de datos
 * @returns {Promise} Promesa con el objeto 
 */
async function getRubrics() {
  try {
    const rubrics = await Rubric.find()
        .exec();
    if (!rubrics) return [null, "No existen Rubricas"];
    return [rubrics, null];
    } catch (error) {
    handleError(error, "rubric.service -> getRubric");
    }
}

/**
 * Crea una nueva rubrica en la base de datos
 * @param {Object} rubric Objeto de usuario
 * @returns {Promise} Promesa con el objeto de usuario creado
 */
async function createRubrics(rubric) {
  try {
    const {name, contestType, criteria, publicacion} = rubric;

    const rubricFound = await Rubric.findOne({ name: rubric.name });
    if (rubricFound) return [null, "La rubrica ya existe"];


    const newRubric = new Rubric({
        name,
        contestType,
        criteria,
        publicacion,
    });
    await newRubric.save();

    return [newRubric, null];
  } catch (error) {
    handleError(error, "rubric.service -> createRubric");
  }
}


/**
 * Obtiene una rúbrica por el ID de una publicación de la base de datos
 * @param {string} id - ID de la rubrica
 * @returns {Promise} Promesa con el objeto de la rúbrica
 */
async function getRubricById(id) {
  try {
    const rubric = await Rubric.findById(id).exec();

    if (!rubric) return [null, "La rubrica no existe "];

    return [rubric, null];
  } catch (error) {
    handleError(error, "rubric.service -> getRubricById");
  }
}

/**
 * Actualiza una rubrica por su id en la base de datos
 * @param {string} id de la rubrica
 * @param {Object} rubric Objeto de rubric
 * @returns {Promise} Promesa con el objeto de rubrica actualizada
 */
async function updateRubric(id, rubric) {
  try {
    const rubricFound = await Rubric.findById(id);
    if (!rubricFound) return [null, "La rubrica no existe"];

    const { name, contestType, criteria, publicacion } = rubric;

    

    const rubricUpdated = await Rubric.findByIdAndUpdate(
      id,
      {
        name,
        contestType,
        criteria,
        publicacion,
      },
      { new: true },
    );

    return [rubricUpdated, null];
  } catch (error) {
    handleError(error, "rubric.service -> updateUser");
  }
}

/**
 * Elimina una rubrica por el id de la publicacion
 * @param {string} id de la publicacion
 * @returns {Promise} Promesa con el objeto eliminado
 */
async function deleteRubric(id) {
  try {
    return await Rubric.findByIdAndDelete(id);
  } catch (error) {
    handleError(error, "rubric.service -> deleteRubric");
  }
}

module.exports = {
  getRubrics,
  createRubrics,
  getRubricById,
  updateRubric,
  deleteRubric,
};
