const Publicacion = require('../models/publicacion.model.js');
const Rubric = require('../models/rubric.model.js');
const checkfecha = async (req, res, next) =>  {
    try {
        const rubricaId = req.params.rubrics; // Asegúrate de obtener el ID de la publicación correctamente
        const publicacionId = await Rubric.findById(rubricaId);
        const public = await Publicacion.findById(publicacionId.publicacion);

        if (!public) {
            return res.status(404).json({ error: 'La publicación no existe' });
        }
        const fechaInicio = new Date(public.fecha_inicio);
        const fechaTermino = new Date(public.fecha_termino);
        const today = new Date();
        if ( today.toDateString() <= fechaInicio.toDateString() && fechaTermino.toDateString() <= today.toDateString() ) {
            return res.status(400).json({ error: 'La acción no es posible en este momento' });
        }
        next();
    } catch (error) {
        console.error('Error en el middleware checkfecha:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

module.exports = checkfecha;