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
    <div className="container" style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1>Formulario de Postulación</h1>
      <form onSubmit={handleSubmit}>
        {/* Aquí coloca los campos del formulario según tu modelo */}
        <label htmlFor="organizacion">Organización:</label>
        <input
          type="text"
          id="organizacion"
          value={postulanteData.Organizacion}
          onChange={(e) => handleInputChange('Organizacion', e.target.value)}
        />
        {/* Aquí coloca los campos del formulario según tu modelo */}
        <label htmlFor="descripcion">Descripcion:</label>
        <input
          type="text"
          id="descripcion"
          value={postulanteData.descripcion}
          onChange={(e) => handleInputChange('descripcion', e.target.value)}
        />
        <label htmlFor="Ubicación">Ubicación:</label>
        <input
          type="text"
          id="Ubicación"
          value={postulanteData.Ubicación}
          onChange={(e) => handleInputChange('Ubicación', e.target.value)}
        />
        <label htmlFor="Representante">Representante:</label>
        <input
          type="text"
          id="Representante"
          value={postulanteData.Representante}
          onChange={(e) => handleInputChange('Representante', e.target.value)}
        />
        <label htmlFor="Rut_Representante">Rut_Representante:</label>
        <input
          type="text"
          id="Rut_Representante"
          value={postulanteData.Rut_Representante}
          onChange={(e) => handleInputChange('Rut_Representante', e.target.value)}
        />
        <label htmlFor="Rut_Organizacion">Rut_Organizacion:</label>
        <input
          type="text"
          id="Rut_Organizacion"
          value={postulanteData.Rut_Organizacion}
          onChange={(e) => handleInputChange('Rut_Organizacion', e.target.value)}
        />
        <label htmlFor="Telefono">:</label>
        <input
          type="text"
          id="Telefono"
          value={postulanteData.Telefono}
          onChange={(e) => handleInputChange('Telefono', e.target.value)}
        />
        <label htmlFor="Correo">:</label>
        <input
          type="text"
          id="Correo"
          value={postulanteData.Correo}
          onChange={(e) => handleInputChange('Correo', e.target.value)}
        />
        <label htmlFor="publicacionn">pub:</label>
        <input
          type="text"
          id="publicacionn"
          value={postulanteData.publicacion}
          onChange={(e) => handleInputChange('publicacion', e.target.value)}
        />
        <button type="submit">Enviar Postulación</button>
      </form>
    </div>
  );
}

export default FormularioPostulacion;