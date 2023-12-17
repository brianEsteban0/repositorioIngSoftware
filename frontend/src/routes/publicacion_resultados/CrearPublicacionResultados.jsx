import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../services/root.service';
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
        const confirmation = window.confirm('¿Estás seguro de agregar esta publicación?');
        if (!confirmation) return;

        try {
            await axios.post('/publicacion_resultados/', publicacionData);
            alert('Publicación creada con éxito');
            navigate('/publicacion_resultados');
        } catch (error) {
            console.error('Error al crear la publicación de resultados', error);
            alert('Error al crear la publicación de resultados');
        }
    };

    return (
        <div className="container my-5">
            <h1 className="mb-4">Crear Publicación de Resultados</h1>
            <form onSubmit={handleSubmit}>
            <div className='mb-3'>
    <label htmlFor="Titulo" className="form-label">Titulo:</label>
    <input
        type="text"
        className="form-control"
        id="Titulo"
        placeholder="Título de la Publicación..."
        value={publicacionData.Titulo}
        onChange={(e) => handleInputChange('Titulo', e.target.value)}
    />
</div>
<div className="mb-3">
    <label htmlFor="Descripcion" className="form-label">Descripción:</label>
    <input
        type="text"
        className="form-control"
        id="Descripcion"
        placeholder="Ingrese una descripción a la publicación..."
        value={publicacionData.Descripcion}
        onChange={(e) => handleInputChange('Descripcion', e.target.value)}
    />
</div>
<div className="mb-3">
    <label htmlFor="Organizacion" className="form-label">Organización:</label>
    <input
        type="text"
        className="form-control"
        id="Organizacion"
        placeholder="Ingrese el nombre de la Organización..."
        value={publicacionData.Organizacion}
        onChange={(e) => handleInputChange('Organizacion', e.target.value)}
    />
</div>
<div className="mb-3">
    <label htmlFor="Representante" className="form-label">Representante:</label>
    <input
        type="text"
        className="form-control"
        id="Representante"
        placeholder="Ingrese el nombre del Representante..."
        value={publicacionData.Representante}
        onChange={(e) => handleInputChange('Representante', e.target.value)}
    />
</div>
<div className="mb-3">
    <label htmlFor="Rut_Representante" className="form-label">Rut de Representante:</label>
    <input
        type="text"
        className="form-control"
        id="Rut_Representante"
        placeholder="xxxxxxxx-x"
        value={publicacionData.Rut_Representante}
        onChange={(e) => handleInputChange('Rut_Representante', e.target.value)}
    />
</div>
                <div className="d-grid gap-2">
                    <button className="btn btn-primary" type="submit">Crear Publicacion de Resultados</button>
                    <button className="btn btn-secondary" onClick={() => navigate('/publicacion_resultado')}>Cancelar</button>
                </div>
            </form>
        </div>
    );
};
export default PublicacionResultadoForm;