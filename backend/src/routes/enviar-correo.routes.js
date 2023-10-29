"use strict"

const express = require("express");
const bodyParser = require("body-parser"); // importa body-parser middleware
const router = express.Router();
const sendEmailMiddleware = require("../middlewares/enviar-correo.middleware");

const app = express(); // create the app variable

// Middleware para parsear JSON
app.use(bodyParser.json());

//Ruta para enviar correos
router.post(".../enviar-correo.middleware", sendEmailMiddleware,)

//exporta el modulo router
module.exports = router;