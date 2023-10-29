"use strict";

const Publicaciones = require("../models/publicacion.model");

const {handleError} = require("../utils/errorHandler");

/**
 * 
 *@returns 
 */

async function getPublicaciones(){
    try{
        const publicaciones = await Publicaciones.find().exec();
        if(!publicaciones) return [null, "No hay publicaciones"];

        return [publicaciones, null];

    } catch (error){
        handleError(error, "publicacion.service -> getPublicaciones");
    }
}

/**
 * 
 * 
 * 
 */

async function createPublicacion(publicaciones) {
    try {//
        const {titulo, descripcion, objetivo, fecha_inicio, fecha_termino, monto, cupos} = publicaciones;
        const publicacionFound = await Publicaciones.findOne({titulo: publicaciones.titulo})
        if (publicacionFound) return [null, "La publicacion ya existe"];

        const newPublicacion = new Publicaciones({
            titulo,
            descripcion,
            objetivo,
            fecha_inicio,
            fecha_termino,
            monto,
            cupos,
        });

        const myPublicacion = await newPublicacion.save();
        return [myPublicacion, null];
    } catch (error) {
        handleError(error, "publicacion.service -> createPublicacion");
    }
}


module.exports = {
    getPublicaciones,
    createPublicacion,
};