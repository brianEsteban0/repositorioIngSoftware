import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { fetchPublicacionesResultados } from '../../services/VerPublicacionResultados.service';
import { useState, useEffect } from 'react';

function PublicacionResultados() {
    const [publicaciones, setPublicaciones] = useState([]);

    useEffect(() => {
        obtenerPublicaciones();
    }, []);

    const navigate = useNavigate();

    const obtenerPublicaciones = () => {
        fetchPublicacionesResultados()
            .then((data) => {
                setPublicaciones(data);
            })
            .catch((error) => {
                console.error('Error fetching publications:', error);
            });
    };

    return (
        <div>
            <h1>Publicaciones de resultados</h1>
            <label>
                <button key={"publicaciones1"} onClick={() => navigate('/publicacion_resultados/ver')}>
                    Ver publicaciones
                </button>
                <button key={"publicaciones2"} onClick={() => navigate('/publicacion_resultados/crear')}>
                    Crear publicaciones
                </button>
                <button key={"publicaciones3"} onClick={() => navigate('/publicacion_resultados/modificar')}>
                    Editar publicaciones
                </button>
            </label>
            <ul></ul>
        </div>
    );
}

export default PublicacionResultados;