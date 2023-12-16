import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './CrearPublicacionResultados.css';

const PublicacionResultadoForm = () => {
    const [publicacionData, setPublicacionData] = useState({
        Titulo: '',
        Descripcion: '',
        Organizacion: '',
        Representante: '',
        Rut_Representante: '',
    });

    const navigate = useNavigate();

    const handleInputChange = (field, value) => {
        setPublicacionData({ ...publicacionData, [field]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = 'http://localhost:3000/api/publicacion_resultados';
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(publicacionData),
        };

        try {
            const response = await fetch(url, options);
            if (response.ok) {
                alert('Publicación de resultados creada con éxito');
                navigate('/publicacion_resultados');
            } else {
                alert('Ooops! Hubo un problema al crear la publicación de resultados, intente nuevamente');
            }
        } catch (error) {
            alert('Ooops! Ha ocurrido un error al crear la publicación de resultados, intente nuevamente');
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="Titulo">Titulo:</label>
                <input
                    type="text"
                    id="Titulo"
                    value={publicacionData.Titulo}
                    onChange={(e) => handleInputChange('Titulo', e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="Descripcion">Descripción:</label>
                <input
                    type="text"
                    id="Descripcion"
                    value={publicacionData.Descripcion}
                    onChange={(e) => handleInputChange('Descripcion', e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="Organizacion">Organización:</label>
                    <input
                        type="text"
                        id="Organizacion"
                        value={publicacionData.Organizacion}
                        onChange={(e) => handleInputChange('Organizacion', e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="Representante">Representante:</label>
                    <input
                        type="text"
                        id="Representante"
                        value={publicacionData.Representante}
                        onChange={(e) => handleInputChange('Representante', e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="Rut_Representante">Rut de Representante:</label>
                    <input
                        type="text"
                        id="Rut_Representante"
                        value={publicacionData.Rut_Representante}
                        onChange={(e) => handleInputChange('Rut_Representante', e.target.value)}
                    />
                </div>
                <button type="submit">Crear Publicacion de Resultados</button>
            </form>
            <button onClick={() => navigate('/publicacion_resultados')}>Cancelar</button>
        </div>
    );
};

export default PublicacionResultadoForm;