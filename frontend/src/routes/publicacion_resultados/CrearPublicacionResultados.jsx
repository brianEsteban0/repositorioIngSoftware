import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../services/root.service';
import { Modal, Button, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getResultadosByPostulacion } from '../../services/resultados.service';
import { getPostulanteById } from '../../services/evaluacion.service';

const PublicacionResultadoForm = () => {
  const [publicacionData, setPublicacionData] = useState({
    Titulo: '',
    Descripcion: '',
    Organizacion: '',
    Representante: '',
    Resultado: '',
  });

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { id } = useParams();
  const [resultados, setResultados] = useState([]);
  const [postulante, setPostulante] = useState([]);
  const [resultadoData, setResultadoData] = useState([]);

  useEffect(() => {
    getResultadosByPostulacion(id).then((response) => {
      setResultados(response.data);
      console.log(response.data);
    });
  }, []);

  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setPublicacionData({ ...publicacionData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (publicacionData.Titulo && publicacionData.Descripcion && publicacionData.Resultado) {
      setShowConfirmationModal(true);
    } else {
      setErrorMessage('Por favor, completa los campos obligatorios (Titulo, Descripcion, Resultado)');
      setShowErrorModal(true);
    }
  };

  const handleConfirm = async () => {
    try {
      await axios.get('/resultadosPorPostulacion/:idPostulacion', publicacionData);
      await axios.post('/publicacion_resultados/', publicacionData);
      setSuccessMessage('Publicación creada con éxito');
      setShowSuccessModal(true);
      navigate('/publicacion_resultados');
    } catch (error) {
      console.error('Error al crear la publicación de resultados', error);
      setErrorMessage('Error al crear la publicación de resultados');
      setShowErrorModal(true);
    } finally {
      setShowConfirmationModal(false);
    }
  };

  const handleCancel = () => {
    setShowConfirmationModal(false);
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const handleGanador = async (id , result) => {
    try {
      const response = await getPostulanteById(id);
      setPostulante(response.data);
      setResultadoData(result);
      console.log(response.data);
      console.log(result);
    } catch (error) {
      console.error('Error al seleccionar el ganador', error);
      setErrorMessage('Error al seleccionar el ganador');
      setShowErrorModal(true);
    }
}

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <h1 className="mb-4 text-center">Crear Publicación de Resultados</h1>
          <table className="table ">
      <thead>
        <tr>
          <th>Puntaje </th>
          <th>Ganador</th>
          <th></th>
          
        </tr>
      </thead>
      <tbody>
        {resultados?.map(resultado=>{

            return (
              <tr key={resultado._id}>
                <td>{resultado.puntaje_total}</td>
                <td>{(resultado.ganador)? "Si" : "No" }</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => { handleGanador(resultado.postulante, resultado); }}
                  >
                    Seleccionar Ganador
                  </button>
                </td>

              </tr>
            );
        })}
      </tbody>
    </table>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor="Titulo" className="form-label">Título:</label>
              <input
                type="text"
                className="form-control"
                id="Titulo"
                placeholder="Ingrese el Título de la Publicación..."
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
                placeholder="Ingrese una Descripción para la Publicación..."
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
                placeholder="Ingrese el Nombre de la Organización..."
                value={postulante.Organizacion || ''}
                onChange={(e) => handleInputChange('Organizacion', e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Representante" className="form-label">Representante:</label>
              <input
                type="text"
                className="form-control"
                id="Representante"
                placeholder="Ingrese el Nombre del Representante..."
                value={postulante.Representante || ''}
                onChange={(e) => handleInputChange('Representante', e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Resultado" className="form-label">Resultado:</label>
              <select
                className="form-select"
                id="Resultado"
                value={resultadoData.ganador || ''}
                onChange={(e) => handleInputChange('Resultado', e.target.value)}
              >
                <option value="" disabled>Selecciona una opción</option>
                <option value="true">Beneficiario</option>
                <option value="false">No Beneficiario</option>
              </select>
            </div>

            {/* Ventana modal de confirmación */}
            <Modal show={showConfirmationModal} onHide={handleCancel} centered>
              <Modal.Header closeButton>
                <Modal.Title>Confirmar Acción</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                ¿Estás seguro de agregar esta publicación?
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCancel}>
                  Cancelar
                </Button>
                <Button variant="primary" onClick={handleConfirm}>
                  Confirmar
                </Button>
              </Modal.Footer>
            </Modal>

            {/* Ventana modal de éxito */}
            <Modal show={showSuccessModal} onHide={handleCloseSuccessModal} centered>
              <Modal.Header closeButton>
                <Modal.Title>Éxito</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Alert variant="success">
                  {successMessage}
                </Alert>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseSuccessModal}>
                  Cerrar
                </Button>
              </Modal.Footer>
            </Modal>

            {/* Ventana modal de error */}
            <Modal show={showErrorModal} onHide={handleCloseErrorModal} centered>
              <Modal.Header closeButton>
                <Modal.Title>Error</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Alert variant="danger">
                  {errorMessage}
                </Alert>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseErrorModal}>
                  Cerrar
                </Button>
              </Modal.Footer>
            </Modal>

            <div className="d-grid gap-2">
              <button className="btn btn-primary" type="submit">Crear Publicación de Resultados</button>
              <button className="btn btn-secondary" onClick={() => navigate('/publicacion_resultados')}>Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PublicacionResultadoForm;
