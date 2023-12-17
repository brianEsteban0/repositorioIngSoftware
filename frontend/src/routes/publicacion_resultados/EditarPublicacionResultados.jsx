import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';



const EditarPublicacionResultados = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [selectedPublicacion, setSelectedPublicacion] = useState({
        Titulo: '',
        // Otros campos de la publicación
    });

    useEffect(() => {
        const fetchSelectedPublicacion = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/publicacion_resultados/${id}`);
                setSelectedPublicacion(response.data);
            } catch (error) {
                console.error('Error al obtener la publicación para editar', error);
                setSelectedPublicacion({});
            }
        };
        fetchSelectedPublicacion();
    }, [id]);


    const handleInputChange = (field, value) => {
        setSelectedPublicacion({ ...selectedPublicacion, [field]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/api/publicacion_resultados/${id}`, selectedPublicacion);
            alert('Publicación editada con éxito');
            navigate('/publicacion_resultados');
        } catch (error) {
            console.error('Error al editar la publicación', error);
            alert('Error al editar la publicación');
        }
    };

    return (
        <div>
            <h1>Editar Publicación de Resultados</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="titulo">Título:</label>
                    <input
                        type="text"
                        id="titulo"
                        value={selectedPublicacion.Titulo}
                        onChange={(e) => handleInputChange('Titulo', e.target.value)}
                    />
                </div>
                {/* Agrega aquí los otros campos de la publicación que necesitas editar */}
                <button type="submit">Guardar Cambios</button>
            </form>
            <button onClick={() => navigate('/publicacion_resultados')}>Cancelar</button>
        </div>
    );
};

export default EditarPublicacionResultados;