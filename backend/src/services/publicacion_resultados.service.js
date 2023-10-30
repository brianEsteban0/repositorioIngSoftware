"use strict";

const Publicacion_resultados = require("../models/publicacion_resultados.model.js");
const {handleError} = require("../utils/errorHandler");

/**
 *
 *@returns
 */

async function getPublicacion_resultados(){
    try{
        const publicacion_resultados = await Publicacion_resultados.find().exec();
        if(!publicacion_resultados) return [null, "No se han encontrado publicaciones de resultados recientes"];

        return [publicacion_resultados, null];

    } catch (error){
        handleError(error, "publicacion_resultados.service -> getPublicacion_resultados");
    }
}

async function createPublicacion_resultados(publicacion_resultados) {
    try {
        const { Titulo, Descripcion, Organizacion, Representante, Rut_Representante} = publicacion_resultados;
        const publicacion_resultadosFound = await Publicacion_resultados.findOne({titulo: publicacion_resultados.titulo})
        if (publicacion_resultadosFound) return [null, "Publicacion de resultados ya existente"];

        const newPublicacion_resultados = new Publicacion_resultados({
            Titulo,
            Descripcion,
            Organizacion,
            Representante,
            Rut_Representante,
        });

        const publicaciones_resultados = await newPublicacion_resultados.save();
        return [publicaciones_resultados, null];
    } catch (error) {
        handleError(error, "publicacion_resultados.service -> createPublicacion_resultados");
    }
}

module.exports = {
    getPublicacion_resultados,
    createPublicacion_resultados,
};