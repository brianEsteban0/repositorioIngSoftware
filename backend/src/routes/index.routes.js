"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");

/** Enrutador de usuarios  */
const userRoutes = require("./user.routes.js");

/** Enrutador de autenticación */
const authRoutes = require("./auth.routes.js");
/** Enrutador de PDF */
const pdfRoutes = require("./pdf.routes.js");
/** Enrutador de rubricas */
const rubricRoutes = require("./rubric.routes.js");
/** Enrutador de resultados */
const resultadoRoutes = require("./resultado.routes.js");
/** Enrutador de evaluacion */
const evaluacionRoutes = require("./evaluation.routes.js");
/** Enrutador de publicaciones */
const publicacionRoutes = require("./publicacion.routes.js");
/** Enrutador de publicaciones resultados */
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

// Define las rutas para las publicaciones
router.use("/publicaciones", publicacionRoutes);
// Define las rutas para los PDF /api/pdf
router.use("/upload", pdfRoutes);
// Define las rutas para las rubricas
router.use("/rubric",rubricRoutes);
// Define las rutas para los resultados
router.use("/resultados",resultadoRoutes);
// Define las rutas para las evaluaciones
router.use("/evaluacion",evaluacionRoutes);
// Define las rutas para las publicaciones de resultados
router.use("/publicacion_resultados",publicacion_resultadosRoutes);

// Importa las rutas específicas de postulantes
const postulanteRoutes = require('./postulante.routes.js');
// Utiliza las rutas de postulantes
router.use('/postulante', postulanteRoutes);


module.exports = router;