import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../services/root.service';


function FormularioPostulacion({ publicacionId }) {
  const navigate = useNavigate();
  const [postulanteData, setPostulanteData] = useState({
    // Define aquí los campos del formulario del postulante según tu modelo
    Organizacion: '',
    descripcion: '',
    Ubicación: '',
    Representante: '',
    Rut_Representante: '',
    Rut_Organizacion: '',
    Telefono: '',
    Correo: '',
    publicacion: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Aquí se realiza la solicitud POST utilizando Axios
      console.log( postulanteData);
      const response = await axios.post('/postulante',postulanteData);
  
      // Si la solicitud se realiza con éxito, puedes manejar la respuesta aquí
      console.log('Respuesta del servidor:', response.data);
  
      // Redirigir a alguna página de confirmación o a donde desees después del envío exitoso
      navigate('/');
    } catch (error) {
      // Manejo de errores en caso de que la solicitud falle
      console.error('Error al enviar la postulación:', error);
      // Puedes mostrar un mensaje de error o tomar otras acciones aquí
    }
  };

  const handleInputChange = (field, value) => {
    setPostulanteData({ ...postulanteData, [field]: value });
  };

  return (
    <div className="container mt-5">
      <h1>Formulario de Postulación</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="organizacion" className="form-label">Organización:</label>
          <input
            type="text"
            className="form-control"
            id="organizacion"
            value={postulanteData.Organizacion}
            onChange={(e) => handleInputChange('Organizacion', e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">Descripción:</label>
          <input
            type="text"
            className="form-control"
            id="descripcion"
            value={postulanteData.descripcion}
            onChange={(e) => handleInputChange('descripcion', e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Ubicación" className="form-label">Ubicación:</label>
          <input
            type="text"
            className="form-control"
            id="Ubicación"
            value={postulanteData.Ubicación}
            onChange={(e) => handleInputChange('Ubicación', e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Representante" className="form-label">Representante:</label>
          <input
            type="text"
            className="form-control"
            id="Representante"
            value={postulanteData.Representante}
            onChange={(e) => handleInputChange('Representante', e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Rut_Representante" className="form-label">Rut Representante:</label>
          <input
            type="text"
            className="form-control"
            id="Rut_Representante"
            value={postulanteData.Rut_Representante}
            onChange={(e) => handleInputChange('Rut_Representante', e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Rut_Organizacion" className="form-label">Rut Organización:</label>
          <input
            type="text"
            className="form-control"
            id="Rut_Organizacion"
            value={postulanteData.Rut_Organizacion}
            onChange={(e) => handleInputChange('Rut_Organizacion', e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Telefono" className="form-label">Teléfono:</label>
          <input
            type="text"
            className="form-control"
            id="Telefono"
            value={postulanteData.Telefono}
            onChange={(e) => handleInputChange('Telefono', e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Correo" className="form-label">Correo:</label>
          <input
            type="text"
            className="form-control"
            id="Correo"
            value={postulanteData.Correo}
            onChange={(e) => handleInputChange('Correo', e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="publicacion" className="form-label">Publicación:</label>
          <input
            type="text"
            className="form-control"
            id="publicacion"
            value={postulanteData.publicacion}
            onChange={(e) => handleInputChange('publicacion', e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Enviar Postulación</button>
      </form>
    </div>
  );
}
export default FormularioPostulacion;