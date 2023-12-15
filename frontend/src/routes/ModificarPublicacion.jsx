import { getPublicacion } from '../services/VerPublicaciones.service';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ModificarPostulacion() {
    const [publicaciones, setPublicaciones] = useState([]);
    const navigate = useNavigate();
  
    useEffect(() => {
      obtenerPublicaciones();
    }, []);
  
    const obtenerPublicaciones = async () => {
      try {
        const response = await getPublicacion();
        setPublicaciones(response);
      } catch (error) {
        console.error('Error al obtener las publicaciones', error);
      }
    };
  
    const handleEliminarPublicacion = async (id) => {
      // Lógica para eliminar la publicación con el ID proporcionado
      try {
        // Lógica para eliminar la publicación según el ID
        alert(`Publicación con ID ${id} eliminada`);
        // Puedes agregar aquí la llamada a la función para eliminar la publicación con el servicio correspondiente
      } catch (error) {
        console.error('Error al eliminar la publicación', error);
      }
    };
  
    return (
      <div>
        <h1>Modificar Postulación</h1>
        <ul>
          {publicaciones.map(publicacion => (
            <li key={publicacion._id}>
              <h3>{publicacion.titulo}</h3>
              {/* Botón para modificar la publicación */}
              <button onClick={() => navigate(`/modificar/postulacion/${publicacion._id}`)}>
                Modificar Postulación
              </button>
              {/* Botón para eliminar la publicación */}
              <button onClick={() => handleEliminarPublicacion(publicacion._id)}>
                Eliminar Postulación
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default ModificarPostulacion;