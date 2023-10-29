"use strict";
// Importa el módulo nodemailer
const nodemailer = require("nodemailer");
// Importa el modelo de postulante
const Postulante = require('../models/postulante.model');

async function enviarCorreos() {
  try {
    // Recibe todos los correos de los postulantes desde la base de datos
    const postulantes = await Postulante.find();
    const emailAddresses = postulantes.map(postulante => postulante.Correo); // Asegúrate de que el campo del correo sea el correcto

    // Verifica que haya al menos un postulante
    if (emailAddresses.length === 0) {
      console.log('No hay postulantes para enviar correos electrónicos');
      return;

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

    // Envia los correos a los postulantes
    const mailOptions = {
      from: "admin@gmail.com",
      // emailAddresses es un array de destinatarios
      to: emailAddresses.join(", "),
      subject: "Resultados de Postulacion a proyecto",
      text: "Los resultados de tu postulacion se encuentran disponibles: ",
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Correos enviados exitosamente: " + info.response);
    } catch (error) {
      console.log("Error al enviar el correo: " + error);
    }
  } catch (error) {
    console.log("Error al obtener los correos de los postulantes: " + error);
  }
}

module.exports = { enviarCorreos };
