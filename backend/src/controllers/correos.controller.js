"use strict";
const nodemailer = require("nodemailer");
const Postulante = require("../models/postulante.model");

async function notificarPostulantes(req, res) {
  try {
    // Obtén los postulantes
    const notificarPostulantes = await Postulante.find();

    if (notificarPostulantes.length === 0) {
      return res.status(204).json({ message: "No hay postulantes para notificar" });
    }
    // Crea el Objeto transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "brayanhd98@gmail.com",
        pass: "fxdf zqrp oywq hunq",
      },
    });

    // Envia los correo de notificacion a los postulantes
    const emailAddresses = notificarPostulantes.map(postulante => postulante.Correo);

    const mailOptions = {
      from: "admin@gmail.com",
      to: emailAddresses.join(", "),
      subject: "Resultados de postulacion a proyecto, concursos y financiamiento",
      text: "Los resultados de tu postulacion se encuentran disponibles",
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Correos enviados exitosamente: " + info.response);
    return res.status(200).json({ message: "Correos enviados a los postulantes seleccionados" });
  } catch (error) {
    console.error("Error al notificar a los postulantes: " + error);
    return res.status(500).json({ message: "Error al enviar los correos" });
  }
}

module.exports = { notificarPostulantes };

