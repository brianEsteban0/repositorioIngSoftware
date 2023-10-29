const Rubric = require("../models/rubric.model.js");

const buscarPorIdPublicacion = async (publicId) => {
    try {
        const rubric = await Rubric.findOne({ publicacion: publicId }).exec();
        if (!rubric) return [null, "No hay rubrica"];

        return [rubric._id, null];
    } catch (error) {
        handleError(error, "crearEvaluacion.middleware -> buscarPorIdPublicacion");
        return [null, "Ha ocurrido un error al buscar la rúbrica por ID de publicación"];
    }
};


const crearEvaluacion = (req, res, next) => {
    const { publicacion } = req.body;

    const scoresIniciales = new Array(rubric.criteria.length).fill(0);


    const nuevaEvaluacion = new Evaluacion({
        postulanteRut: req.body.Rut_Representante,
        rubric: buscarPorIdPublicacion(publicacion),
        publicacion: publicacion.publicacionId,
        scores: scoresIniciales,
        scoretotal: 0,
    });

    nuevaEvaluacion.save((err) => {
        if (err) {
            return res.status(500).json({ error: 'No se pudo crear la evaluación' });
        }
        next();
    });
};

module.exports = crearEvaluacion;


