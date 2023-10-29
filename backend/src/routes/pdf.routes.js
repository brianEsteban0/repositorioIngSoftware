const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // Directorio de destino para los archivos cargados
const PDF = require("../models/pdf.modelo"); // Asegúrate de que la ruta de importación sea correcta y que el modelo coincida con tu definición en MongoDB
const fs = require("fs"); // Importa el módulo fs para trabajar con archivos
const { downloadFile } = require("../controllers/pdf.controller"); // Asegúrate de que el controlador se importe correctamente
const { isEvaluador } = require("../middlewares/authorization.middleware");

// Ruta para cargar varios archivos PDF
router.post("/upload", upload.array("pdfs", 6), async (req, res) => {
  try {
    const uploadedFiles = req.files;
    const pdfRecords = [];

    for (const file of uploadedFiles) {
      const newPDF = new PDF({ filePath: file.path });
      await newPDF.save();
      pdfRecords.push(newPDF);
    }

    return res.status(201).json({ message: "PDFs cargados exitosamente", pdfs: pdfRecords });
  } catch (error) {
    return res.status(500).json({ message: "Error al cargar los PDFs", error: error.message });
  }
});

// Ruta para descargar archivos

router.get("/download/:id", isEvaluador, async (req, res) => {
  try {
    const pdf = await PDF.findById(req.params.id);

    if (!pdf) {
      return res.status(404).json({ message: "PDF no encontrado" });
    }

    // El middleware `isEvaluador` ya ha verificado el rol
    // No es necesario verificar el rol nuevamente aquí

    // Configura la cabecera para la descarga del archivo
    res.setHeader("Content-Disposition", `attachment; filename=${pdf.originalFileName}`);
    res.setHeader("Content-Type", "application/pdf");

    // Lee el archivo PDF y envíalo como respuesta
    const fileStream = fs.createReadStream(pdf.filePath);
    fileStream.pipe(res);
  } catch (error) {
    return res.status(500).json({ message: "Error al descargar el PDF", error: error.message });
  }
});

module.exports = router;
