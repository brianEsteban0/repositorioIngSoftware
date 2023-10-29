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
router.post('/',[checkfecha,authorizationMiddleware.isUser,crearEvaluacion],PostulanteController.createPostulantes,checkCupos);
router.put('/:id',[checkfecha,authorizationMiddleware.isUser],PostulanteController.updatePostulantes);
router.delete('/:id',[checkfecha,authorizationMiddleware.isUser],PostulanteController.deletePostulantes);

router.get('/:id',checkfecha,authorizationMiddleware.isUser,PostulanteController.getPostulantes);

module.exports = router;
