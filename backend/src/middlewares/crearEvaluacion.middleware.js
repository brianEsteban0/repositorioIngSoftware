

const crearEvaluacion = (req, res, next) => {
    const { rubrics, contests } = req.body;

    const scoresIniciales = new Array(rubric.criteria.length).fill(0);

    const nuevaEvaluacion = new Evaluacion({
        postulante: req.body.Rut_Organizacion,
        rubric: rubrics.rubricId,
        contest: contests.contestId,
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


