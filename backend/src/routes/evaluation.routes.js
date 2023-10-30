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
const crearResultadoMiddleware = require("../middlewares/crearResultado.middlewares.js");

/** Instancia del enrutador */
const router = express.Router();

// Define el middleware de autenticación para todas las rutas
router.use(authenticationMiddleware);

// Define las rutas para los usuarios
router.get("/",authorizationMiddleware.isEvalAdmin,evaluacionController.getEvaluacion);
router.post("/", [authorizationMiddleware.isEvalAdmin,calcularPuntaje], evaluacionController.createEvaluacion);
router.get("/:postulanteRut", authorizationMiddleware.isEvalAdmin,evaluacionController.getEvaluacionById);
router.put("/:postulanteRut", [authorizationMiddleware.isEvalAdmin,comprobarFecha,calcularPuntaje,crearResultadoMiddleware] ,evaluacionController.updateEvaluacion);
router.delete("/:postulanteRut",authorizationMiddleware.isAdmin,evaluacionController.deleteEvaluacion,);

//Obtener a el/los postulantes con el maximo puntaje
//router.get("/maxScore/:idpostulacion",authorizationMiddleware.isEvaluador,);

// Exporta el enrutador
module.exports = router;