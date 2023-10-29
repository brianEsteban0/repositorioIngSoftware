const Publicacion = require('../models/publicacion.model.js');
const Rubric = require('../models/rubric.model.js');
const verificarFechaTermino = async (req, res, next) => {
    try {
        const rubricaId = req.params.rubrics; // Asegúrate de obtener el ID de la publicación correctamente
        const publicacionId = await Rubric.findById(rubricaId);
        const public = await Publicacion.findById(publicacionId.publicacion);

        if (!public) {
            return res.status(404).json({ error: 'La publicación no existe' });
        }

        const fechaTermino = new Date(public.fecha_termino);
        const today = new Date();

        if (fechaTermino.toDateString() < today.toDateString()) {
            return res.status(400).json({ error: 'La fecha de postulacion no ah acabado. No se puede actualizar.' });
        }

        next();
    } catch (error) {
        console.error('Error en el middleware verificarFechaTermino:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

module.exports = verificarFechaTermino;
