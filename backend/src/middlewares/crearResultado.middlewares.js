const Postulante = require("../models/postulante.model");
const { handleError } = require("../utils/errorHandler");
const Resultado = require("../models/resultado.models.js");

const buscarIdPostulante = async (posRut) => {
    try {
        const postulante = await Postulante.findOne({ Rut_Representante: posRut }).exec();
        if (!postulante) return [null, "No existe postulante"];

        return postulante._id;
    } catch (error) {
        handleError(error, "crearEvaluacion.middleware -> buscarPorIdPublicacion");
        return [null, "Ha ocurrido un error al buscar al postulante por rut postulante"];
    }
};



const crearResultado = async (req, res, next) => {
    try {
        const { postulanteRut } = req.body;

        

        const postulanteId = await buscarIdPostulante(postulanteRut);

        const resultadoFound = await Resultado.findOne({ postulante: postulanteId });
        if (!resultadoFound){ 
            const newResultados = new Resultado({
                postulacion: req.body.publicacion,
                postulante: postulanteId,
                rubrica: req.body.rubric,
                puntaje_total: req.body.scoretotal,
                ganador: null,
                estadoEvaluacion: "Pendiente",
            });
    
            await newResultados.save();
        }else{
            console.log("El resultado ya existe, se actualizara");
            const resultadoUpdated = await Resultado.findByIdAndUpdate(
                resultadoFound._id,
                {
                    postulacion: req.body.publicacion,
                    postulante: postulanteId,
                    rubrica: req.body.rubric,
                    puntaje_total: req.body.scoretotal,
                    ganador: null,
                    estadoEvaluacion: "Pendiente",
                },
                { new: true },
            );

        };

        
        next();
    } catch (error) {
        handleError(error, "crearResultado.middleware");
        res.status(500).json({ error: 'No se pudo crear el Resultado'});
    }
};

module.exports = crearResultado;