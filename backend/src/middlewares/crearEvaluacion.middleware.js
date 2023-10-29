const Rubric = require("../models/rubric.model.js");
const Evaluacion = require("../models/puntajePost.model.js");
const { handleError } = require("../utils/errorHandler");

const buscarPorIdPublicacion = async (publicId) => {
    try {
        const rubric = await Rubric.findOne({ publicacion: publicId }).exec();
        if (!rubric) return [0, "No hay rubrica"];

        return [rubric._id, null];
    } catch (error) {
        handleError(error, "crearEvaluacion.middleware -> buscarPorIdPublicacion");
        return [0, "Ha ocurrido un error al buscar la rúbrica por ID de publicación"];
    }
};

const largoRubrica = async (rubId) => {
    const rubric = await Rubric.findById(rubId);
    return rubric.criteria.length;
};

const crearEvaluacion = async (req, res, next) => {
    try {
        const { publicacion } = req.body;
        //const rubricId = await buscarPorIdPublicacion(publicacion);
        //const criteriaLength = await largoRubrica(rubric);

        //const scoresIniciales = new Array(criteriaLength).fill(0);

        const nuevaEvaluacion = new Evaluacion({
            postulanteRut: req.body.Rut_Representante,
            rubric: null,
            publicacion: publicacion,
            scores: [0],
            scoretotal: 0,
        });

        await nuevaEvaluacion.save();
        next();
    } catch (error) {
        handleError(error, "crearEvaluacion.middleware");
        res.status(500).json({ error: 'No se pudo crear la evaluación' });
    }
};

module.exports = crearEvaluacion;


