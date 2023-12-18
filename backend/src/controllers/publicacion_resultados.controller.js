/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable eol-last */
/* eslint-disable require-jsdoc */
"use strict";

const { respondSuccess, respondError, respondInternalError } = require("../utils/resHandler");
const Publicacion_resultados_service = require("../services/publicacion_resultados.service.js");
const { handleError } = require("../utils/errorHandler");
const Publicacion_resultados = require('../models/publicacion_resultados.model');

// Obtiene una publicación de resultados
async function getPublicacion_resultados(req, res) {
    try {
        const publicacioResultado = await Publicacion_resultados.find().exec();

        if (!publicacioResultado || publicacioResultado.length === 0) {
            respondSuccess(req, res, 204, "No hay publicaciones de resultados disponibles");
        } else {
            respondSuccess(req, res, 200, publicacioResultado);
        }
    } catch (error) {
        handleError(error, "publicacion_resultados.controller -> getPublicacion_resultados");
        respondError(req, res, 500, "Error al obtener las publicaciones de resultados");
    }
}

// Crea una publicación de resultados
async function createPublicacion_resultados(req, res) {
    try {
        const { body } = req;

        const {
            Titulo,
            Descripcion,
            Organizacion,
            Representante,
            Resultado,
        } = body;

        // Validaciones de los campos
        if (typeof Titulo !== "string" || Titulo.length < 3 || Titulo.length > 70) {
            return respondError(req, res, 400, "Verificar largo del titulo (min 10 max 70 caracteres).");
        }
        const regexTitulo = /^(?=.*[a-zA-Z])[a-zA-Z\d\s!@#-]+$/;
        if (!regexTitulo.test(Titulo)) {
            return respondError(req, res, 400, "El titulo debe tener al menos una letra y permite los siguientes simbolos: ! @ # -");
        }

        if (typeof Descripcion !== "string" || Descripcion.length < 2 || Descripcion.length > 750) {
            return respondError(req, res, 400, "Verificar largo de la descripcion (min 2 max 750 caracteres).");
        }
        const regexDescripcion = /^(?=.*[a-zA-Z])[a-zA-Z\d\s!@#$%^&*.,?]+$/;
        if (!regexDescripcion.test(Descripcion)) {
            return respondError(req, res, 400, "La descripción no puede quedar en Blanco.");
        }

        if (typeof Organizacion !== "string" || Organizacion.length < 2 || Organizacion.length > 70) {
            return respondError(req, res, 400, "Verificar largo de la Organizacion (min 1 max 70 caracteres).");
        }
        const regexOrganizacion = /^(?=.*[a-zA-Z])[a-zA-Z\d\s!@#$%^&*.,?]+$/;
        if (!regexOrganizacion.test(Organizacion)) {
            return respondError(req, res, 400, "El campo de Organizacion es obligatorio.");
        }

        if (typeof Representante !== "string" || Representante.length < 2 || Representante.length > 70) {
            return respondError(req, res, 400, "Verificar largo del Representante (min 1 max 70 caracteres).");
        }
        const regexRepresentante = /^[a-zA-ZñÑ\s]+$/;
        if (!regexRepresentante.test(Representante)) {
            return respondError(req, res, 400, "El campo del Representante es obligatorio.");
        }

        const regexResultado = /^(Beneficiario|No Beneficiario)$/;

        if (!regexResultado.test(Resultado)) {
            return respondError(req, res, 400, "El Resultado solo acepta 'Beneficiario' o 'No Beneficiario'.");
        }

        const publicacion = {
            Titulo,
            Descripcion,
            Organizacion,
            Representante,
            Resultado,
        };

        // Crea una nueva instancia de Publicacion_resultados utilizando los datos del cuerpo de la solicitud
        const [publicaciones, errorPublicaciones] = await Publicacion_resultados(publicacion);

        if (errorPublicaciones) {
            return respondInternalError(req, res, 404, errorPublicaciones);
        }

        if (!publicaciones) {
            return respondError(req, res, 400, "No se creó la publicación");
        }

        respondSuccess(req, res, 201, publicaciones);
    } catch (error) {
        handleError(error, "publicacion_resultados.controller -> createPublicacion_resultados");
        respondError(req, res, 500, "No se creó la publicación");
    }
}

// Actualiza una publicación de resultados
async function updatePublicacion_resultados(req, res) {
    try {
        const { id } = req.params;
        const updatePresults = req.body; // Los nuevos datos de la publicación

        // Busca la publicación por ID
        const publicacion_resultados = await Publicacion_resultados.findByIdAndUpdate(id);

        if (!publicacion_resultados) {
            return res.status(404).json({ message: 'Publicación no encontrada' });
        }

        const {
            Titulo,
            Descripcion,
            Organizacion,
            Representante,
            Resultado,
        } = updatePresults;

        // Validaciones de los campos
        if (typeof Titulo !== "string" || Titulo.length < 10 || Titulo.length > 70) {
            return respondError(req, res, 400, "Verificar largo del titulo (min 10 max 70 caracteres).");
        }
        const regexTitulo = /^(?=.*[a-zA-Z])[a-zA-Z\d\s!@#-]+$/;
        if (!regexTitulo.test(Titulo)) {
            return respondError(req, res, 400, "El titulo debe tener al menos una letra y permite los siguientes simbolos: ! @ # -");
        }

        if (typeof Descripcion !== "string" || Descripcion.length < 2 || Descripcion.length > 750) {
            return respondError(req, res, 400, "Verificar largo de la descripcion (min 1 max 750 caracteres).");
        }
        const regexDescripcion = /^(?=.*[a-zA-Z])[a-zA-Z\d\s!@#$%^&*.,?]+$/;
        if (!regexDescripcion.test(Descripcion)) {
            return respondError(req, res, 400, "La descripción no puede quedar en Blanco.");
        }

        if (typeof Organizacion !== "string" || Organizacion.length < 2 || Organizacion.length > 70) {
            return respondError(req, res, 400, "Verificar largo de la Organizacion (min 1 max 70 caracteres).");
        }
        const regexOrganizacion = /^(?=.*[a-zA-Z])[a-zA-Z\d\s!@#$%^&*.,?]+$/;
        if (!regexOrganizacion.test(Organizacion)) {
            return respondError(req, res, 400, "El campo de Organizacion es obligatorio.");
        }

        if (typeof Representante !== "string" || Representante.length < 2 || Representante.length > 70) {
            return respondError(req, res, 400, "Verificar largo del Representante (min 1 max 70 caracteres).");
        }
        const regexRepresentante = /^[a-zA-ZñÑ\s]+$/;
        if (!regexRepresentante.test(Representante)) {
            return respondError(req, res, 400, "El campo del Representante es obligatorio.");
        }

        if (typeof Resultado !== "string" || Resultado.length < 11 || Resultado.length > 16) {
            return respondError(req, res, 400, "Verificar largo del Resultado (min 11 max 16 caracteres).");
        }
        const regexResultado = /^(Beneficiario|No Beneficiario)$/;
        if (!regexResultado.test(Resultado)) {
            return respondError(req, res, 400, "El Resultado Solo Acepta Beneficiario o No Beneficiario.");
        }

        // Actualiza la publicación
        publicacion_resultados.set(updatePresults);
        const publicacion_resultadosUpdated = await publicacion_resultados.save();

        return res.status(200).json(publicacion_resultadosUpdated);
    } catch (error) {
        handleError(error, "publicacion_resultados.controller -> updatePublicacion_resultados");
        return res.status(500).json({ message: 'Error al actualizar la publicación' });
    }
}

// Elimina una publicación de resultados
async function deletePublicacion_resultados(req, res) {
    try {
        const { id } = req.params;

        // Busca la publicación por ID y la elimina
        const deletedPublicacion_resultados = await Publicacion_resultados.findByIdAndRemove(id);

        if (!deletedPublicacion_resultados) {
            return res.status(404).json({ message: 'Publicación no encontrada' });
        }

        return res.status(204);
    } catch (error) {
        handleError(error, "publicacion_resultados.controller -> deletePublicacion_resultados");
        return res.status(500).json({ message: 'Error al eliminar la publicación' });
    }
}

async function getPublicacion_resultadosById(req, res) {
    try {
        const { id } = req.params; // Obtén el ID de la URL

        // Busca la publicación por ID
        const publicacion_resultados = await Publicacion_resultados.findById(id);

        if (!publicacion_resultados) {
            return res.status(404).json({ message: 'Publicación no encontrada' });
        }

        return res.status(200).json(publicacion_resultados);
    } catch (error) {
        handleError(error, "publicacion_resultados.controller -> getPublicacion_resultadosById");
        return res.status(500).json({ message: 'Error al obtener la publicación' });
    }
}

module.exports = {
    getPublicacion_resultados,
    createPublicacion_resultados,
    updatePublicacion_resultados,
    deletePublicacion_resultados,
    getPublicacion_resultadosById,
};


