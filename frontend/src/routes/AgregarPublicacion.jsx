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
      // Modifica el formato de la fecha ingresada por el usuario
      setPublicacionData({ ...publicacionData, [field]: value });
    } else {
      setPublicacionData({ ...publicacionData, [field]: value });
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedData = { ...publicacionData };
      
      // Formatea las fechas al formato requerido por el servidor (DD/MM/YYYY)
      formattedData.fecha_inicio = moment(publicacionData.fecha_inicio, 'YYYY-MM-DD').format('DD/MM/YYYY');
      formattedData.fecha_termino = moment(publicacionData.fecha_termino, 'YYYY-MM-DD').format('DD/MM/YYYY');
      
      // Ahora puedes enviar formattedData al servidor
      await axios.post('/publicaciones/', formattedData);
      alert('Publicación creada con éxito');
      navigate('/publicaciones');
    } catch (error) {
      console.error('Error al crear la publicación', error);
      alert('Error al crear la publicación');
    }
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="titulo">Titulo:</label>
          <input
            type="text"
            id="titulo"
            value={publicacionData.titulo}
            onChange={(e) => handleInputChange('titulo', e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="descripcion">Descripcion:</label>
          <input
            type="text"
            id="descripcion"
            value={publicacionData.descripcion}
            onChange={(e) => handleInputChange('descripcion', e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="objetivo">Objetivo:</label>
          <input
            type="text"
            id="objetivo"
            value={publicacionData.objetivo}
            onChange={(e) => handleInputChange('objetivo', e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="fecha_inicio">Fecha de inicio:</label>
          <input
            type="date"
            id="fecha_inicio"
            value={publicacionData.fecha_inicio}
            onChange={(e) => handleInputChange('fecha_inicio', e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="fecha_termino">Fecha de termino:</label>
          <input
            type="date"
            id="fecha_termino"
            value={publicacionData.fecha_termino}
            onChange={(e) => handleInputChange('fecha_termino', e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="monto">Monto:</label>
          <input
            type="number"
            id="monto"
            value={publicacionData.monto}
            onChange={(e) => handleInputChange('monto', e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="cupos">Cupos:</label>
          <input
            type="number"
            id="cupos"
            value={publicacionData.cupos}
            onChange={(e) => handleInputChange('cupos', e.target.value)}
          />
        </div>
        
        {/* Resto de tus campos de publicación */}
        <button type="submit">Crear Publicación</button>
      </form>
      <button onClick={() => navigate('/publicaciones')}>Cancelar</button>
    </div>
  );
};

export default PublicacionForm;
