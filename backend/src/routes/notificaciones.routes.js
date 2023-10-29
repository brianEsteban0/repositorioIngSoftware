"use strict"

// importa el modulo express para crear rutas
const express = require("express");
// constante bodyParser para parsear JSON
const bodyParser = require("body-parser");
// constante router para crear rutas
const router = express.Router();
// crea la variable app para utilizar express
const app = express();


/** Middlewares de autorización */
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");
/** Middleware de autenticación */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");
// Middleware para parsear JSON
app.use(bodyParser.json());

// Define el middleware de autenticación para todas las rutas
router.use(authenticationMiddleware);
//Ruta para enviar correos
router.post("/enviar",authorizationMiddleware.isAdmin, require("../controllers/correos.controller.js").enviarCorreos);
//exporta el modulo router
module.exports = router;