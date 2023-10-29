"use strict";

const express = require('express');

const authorizationMiddleware = require("../middlewares/authorization.middleware.js");
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");
const PostulanteController = require('../controllers/postulante.controller.js');
const cupos = require("../middlewares/cupos.middleware.js");
const checkfecha = require("../middlewares/checkfecha.middleware.js").default;
const crearEvaluacion = require("../middlewares/crearEvaluacion.middleware.js");

const router = express.Router();
router.use(authenticationMiddleware);


router.get('/',/*authorizationMiddleware.isUsuario,*/PostulanteController.getPostulantes);
router.post('/',[/*checkfecha,cupos,authorizationMiddleware.isUsuario,*/crearEvaluacion],PostulanteController.createPostulantes);
//router.put('/:id',[checkfecha,authorizationMiddleware.isUsuario],PostulanteController.updatePostulantes);
//router.delete('/:id',[checkfecha,authorizationMiddleware.isUsuario],PostulanteController.deletePostulantes);


//router.get('/postulacion/:postulacionId',PostulanteController.getPostulantesBypostulacionId);
module.exports = router;
