"use strict";

const nodemailer = require("nodemailer");

//Crea el Objeto transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: true,
  auth: {
    user: "admin@gmail.com",
    pass: "admin123",
  },
});


const sendEmailMiddleware = async (req, res,) => {
  const { correo } = req.body;

  const mailOptions = {
    from: "mensaje enviado por <admin@gmail.com>",
    correo: correo.join(", "), //correo es un array de destinatarios
    subject: "Resultados de Postulacion a proyecto",
    text: "Los resultados de tu postulacion se encuentran disponibles: ",
};

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Correos enviados exitosamente: " + info.response);
  } catch (error) {
    console.log("Error al enviar el correo: " + error);
    res.status(500).json({ message: "Error al enviar el correo" });
  }
};

module.exports = sendEmailMiddleware;



