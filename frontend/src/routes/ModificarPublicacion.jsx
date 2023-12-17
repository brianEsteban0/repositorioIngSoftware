import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerPublicacionById, getPublicacion  } from '../services/VerPublicaciones.service'; // Reemplaza con tu lógica de servicio
import axios from '../services/root.service';

function ModificarPostulacion() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [selectedPublicacion, setSelectedPublicacion] = useState('');
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

  useEffect(() => {
    obtenerPublicaciones();
  }, []);

  const obtenerPublicaciones = async () => {
    try {
      const response = await obtenerListaPublicaciones();
      setPublicaciones(response);
    } catch (error) {
      console.error('Error al obtener las publicaciones', error);
    }
  };

  const obtenerListaPublicaciones = async () => {
    try {
      const listaPublicaciones = await getPublicacion();
      return listaPublicaciones || [];
    } catch (error) {
      console.error('Error al obtener la lista de publicaciones', error);
      return [];
    }
  };

  const handleEliminarPublicacion = async (id) => {
    try {
      const response = await axios.delete(`/publicaciones/${id}`);
      if (response.status === 200) {
        alert(`Publicación con ID ${id} eliminada`);
        navigate('/publicaciones');
      } else {
        throw new Error('No se pudo eliminar la publicación');
      }
    } catch (error) {
      console.error('Error al eliminar la publicación', error);
      alert('Se eliminó la publicación');
    }
  };

  const handleSelectChange = async (event) => {
    setSelectedPublicacion(event.target.value);
    try {
      const response = await obtenerPublicacionById(event.target.value);
      setPublicacionData(response);
    } catch (error) {
      console.error('Error al obtener los detalles de la publicación', error);
    }
  };

  const handleInputChange = (field, value) => {
    setPublicacionData({ ...publicacionData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedPublication = await axios.put(`/publicaciones/${publicacionData._id}`, publicacionData);
      alert('Publicación modificada con éxito');
      navigate('/publicaciones');
    } catch (error) {
      console.error('Error al modificar la publicación', error);
      alert('Confirme los datos ingresados');
    }
  };

  const formatDateForInput = (date) => {
    return date ? new Date(date).toISOString().slice(0, 10) : '';
  };
  
  return (
    <div>
      <h1>Modificar Postulación</h1>
      {publicacionData && (
        <div>
          <label htmlFor="publicacionSelect">Seleccionar Publicación:</label>
          <select
            id="publicacionSelect"
            value={selectedPublicacion}
            onChange={handleSelectChange}
          >
            <option value="">Seleccione una publicación</option>
            {publicaciones.map((publicacion) => (
              <option key={publicacion._id} value={publicacion._id}>
                {publicacion.titulo}
              </option>
            ))}
          </select>
  
          {/* Paso 1: Imprimir en la consola */}
          {console.log('¿Existe publicacionData?', publicacionData)}
  
          {/* Campos de modificación de la publicación */}
          <form onSubmit={handleSubmit} className="modify-publication-form">
            <div className="mb-3">
              <label htmlFor="titulo" className="form-label">Título:</label>
              <input
                type="text"
                id="titulo"
                value={publicacionData.titulo || ''}
                onChange={(e) => handleInputChange('titulo', e.target.value)}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="descripcion" className="form-label">Descripción:</label>
              <textarea
                id="descripcion"
                value={publicacionData.descripcion || ''}
                onChange={(e) => handleInputChange('descripcion', e.target.value)}
                className="form-control"
                rows="3"
              ></textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="objetivo" className="form-label">Objetivo:</label>
              <input
                type="text"
                id="objetivo"
                value={publicacionData.objetivo || ''}
                onChange={(e) => handleInputChange('objetivo', e.target.value)}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="fecha_inicio" className="form-label">Fecha de inicio:</label>
              <input
                type="date"
                id="fecha_inicio"
                value={formatDateForInput(publicacionData.fecha_inicio)}
                onChange={(e) => handleInputChange('fecha_inicio', e.target.value)}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="fecha_termino" className="form-label">Fecha de término:</label>
              <input
                type="date"
                id="fecha_termino"
                value={formatDateForInput(publicacionData.fecha_termino)}
                onChange={(e) => handleInputChange('fecha_termino', e.target.value)}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="monto" className="form-label">Monto:</label>
              <input
                type="text"
                id="monto"
                value={publicacionData.monto || ''}
                onChange={(e) => handleInputChange('monto', e.target.value)}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="cupos" className="form-label">Cupos:</label>
              <input
                type="number"
                id="cupos"
                value={publicacionData.cupos || ''}
                onChange={(e) => handleInputChange('cupos', e.target.value)}
                className="form-control"
              />
            </div>

            <button type="submit" className="btn btn-primary">Modificar Publicación</button>
          </form>

          <div className="modify-publication-actions">
            <button onClick={() => handleEliminarPublicacion(publicacionData._id)} className="btn btn-danger">Eliminar Publicación</button>
            <button onClick={() => navigate('/publicaciones')} className="btn btn-secondary">Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ModificarPostulacion;