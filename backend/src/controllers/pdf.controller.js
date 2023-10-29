// controllers/pdf.controller.js

const PDF = require('../models/pdf.modelo');

// Controlador para cargar un PDF
const uploadPDF = async (req, res) => {
    const { user } = req.body;
    const uploadedFiles = req.files; // Array de archivos

    try {
      const pdfRecords = [];

      for (const file of uploadedFiles) {
        const newPDF = new PDF({ user, filePath: file.path });
        await newPDF.save();
        pdfRecords.push(newPDF);
      }

      return res.status(201).json({ message: 'PDFs cargados exitosamente', pdfRecords });
    } catch (error) {
      return res.status(500).json({ message: 'Error al cargar los PDFs', error: error.message });
    }
  }

  const fs = require("fs");

  const downloadFile = async (req, res) => {
    const fileId = req.params.id;

    try {
      // Encuentra el archivo por su ID en la base de datos
      const file = await PDF.findById(fileId);

      if (!file) {
        return res.status(404).json({ message: "Archivo no encontrado" });
      }

      // Configura la cabecera para la descarga del archivo
      res.setHeader("Content-Disposition", `attachment; filename=${file.originalFileName}`);
      res.setHeader("Content-Type", "application/pdf");

      // Lee el archivo PDF y envíalo como respuesta
      const fileStream = fs.createReadStream(file.filePath);
      fileStream.pipe(res);
    } catch (error) {
      return res.status(500).json({ message: "Error al descargar el archivo", error: error.message });
    }
  };

  module.exports = {
    downloadFile,
  };
  // Dentro del controlador pdfController.js

const showUploadForm = (req, res) => {
    res.render('upload.html'); // Renderizar la vista para cargar archivos PDF
}

module.exports = {
    uploadPDF,
    showUploadForm,
};