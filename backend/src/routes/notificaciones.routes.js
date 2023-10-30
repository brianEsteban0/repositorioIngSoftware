"use strict";

// importa el modulo express para crear rutas
const express = require("express");
// constante router para crear rutas
const router = express.Router();

//Importa el controlador de correos
const notificacionResultados = require("../controllers/correos.controller.js")

/** Middlewares de autorización */
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

/** Middleware de autenticación */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

// Define el middleware de autenticación para todas las rutas
router.use(authenticationMiddleware);

//Ruta para enviar correos
router.get("/enviar-correos",authorizationMiddleware.isAdmin,notificacionResultados.notificarPostulantes);

//exporta el modulo router
module.exports = router;