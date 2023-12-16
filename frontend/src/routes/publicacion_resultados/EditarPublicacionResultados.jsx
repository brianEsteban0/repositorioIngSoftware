import { getPublicacionResultados } from '../../services/VerPublicacionResultados.service';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function EditarPublicacionResultados() {
    const [publicaciones, setPublicaciones] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getPublicacionesResultados();
    }, []);

    const getPublicacionesResultados = async () => {
        try {
            const response = await getPublicacionResultados();
            setPublicaciones(response);
        } catch (error) {
            console.error('Error al obtener las publicaciones', error);
        }
    };

    const handleEliminarPublicacionResultados = async (id) => {
        // Lógica para eliminar la publicación con el ID proporcionado
        try {
            // Lógica para eliminar la publicación según el ID
            alert(`Publicación con ID ${id} eliminada`);
            // Puedes agregar aquí la llamada a la función para eliminar la publicación con el servicio correspondiente
        } catch (error) {
            console.error('Ooops! Error al eliminar la publicación de Resultados', error);
        }
    };

    return (
        <div>
            <h1>Editar Publicación de Resultados</h1>
            <ul>
                {publicaciones.map(publicacionresultado => (
                    <li key={publicacionresultado._id}>
                        <h3>{publicacionresultado.titulo}</h3>
                        {/* Botón para modificar la publicación */}
                        <button onClick={() => navigate(`editar/publicacion_resultados/${publicacionresultado._id}`)}>
                            Editar Publicación de Resultados
                        </button>
                        {/* Botón para eliminar la publicación */}
                        <button onClick={() => handleEliminarPublicacionResultados(publicacionresultado._id)}>
                            Eliminar Publicación de Resultados
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default EditarPublicacionResultados;