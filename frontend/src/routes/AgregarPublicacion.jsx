import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../services/root.service';
import './CrearPublicacion.css';
import moment from 'moment';

const PublicacionForm = () => {
  const [publicacionData, setPublicacionData] = useState({
    titulo: '',
    descripcion: '',
    objetivo: '',
    fecha_inicio: '',
    fecha_termino: '',
    monto: '',
    cupos: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    if (field === 'fecha_inicio' || field === 'fecha_termino') {
      setPublicacionData({ ...publicacionData, [field]: value });
    } else {
      setPublicacionData({ ...publicacionData, [field]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedData = { ...publicacionData };
      
      formattedData.fecha_inicio = moment(publicacionData.fecha_inicio, 'YYYY-MM-DD').format('DD/MM/YYYY');
      formattedData.fecha_termino = moment(publicacionData.fecha_termino, 'YYYY-MM-DD').format('DD/MM/YYYY');
      
      await axios.post('/publicaciones/', formattedData);
      alert('Publicación creada con éxito');
      navigate('/publicaciones');
    } catch (error) {
      console.error('Error al crear la publicación', error);
      alert('Error al crear la publicación');
    }
  };
  
  return (
    <div className="container my-5">
      <h1 className="mb-4">Crear Publicación</h1>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
  <label htmlFor="titulo" className="form-label">Título:</label>
  <input
    type="text"
    className="form-control"
    id="titulo"
    placeholder="Ingrese el título..."
    value={publicacionData.titulo}
    onChange={(e) => handleInputChange('titulo', e.target.value)}
  />
</div>
<div className="mb-3">
  <label htmlFor="descripcion" className="form-label">Descripción:</label>
  <input
    type="text"
    className="form-control"
    id="descripcion"
    placeholder="Ingrese la descripción..."
    value={publicacionData.descripcion}
    onChange={(e) => handleInputChange('descripcion', e.target.value)}
  />
</div>
<div className="mb-3">
  <label htmlFor="objetivo" className="form-label">Objetivo:</label>
  <input
    type="text"
    className="form-control"
    id="objetivo"
    placeholder="Ingrese el objetivo..."
    value={publicacionData.objetivo}
    onChange={(e) => handleInputChange('objetivo', e.target.value)}
  />
</div>
<div className="mb-3">
          <label htmlFor="fecha_inicio" className="form-label">Fecha de inicio:</label>
          <input
            type="date"
            className="form-control"
            id="fecha_inicio"
            value={publicacionData.fecha_inicio}
            onChange={(e) => handleInputChange('fecha_inicio', e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="fecha_termino" className="form-label">Fecha de término:</label>
          <input
            type="date"
            className="form-control"
            id="fecha_termino"
            value={publicacionData.fecha_termino}
            onChange={(e) => handleInputChange('fecha_termino', e.target.value)}
          />
        </div>
        <div className="mb-3">
  <label htmlFor="monto" className="form-label">Monto:</label>
  <input
    type="number"
    className="form-control"
    id="monto"
    placeholder="Ingrese el monto..."
    value={publicacionData.monto}
    onChange={(e) => handleInputChange('monto', e.target.value)}
  />
</div>
<div className="mb-3">
  <label htmlFor="cupos" className="form-label">Cupos:</label>
  <input
    type="number"
    className="form-control"
    id="cupos"
    placeholder="Ingrese los cupos..."
    value={publicacionData.cupos}
    onChange={(e) => handleInputChange('cupos', e.target.value)}
  />
</div>
        <div className="d-grid gap-2">
          <button className="btn btn-primary" type="submit">Crear Publicación</button>
          <button className="btn btn-secondary" onClick={() => navigate('/publicaciones')}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default PublicacionForm;
