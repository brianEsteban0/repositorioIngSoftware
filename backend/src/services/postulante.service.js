"use strict";

const Postulante = require("../models/postulante.model.js"); // Asegúrate de importar el modelo correcto
const { handleError } = require("../utils/errorHandler");

/**
 * Obtiene todos los postulantes.
 * @returns
 */
async function getPostulantes() {
    try {
        const postulantes = await Postulante.find().exec();
        if (!postulantes) {
            return [null, "No hay postulantes"];
        }
        return [postulantes, null];

    } catch (error) {
        handleError(error, "postulante.service -> getPostulantes");
    }
}

/**
 * 
 * 
 */
async function createPostulantes(postulante) {
    try {
        const { Organizacion, descripcion, Ubicación, Representante, Rut_Representante, Rut_Organizacion, Telefono, Correo, publicacion } = postulante;
        const postulanteFound = await Postulante.findOne({ Rut_Representante: postulante.Rut_Representante });
        if (postulanteFound) return [null, "El postulante ya existe"];

        const newPostulante = new Postulante({
            Organizacion,
            descripcion,
            Ubicación,
            Representante,
            Rut_Representante,
            Rut_Organizacion,
            Telefono,
            Correo,
            publicacion,
        });

        const myPostulante = await newPostulante.save();
        return [myPostulante, null];
    } catch (error) {
        handleError(error, "postulante.service -> createPostulantes");
    }
}

async function getPostulantesByIdpostulacion(postId) {
    try {
      const postulantes = await Postulante.find({ publicacion: postId }).exec();
  
      if (!postulantes) return [null, "los postulantes no existen en esta publicacion"];
  
      return [rubric, null];
    } catch (error) {
      handleError(error, "postulante.service -> getPostulantesByIdpostulacion");
    }
  }
async function updatePostulantes(id, newData) {
    try {
      const postulante = await Postulante.findByIdAndUpdate(id, newData, { new: true });
  
      if (!postulante) {
        return [null, "Postulante no encontrado"];
      }
  
      return [postulante, null];
    } catch (error) {
      handleError(error, "postulante.service -> updatePostulante");
      return [null, "Error al actualizar el postulante"];
    }
}
  
async function deletePostulantes(id) {
    try {
      const postulante = await Postulante.findByIdAndRemove(id);
  
      if (!postulante) {
        return [null, "Postulante no encontrado"];
      }
  
      return [postulante, null];
      
    } catch (error) {
      handleError(error, "postulante.service -> deletePostulante");
      return [null, "Error al eliminar el postulante"];
    }
}

module.exports = {
    getPostulantes,
    createPostulantes,
    getPostulantesByIdpostulacion,
    updatePostulantes,
    deletePostulantes,
};
