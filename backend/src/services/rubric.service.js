const Rubric = require("../models/rubric.model.js");
const { handleError } = require("../utils/errorHandler");
const Publicaciones = require("../models/publicacion.model.js"); // Importa el modelo de postulaciones

/**
 * Obtiene todos las  de la base de datos
 * @returns {Promise} Promesa con el objeto de los usuarios
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
 * Crea un nuevo usuario en la base de datos
 * @param {Object} rubric Objeto de usuario
 * @returns {Promise} Promesa con el objeto de usuario creado
 */
async function createRubrics(rubric) {
  try {
    const {name, contestType, criteria} = rubric;

    const rubricFound = await Rubric.findOne({ name: rubric.name });
    if (rubricFound) return [null, "La rubrica ya existe"];


    const newRubric = new Rubric({
        name,
        contestType,
        criteria,
    });
    await newRubric.save();

    return [newRubric, null];
  } catch (error) {
    handleError(error, "rubric.service -> createRubric");
  }
}

/**
 * Obtiene un usuario por su id de la base de datos
 * @param {string} Id de la Rubrica
 * @returns {Promise} Promesa con el objeto de usuario
 */
async function getRubricById(id) {
  try {
    const rubric = await Rubric.findById({ _id: id })
      .exec();

    if (!rubric) return [null, "La rubrica no existe"];

    return [rubric, null];
  } catch (error) {
    handleError(error, "rubric.service -> getrubricById");
  }
}

/**
 * Actualiza un usuario por su id en la base de datos
 * @param {string} id Id del usuario
 * @param {Object} rubric Objeto de usuario
 * @returns {Promise} Promesa con el objeto de usuario actualizado
 */
async function updateRubric(id, rubric) {
  try {
    const rubricFound = await Rubric.findById(id);
    if (!rubricFound) return [null, "La rubrica no existe"];

    const { name, contestType, criteria } = rubric;

    const publicacion = await Publicaciones.findById(rubric.publicacion);
    if (!publicacion) return [null, "La publicacion no existe"];
    const { fecha_termino } = publicacion;

    const today = new Date();

    if (new Date(fecha_termino) > today) {
      return [null, "La fecha de termino debe ser menor a la fecha de hoy"];
    }

    const rubricUpdated = await Rubric.findByIdAndUpdate(
      id,
      {
        name,
        contestType,
        criteria,
      },
      { new: true },
    );

    return [rubricUpdated, null];
  } catch (error) {
    handleError(error, "rubric.service -> updateUser");
  }
}

/**
 * Elimina un usuario por su id de la base de datos
 * @param {string} id del usuario
 * @returns {Promise} Promesa con el objeto de usuario eliminado
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
