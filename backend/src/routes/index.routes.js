"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");

/** Enrutador de usuarios  */
const userRoutes = require("./user.routes.js");

/** Enrutador de autenticación */
const authRoutes = require("./auth.routes.js");
/** Enrutador de PDF */
const pdfRoutes = require("./pdf.routes.js");
const rubricRoutes = require("./rubric.routes.js");
const resultadoRoutes = require("./resultado.routes.js");
const evaluacionRoutes = require("./evaluation.routes.js");
const publicacionRoutes = require("./publicacion.routes.js");
const publicacion_resultadosRoutes = require("./publicacion_resultados.routes.js");

/** Middleware de autenticación */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

/** Instancia del enrutador */
const router = express.Router();

// Define las rutas para los usuarios /api/usuarios
router.use("/users", authenticationMiddleware, userRoutes);
// Define las rutas para la autenticación /api/auth
router.use("/auth", authRoutes);
// Define las rutas para los PDF /api/pdf
router.use("/publicaciones", publicacionRoutes);
router.use("/upload", pdfRoutes);
router.use("/rubric",rubricRoutes);
router.use("/resultados",resultadoRoutes);
router.use("/evaluacion",evaluacionRoutes);
router.use("/publicacion_resultados",publicacion_resultadosRoutes);
// Exporta el enrutador

// Importa las rutas específicas de postulantes
const postulanteRoutes = require('./postulante.routes.js'); 
// Utiliza las rutas de postulantes
router.use('/postulante', postulanteRoutes);


module.exports = router;