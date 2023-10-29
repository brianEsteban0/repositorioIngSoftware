"use strict";

const mongoose = require("mongoose");

//esquema de las publucaciones resultados
const Publicacion_resultadosSchema = new mongoose.Schema(
  {
  //Titulo de la publicacion
    Titulo:{
      type: String,
      required: true,
    },
    //Cuerpo de la publicacion
    Cuerpo:{
      type: String,
      required: true,
    },
    //resultado
    Resultados: {
      type: mongoose.Schema.Types.ObjectId,
      ref: ResultadoService.getResultado(),
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Publicacion_resultados = mongoose.model("Publicacion_resultados", Publicacion_resultadosSchema);

module.exports = Publicacion_resultados;