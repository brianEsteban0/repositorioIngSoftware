const Publicacion = require('../models/publicacion.model.js');
const verificarFechaTermino = async (req, res, next) => {
    try {
        const publicacionId = req.body.publicacion; // Asegúrate de obtener el ID de la publicación correctamente
        const public = await Publicacion.findById(publicacionId);
    

        if (!public) {
            return res.status(404).json({ error: 'La publicación no existe' });
        }
        console.log();
        const fechaTermino = new Date(public.fecha_termino);
        const today = new Date();
        if (fechaTermino.toDateString() > today.toDateString()) {
            return res.status(400).json({ error: 'La fecha de postulacion no termino. No se puede actualizar.' });
        }

        next();
    } catch (error) {
        console.error('Error en el middleware verificarFechaTermino:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

module.exports = verificarFechaTermino;
