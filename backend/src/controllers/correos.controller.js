"use strict";

const nodemailer = require("nodemailer");
const Postulante = require("../models/postulante.model");

async function notificarPostulantesSeleccionados(req, res) {
  try {
    // Obtén los postulantes seleccionados
    const postulantesSeleccionados = await Postulante.find({ esGanador: true });

    if (postulantesSeleccionados.length === 0) {
      return res.status(204).json({ message: "No hay postulantes seleccionados" });
    }

    // Crea el Objeto transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "admin@gmail.com",
        pass: "admin123",
      },
    });

    // Envia los correos a los postulantes seleccionados
    const emailAddresses = postulantesSeleccionados.map(postulante => postulante.Correo);

    const mailOptions = {
      from: "admin@gmail.com",
      to: emailAddresses.join(", "),
      subject: "¡Felicidades! Has sido seleccionado",
      text: "¡Has sido seleccionado para el proyecto! Consulta los detalles en nuestra plataforma.",
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Correos enviados exitosamente: " + info.response);

    return res.status(200).json({ message: "Correos enviados a los postulantes seleccionados" });
  } catch (error) {
    console.error("Error al notificar a los postulantes: " + error);
    return res.status(500).json({ message: "Error al enviar los correos" });
  }
}

module.exports = { notificarPostulantesSeleccionados };

