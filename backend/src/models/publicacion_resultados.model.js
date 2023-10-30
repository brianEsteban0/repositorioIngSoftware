"use strict";

const mongoose = require("mongoose");

//esquema de las publucaciones resultados
const Publicacion_resultadosSchema = new mongoose.Schema(
{
  //Titulo de la publicacion
    Titulo:{
        type: String,
        required: true,
        unique: true,
    },
    //Cuerpo de la publicacion
    Ganadores:{
        type: String,
        required: true,
    },
},
{
    timestamps: true,
    versionKey: false,
}
);

const Publicacion_resultados = mongoose.model("Publicacion_resultados", Publicacion_resultadosSchema);

module.exports = Publicacion_resultados;
