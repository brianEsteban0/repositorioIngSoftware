"use strict";

const mongoose = require("mongoose");

//esquema de las publucaciones resultados
const Publicacion_resultadosSchema = new mongoose.Schema(
{
    Titulo:{
        type: String,
        required: true,
        unique: true,
    },
    Descripcion:{
        type: String,
        required: true,
    },
    Organizacion: {
        type: String,
        required: true
    },
    Representante:{
        type: String,
        required: true,
    },
    Rut_Representante:{
        type: String,
        required: true,
    },
}
);

const Publicacion_resultados = mongoose.model("Publicacion_resultados", Publicacion_resultadosSchema);

module.exports = Publicacion_resultados;
