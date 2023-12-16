"use strict";

const express = require("express");

// Importa el controlador de publicacion_resultados
const Publicacion_resultadosController = require("../controllers/publicacion_resultados.controller.js");

/** Middlewares de autorización */
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

/** Middlewares de autenticación */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

const router = express.Router();


// define rutas para entregar los resultados de las postulaciones
router.get("/", Publicacion_resultadosController.getPublicacion_resultados);

router.get("/:id", Publicacion_resultadosController.getPublicacion_resultadosById);

// Define el middleware de autenticación para todas las rutas
router.use(authenticationMiddleware);

// define rutas para crear resultados de las postulaciones
router.post("/", authorizationMiddleware.isAdmin,Publicacion_resultadosController.createPublicacion_resultados);

// define rutas para actualizar resultados de las postulaciones
router.put("/:id", authorizationMiddleware.isAdmin,Publicacion_resultadosController.updatePublicacion_resultados);

// define rutas para eliminar resultados de las postulaciones
router.delete("/:id", authorizationMiddleware.isAdmin,Publicacion_resultadosController.deletePublicacion_resultados);

module.exports = router;
