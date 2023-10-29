// Importa el modulo 'express' para crear las rutas
const express = require("express");

/** Controlador de usuarios */
const evaluacionController = require("../controllers/evaluacion.controller.js");

/** Middlewares de autorización */
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

/** Middleware de autenticación */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

/** Middleware de comprobacion de fecha de termino de la postulacion**/
const comprobarFecha =  require("../middlewares/comprobarfecha.middlewere.js");

const calcularPuntaje =  require("../middlewares/calcularpuntaje.middleware.js");


/** Instancia del enrutador */
const router = express.Router();

// Define el middleware de autenticación para todas las rutas
router.use(authenticationMiddleware);

// Define las rutas para los usuarios
router.get("/",evaluacionController.getEvaluacion);
router.post("/", calcularPuntaje, evaluacionController.createEvaluacion);
router.get("/:id", authorizationMiddleware.isEvalAdmin,evaluacionController.getEvaluacionById);
router.put("/:id", [authorizationMiddleware.isEvaluador,comprobarFecha] ,evaluacionController.updateEvaluacion);
router.delete("/:id",authorizationMiddleware.isAdmin,evaluacionController.deleteEvaluacion,);

//Obtener a el/los postulantes con el maximo puntaje
router.get("/maxScore/:idpostulacion",authorizationMiddleware.isEvaluador,);

// Exporta el enrutador
module.exports = router;