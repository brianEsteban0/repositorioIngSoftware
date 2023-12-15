import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './CrearPublicacion.css';

const PublicacionForm = () => {
  const [publicacionData, setPublicacionData] = useState({
    descripcion: '',
    objetivo: '',
    fechaInicio: '',
    fechaTermino: '',
    monto: '',
    cupos: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setPublicacionData({ ...publicacionData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/publicaciones', publicacionData);
      if (response.status === 200) {
        alert('Publicación creada con éxito');
        navigate('/publicaciones');
      } else {
        alert('Hubo un problema al crear la publicación');
      }
    } catch (error) {
      alert('Error al crear la publicación');
      console.error('Error:', error);
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
          <label htmlFor="descripcion">Descripción:</label>
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
          <label htmlFor="fechaInicio">Fecha de Inicio:</label>
          <input
            type="date"
            id="fechaInicio"
            value={publicacionData.fechaInicio}
            onChange={(e) => handleInputChange('fechaInicio', e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="fechaTermino">Fecha de Término:</label>
          <input
            type="date"
            id="fechaTermino"
            value={publicacionData.fechaTermino}
            onChange={(e) => handleInputChange('fechaTermino', e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="monto">Monto:</label>
          <input
            type="text"
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
        <button type="submit">Crear Publicación</button>
      </form>
      <button onClick={() => navigate('/publicaciones')}>Cancelar</button>
    </div>
  );
};

export default PublicacionForm;
