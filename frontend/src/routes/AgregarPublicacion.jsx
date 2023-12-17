import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../services/root.service';
import './CrearPublicacion.css';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Estilos predefinidos de react-datepicker
import es from 'date-fns/locale/es';

const PublicacionForm = () => {
  const [publicacionData, setPublicacionData] = useState({
    titulo: '',
    descripcion: '',
    objetivo: '',
    fecha_inicio: null,
    fecha_termino: null,
    monto: '',
    cupos: '',
  });

  const navigate = useNavigate();

  const handleDateChange = (field, date) => {
    setPublicacionData({ ...publicacionData, [field]: date });
  };

  const handleInputChange = (field, value) => {
    setPublicacionData({ ...publicacionData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmation = window.confirm('¿Estás seguro de agregar esta publicación?');
    if (!confirmation) return;

    try {
      const formattedData = {
        ...publicacionData,
        fecha_inicio: publicacionData.fecha_inicio.toISOString(),
        fecha_termino: publicacionData.fecha_termino.toISOString(),
      };

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
          <DatePicker
            id="fecha_inicio"
            selected={publicacionData.fecha_inicio}
            onChange={(date) => handleDateChange('fecha_inicio', date)}
            locale={es}
            dateFormat="dd/MM/yyyy" // Formato de fecha para mostrar al usuario
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="fecha_termino" className="form-label">Fecha de término:</label>
          <DatePicker
            id="fecha_termino"
            selected={publicacionData.fecha_termino}
            onChange={(date) => handleDateChange('fecha_termino', date)}
            locale={es}
            dateFormat="dd/MM/yyyy" // Formato de fecha para mostrar al usuario
            className="form-control"
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