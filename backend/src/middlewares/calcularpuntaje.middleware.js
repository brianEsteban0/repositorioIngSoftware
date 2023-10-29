
const calcularPuntajeTotal = (req, res, next) => {
    const sum = req.body.scores.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    req.body.scoretotal = sum;
    next();
};

module.exports = calcularPuntajeTotal;