const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pdfSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  filePath: String,
  state: { type: String, enum: ['Pendiente', 'En evaluacion', 'Evaluado'], default: 'Pendiente' },
  result: { type: String, enum: ['Aceptado', 'Rechazado', 'Sin resultado'], default: 'Sin resultado' },
});

module.exports = mongoose.model('PDF', pdfSchema);
