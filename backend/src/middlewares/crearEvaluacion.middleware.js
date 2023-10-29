const Rubric = require("../models/rubric.model.js");
const Evaluacion = require("../models/puntajePost.model.js");
const { handleError } = require("../utils/errorHandler");

const buscarPorIdPublicacion = async (publicId) => {
        const rubric = await Rubric.findOne({ publicacion: publicId }).exec();
        if (!rubric) {
            console.log("no existe rubrica");
            return null};

        return rubric._id;
};

const largoRubrica = async (rubId) => {
    const rubric = await Rubric.findById(rubId);
    return rubric.criteria.length;
};

const crearEvaluacion = async (req, res, next) => {
    
        const { publicacion } = req.body;
        const rubricId = await buscarPorIdPublicacion(publicacion);
        if (rubricId == null){
            const nuevaEvaluacion = new Evaluacion({
                postulanteRut: req.body.Rut_Representante,
                rubric: rubricId,
                publicacion: publicacion,
                scores: null,
                scoretotal: 0,
            });
            
            await nuevaEvaluacion.save();
        }else{
        const criteriaLength = await largoRubrica(rubricId);

        const scoresIniciales = new Array(criteriaLength).fill(0);
        

        const nuevaEvaluacion = new Evaluacion({
            postulanteRut: req.body.Rut_Representante,
            rubric: rubricId,
            publicacion: publicacion,
            scores: scoresIniciales,
            scoretotal: 0,
        });
        
        await nuevaEvaluacion.save();
        
        };
        next();
};

module.exports = crearEvaluacion;


