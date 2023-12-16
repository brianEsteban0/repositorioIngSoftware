import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerPublicacionById, getPublicacion, actualizarPublicacion  } from '../services/VerPublicaciones.service'; // Reemplaza con tu lógica de servicio
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = `${date.getDate()}`.padStart(2, '0'); // Día en formato de 2 dígitos
    const month = `${date.getMonth() + 1}`.padStart(2, '0'); // Mes en formato de 2 dígitos
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  

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
      return listaPublicaciones || []; // Asegúrate de que la respuesta coincida con la lista de publicaciones esperada
    } catch (error) {
      console.error('Error al obtener la lista de publicaciones', error);
      return [];
    }
  };

  const handleEliminarPublicacion = async (id) => {
    try {
      // Lógica para eliminar la publicación con el ID proporcionado
      alert(`Publicación con ID ${id} eliminada`);
      // Puedes agregar aquí la llamada a la función para eliminar la publicación con el servicio correspondiente
    } catch (error) {
      console.error('Error al eliminar la publicación', error);
    }
  };
  

  const handleSelectChange = async (event) => {
    setSelectedPublicacion(event.target.value);
    try {
      // Obtener los detalles de la publicación seleccionada por su ID
      const response = await obtenerPublicacionById(event.target.value);
      console.log('Datos de la publicación:', response); // Paso 2: Imprimir en la consola
  
      // Actualizar el estado con los datos de la publicación seleccionada
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
      const { _id, ...postData } = publicacionData; // Suponiendo que publicacionData contiene el ID de la publicación
  
      const updatedPublication = await axios.put(`/publicaciones/${_id}`, postData);
      console.log('Publicación actualizada:', updatedPublication.data);
      
      // Haz lo que necesites con los datos actualizados, por ejemplo, actualizar el estado local, mostrar un mensaje, etc.
      alert('Publicación modificada con éxito');
      navigate('/publicaciones');
    } catch (error) {
      console.error('Error al modificar la publicación', error);
      // Manejo de errores: mostrar un mensaje al usuario, realizar un rollback de cambios, etc.
      alert('Error al modificar la publicación');
    }
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
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="titulo">Titulo:</label>
              <input
                type="text"
                id="titulo"
                value={publicacionData.titulo || ''}
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
              <label htmlFor="fecha_inicio">Fecha de inicio:</label>
              <input
                type="date"
                id="fecha_inicio"
                value={publicacionData.fecha_inicio || ''}
                onChange={(e) => handleInputChange('fecha_inicio', e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="fecha_termino">Fecha de termino:</label>
              <input
                type="date"
                id="fecha_termino"
                value={publicacionData.fecha_termino || ''}
                onChange={(e) => handleInputChange('fecha_termino', e.target.value)}
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
            <button type="submit">Modificar Publicación</button>
          </form>
        </div>
      )}
      <button onClick={() => navigate('/publicaciones')}>Cancelar</button>
    </div>
  );
}
export default ModificarPostulacion;