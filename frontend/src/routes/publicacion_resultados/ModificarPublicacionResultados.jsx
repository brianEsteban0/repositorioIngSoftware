import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPublicacionResultadoById, getPublicacionResultados } from '../../services/VerPublicacionResultados.service';
import axios from '../../services/root.service';

function ModificarPublicacionResultados() {
    const [publicaciones, setPublicaciones] = useState([]);
    const [selectedPublicacion, setSelectedPublicacion] = useState('');
    const [publicacionData, setPublicacionData] = useState({
        Titulo: '',
        Descripcion: '',
        Objetivo: '',
        Organizacion: '',
        Representante: '',
        Rut_Representante: '',
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
            const listaPublicaciones = await getPublicacionResultados();
            return listaPublicaciones || [];
        } catch (error) {
            console.error('Error al obtener la lista de publicaciones', error);
            return [];
        }
    };

    const handleEliminarPublicacion = async (id) => {
        try {
            const response = await axios.delete(`/publicacion_resultados/${id}`);
            if (response.status === 200) {
                alert(`Publicación con ID ${id} eliminada`);
                navigate('/publicacion_resultados');
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
            //obtener los detalles de la publicación seleccionada por su ID
            const response = await getPublicacionResultadoById(event.target.value);
            console.log('Datos de la publicacion',response);

            // Actualiar el estado de la publicación seleccionada
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
            const { _id, ...PostData} = publicacionData;

            const updatedPublication = await axios.put(`/publicacion_resultados/${_id}`, PostData);
            console.log('Publicación actualizada', updatedPublication.data);

            alert('Publicación actualizada con éxito');
            navigate('/publicacion_resultados');
        } catch (error) {
            console.error('Error al actualizar la publicación', error);
            alert('Error al actualizar la publicación, intente nuevamente o más tarde');
        }
    };

    return (
        <div>
            <h1>Modificar Publicacion Resultados</h1>
            {publicacionData && (
                <div>
                    <label htmlFor="publicacionSelect">Seleccione una publicación:</label>
                    <select
                        id="publicacionSelect"
                        value={selectedPublicacion}
                        onChange={handleSelectChange}
                    >
                        <option value="">Seleccione una publicación</option>
                        {publicaciones.map((publicacion) => (
                            <option key={publicacion._id} value={publicacion._id}>
                                {publicacion.Titulo}
                            </option>
                        ))}
                    </select>
                    {/* Paso 1: Imprimir en la consola los datos de la publicación seleccionada */}
                    {console.log('¿Qué datos tiene la publicación seleccionada?', publicacionData)}

                    {/* Paso 3: Agrega aquí los otros campos de la publicación que necesitas editar */}
                    <form onSubmit={handleSubmit} className="modify-publication-form">
                        <div className="mb-3">
                            <label htmlFor="Titulo" className="form-label">Titulo:</label>
                            <input
                                type="text"
                                id="Titulo"
                                value={publicacionData.Titulo}
                                onChange={(e) => handleInputChange('Titulo', e.target.value)}
                                className="form-control"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="Descripcion" className="form-label">Descripción:</label>
                            <textarea
                                id="descripcion"
                                value={publicacionData.Descripcion || ''}
                                onChange={(e) => handleInputChange('Descripcion', e.target.value)}
                                className="form-control"
                                rows="5"
                            ></textarea>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="Objetivo" className="form-label">Objetivo:</label>
                            <input
                                type="text"
                                id="Objetivo"
                                value={publicacionData.Objetivo || ''}
                                onChange={(e) => handleInputChange('Objetivo', e.target.value)}
                                className="form-control"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="Organizacion" className="form-label">Organización:</label>
                            <input
                                type="text"
                                id="Organizacion"
                                value={publicacionData.Organizacion || ''}
                                onChange={(e) => handleInputChange('Organizacion', e.target.value)}
                                className="form-control"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="Representante" className="form-label">Representante:</label>
                            <input
                                type="text"
                                id="Representante"
                                placeholder="Ingrese el representante..."
                                value={publicacionData.Representante}
                                onChange={(e) => handleInputChange('Representante', e.target.value)}
                                className="form-control"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="Rut_Representante" className="form-label">Rut Representante:</label>
                            <input
                                type="text"
                                id="Rut_Representante"
                                value={publicacionData.Rut_Representante || ''}
                                placeholder="Ingrese el rut del representante..."
                                className="form-control"
                            />
                        </div>

                        <button type="submit" className="btn btn-primary">Modificacion Publicación Resultados</button>
                    </form>

                    <div className="modify-publication-actions">
                        <button onClick={() => handleEliminarPublicacion(publicacionData._id)} className="btn btn-danger">Eliminar Publicación Resultados</button>
                        <button onClick={() => navigate('/publicacion_resultados')} className="btn btn-secondary">Cancelar</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ModificarPublicacionResultados;