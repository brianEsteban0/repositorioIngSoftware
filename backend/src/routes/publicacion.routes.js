"use strict";

//importa el modulo 'express' para crear las rutas
const express = require("express");

//importa el controlador de publicaciones
const publicacionController = require("../controllers/publicacion.controller");

/** Middlewares de autorización */
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

/** Middleware de autenticación */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

const router = express.Router();

//define rutas para las publicaciones
router.get("/", publicacionController.getPublicaciones);

// Define el middleware de autenticación para todas las rutas
router.use(authenticationMiddleware);

//define rutas para crear publicaciones
router.post("/", authorizationMiddleware.isAdmin,publicacionController.createPublicacion);

//define rutas para actualizar publicaciones
router.put("/:id", authorizationMiddleware.isAdmin,publicacionController.updatePublicacion);

//define rutas para eliminar publicaciones
router.delete("/:id", authorizationMiddleware.isAdmin,publicacionController.deletePublicacion);

module.exports = router;