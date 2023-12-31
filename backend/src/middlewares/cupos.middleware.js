const Publicacion = require("../models/publicacion.model.js");
const { respondError } = require("../utils/resHandler.js");

const checkCupos = async (req, res, next) =>  {
  try {
    const publicacionId = req.params.publicacionId;
    const publicacion = await Publicacion.findById(publicacionId);

    if (!publicacion) {
      return respondError(req, res, 404, "Publicación no encontrada");
    }
    
    if (publicacion.cupos <= 0) {
      return respondError(req, res, 403, "No hay cupos disponibles en esta publicación");
    }
    
    next();
  } catch (error) {
    respondError(req, res, 500, "Error al verificar cupos disponibles");
  }
}

module.exports = checkCupos;