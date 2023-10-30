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


router.get('/',authorizationMiddleware.isUser,PostulanteController.getPostulantes);
router.post('/',[authorizationMiddleware.isUser,checkfecha,/*checkCupos,*/crearEvaluacion],PostulanteController.createPostulantes);
router.put('/:id',[authorizationMiddleware.isUser,checkfecha],PostulanteController.updatePostulantes);
router.delete('/:id',[authorizationMiddleware.isUser,checkfecha],PostulanteController.deletePostulantes);

//router.get('/:id',authorizationMiddleware.isUser,PostulanteController.getPostulantes);

module.exports = router;