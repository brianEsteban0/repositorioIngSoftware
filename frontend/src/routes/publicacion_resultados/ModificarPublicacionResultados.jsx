import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPublicacionResultadoById, getPublicacionResultados } from '../../services/VerPublicacionResultados.service';
import axios from '../../services/root.service';
import { Modal, Button } from 'react-bootstrap';

function ModificarPublicacionResultados() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [selectedPublicacion, setSelectedPublicacion] = useState('');
  const [publicacionData, setPublicacionData] = useState({
    Titulo: '',
    Descripcion: '',
    Organizacion: '',
    Representante: '',
    Resultado: '',
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

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
    const selectedId = event.target.value;
    setSelectedPublicacion(selectedId);

    if (selectedId) {
      try {
        const response = await getPublicacionResultadoById(selectedId);
        setPublicacionData(response);
      } catch (error) {
        console.error('Error al obtener los detalles de la publicación', error);
      }
    } else {
      // Reiniciar datos si no hay ninguna publicación seleccionada
      setPublicacionData({
        Titulo: '',
        Descripcion: '',
        Organizacion: '',
        Representante: '',
        Resultado: '',
      });
    }
  };

  const handleInputChange = (field, value) => {
    setPublicacionData({ ...publicacionData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedPublication = await axios.put(`/publicacion_resultados/${selectedPublicacion}`, publicacionData);
      alert('Publicación modificada con éxito');
      navigate('/publicacion_resultados');
    } catch (error) {
      console.error('Error al modificar la publicación', error);
      alert('Confirme los datos ingresados');
    }
  };

  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleDeleteConfirmation = () => {
    handleEliminarPublicacion(selectedPublicacion);
    handleCloseDeleteModal();
  };

  const handleShowCancelModal = () => setShowCancelModal(true);
  const handleCloseCancelModal = () => setShowCancelModal(false);

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
            className="form-select"
          >
            <option value="">Seleccione una publicación</option>
            {publicaciones.map((publicacion) => (
              <option key={publicacion._id} value={publicacion._id}>
                {publicacion.Titulo}
              </option>
            ))}
          </select>

          <form onSubmit={handleSubmit} className="modify-publication-form">
            <div className="mb-3">
              <label htmlFor="Titulo" className="form-label">Titulo:</label>
              <input
                type="text"
                id="Titulo"
                value={publicacionData.Titulo || ''}
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
                value={publicacionData.Representante || ''}
                onChange={(e) => handleInputChange('Representante', e.target.value)}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Resultado" className="form-label">Resultado:</label>
              <select
                className="form-select"
                id="Resultado"
                value={publicacionData.Resultado || ''}
                onChange={(e) => handleInputChange('Resultado', e.target.value)}
              >
                <option value="" disabled>Selecciona una opción</option>
                <option value="Beneficiario">Beneficiario</option>
                <option value="No Beneficiario">No Beneficiario</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary">Modificar Publicación Resultados</button>
          </form>

          <div className="modify-publication-actions">
            <button onClick={handleShowDeleteModal} className="btn btn-danger">
              Eliminar Publicación Resultados
            </button>
            <button onClick={handleShowCancelModal} className="btn btn-secondary">
              Cancelar
            </button>
          </div>
        </div>
      )}

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Publicación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Está seguro de que desea eliminar esta publicación?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirmation}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showCancelModal} onHide={handleCloseCancelModal}>
        <Modal.Header closeButton>
          <Modal.Title>Cancelar Modificación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Está seguro de que desea cancelar la modificación de esta publicación?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCancelModal}>
            No
          </Button>
          <Button variant="primary" onClick={() => navigate('/publicacion_resultados')}>
            Sí
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModificarPublicacionResultados;

