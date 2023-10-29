import { findById } from '../models/publicacion.model.js';


async function checkFechas(req, res, next) {
  const now = new Date();

  const publicacionId = req.body.publicacionId; // Obtén el ID de la publicación
  const publicacion = await findById(publicacionId);

  if (!publicacion) {
    return res.status(404).json({ message: 'Publicación no encontrada' });
  }

  if (!moment(now).isBetween(publicacion.fecha_inicio, publicacion.fecha_termino, null, '[]')) {
    return res.status(403).json({ message: 'La accion no es posible en este momento' });
  }

  next();
}

export default {
    checkFechas,
} 
