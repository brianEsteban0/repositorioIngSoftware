/* eslint-disable quotes */
/* eslint-disable spaced-comment */
/* eslint-disable max-len */
"use strict";

const express = require('express');

const authorizationMiddleware = require("../middlewares/authorization.middleware.js");
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");
const PostulanteController = require('../controllers/postulante.controller.js');
const checkCupos = require("../middlewares/cupos.middleware.js");
const checkfecha = require("../middlewares/checkfecha.middleware.js");
const crearEvaluacion = require("../middlewares/crearEvaluacion.middleware.js");

const router = express.Router();
router.use(authenticationMiddleware);


router.get('/',authorizationMiddleware.isEvalAdmin,PostulanteController.getPostulantes);
router.post('/',[checkfecha,/*checkCupos,*/crearEvaluacion],PostulanteController.createPostulantes);
router.put('/:id',[authorizationMiddleware.isUser,checkfecha],PostulanteController.updatePostulantes);
router.delete('/:id',authorizationMiddleware.isUser,PostulanteController.deletePostulantes);
router.get('/publicacion/:postulanteRut',authorizationMiddleware.isEvalAdmin,PostulanteController.getPostulanteByRut);

router.get('/:id',PostulanteController.getPostulantesById);

module.exports = router;