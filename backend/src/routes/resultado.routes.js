// Importa el modulo 'express' para crear las rutas
const express = require("express");

/** Controlador de usuarios */
const resultadoController = require("../controllers/resultado.controller.js");

/** Middlewares de autorización */
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

/** Middleware de autenticación */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");


/** Instancia del enrutador */
const router = express.Router();

// Define el middleware de autenticación para todas las rutas
router.use(authenticationMiddleware);

// Define las rutas para los usuarios
router.get("/",authorizationMiddleware.isEvalAdmin,resultadoController.getResultado);
router.post("/",authorizationMiddleware.isEvalAdmin,resultadoController.createResultado);
router.update("/id:",authorizationMiddleware.isAdmin,resultadoController.updateResultado);
router.delete("/id:",authorizationMiddleware.isAdmin,resultadoController.deleteResultado);
//selecciona a los ganadores
//router.post("/seleccionadosPostulacion/:idPostulacion",resultadoController.createResultadoPostulacion);
//obtiene los ganadores
router.get("/seleccionadosPostulacion/:idPostulacion",authorizationMiddleware.isEvalAdmin,resultadoController.getResultadoPostulacion);


// Exporta el enrutador
module.exports = router;