/* eslint-disable quotes */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
const Publicacion = require('../models/publicacion.model.js');
const { format } = require('date-fns');
const verificarFechaTermino = async (req, res, next) => {
    try {
        const publicacionId = req.body.publicacion; 
        const public = await Publicacion.findById(publicacionId);

        if (!public) {
            return res.status(404).json({ error: 'La publicación no existe' });
        }

        const fechaTermino = format(new Date(public.fecha_termino), 'dd MM yyyy');
        const today = format(new Date(), 'dd MM yyyy');

        if (fechaTermino > today) {
            return res.status(400).json({ error: 'La fecha de postulación no ha terminado. No se puede actualizar.' });
        }

        next();
    } catch (error) {
        console.error('Error en el middleware verificarFechaTermino:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

module.exports = verificarFechaTermino;
