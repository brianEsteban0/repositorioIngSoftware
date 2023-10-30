const Publicacion = require('../models/publicacion.model.js');
const checkfecha = async (req, res, next) =>  {
    try {
        const publicacionId = req.body.publicacion; // Asegúrate de obtener el ID de la publicación correctamente
        const public = await Publicacion.findById(publicacionId);

        if (!public) {
            return res.status(404).json({ error: 'La publicación no existe' });
        }
        const fechaInicio = new Date(public.fecha_inicio);
        const fechaTermino = new Date(public.fecha_termino);
        const today = new Date();
        if ( fechaInicio.toDateString() <= today.toDateString() && today.toDateString() <= fechaTermino.toDateString()  ) {
            return res.status(400).json({ error: 'La acción no es posible en este momento' });
        }
        next();
    } catch (error) {
        console.error('Error en el middleware checkfecha:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

module.exports = checkfecha;