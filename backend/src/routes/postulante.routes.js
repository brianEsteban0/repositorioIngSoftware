"use strict";

const express = require('express');

const authorizationMiddleware = require("../middlewares/authorization.middleware.js");
const PostulanteController = require('../controllers/postulante.controller.js');
const crearEvaluacionMiddleware = require("../middlewares/crearEvaluacion.middleware.js");

const router = express.Router();

router.get('/', PostulanteController.getPostulantes);
router.post('/', crearEvaluacionMiddleware,PostulanteController.createPostulantes);

module.exports = router;
