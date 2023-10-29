"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const sendEmailMiddleware = require("../middlewares/enviar-correo.middleware");
const PostulanteModel = require("../models/postulante.model");

const app = express();
app.use(bodyParser.json());


function almacenarCorreos(req, res) {
const { correo } = req.body;

if (correo && Array.isArray(correo)) {
    correosPostulantes.length = 0;
    correosPostulantes.push(...correo);
    res.status(200).json({ message: "Correos almacenados con éxito" });

// Enviar mail usando sendEmailMiddleware
const mailOptions = {
    to: correo.join(", "),
    subject: "Asunto del correo",
    text: "Contenido del correo",
    };
    sendEmailMiddleware({ body: mailOptions }, res, () => {});
} else {
    res.status(400).json({ message: "Formato de correos incorrecto" });
 }
}

app.post("/almacenar-correos", almacenarCorreos);

module.exports = app;