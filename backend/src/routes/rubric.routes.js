/* eslint-disable max-len */
"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");

/** Controlador de usuarios */
const rubricaController = require("../controllers/rubric.controller.js");

/** Middlewares de autorización */
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

/** Middleware de autenticación */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

/** Instancia del enrutador */
const router = express.Router();

// Define el middleware de autenticación para todas las rutas
router.use(authenticationMiddleware);

// Define las rutas para los usuarios
router.get("/",authorizationMiddleware.isEvalAdmin,rubricaController.getRubric);
router.post("/", authorizationMiddleware.isAdmin, rubricaController.createRubric);
router.get("/:id", authorizationMiddleware.isEvalAdmin,rubricaController.getRubricById);
router.put("/:id",authorizationMiddleware.isAdmin,rubricaController.updateRubric);
router.delete("/:id",authorizationMiddleware.isAdmin,rubricaController.deleteRubric);
router.get("/publicacion/:id",authorizationMiddleware.isEvalAdmin,rubricaController.getRubricByPublicacionId);

// Exporta el enrutador
module.exports = router;