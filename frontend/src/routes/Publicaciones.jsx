import { useNavigate } from 'react-router-dom'; 
import { useAuth } from '../context/AuthContext';
import { getPublicacion } from '../services/VerPublicaciones.service';
import React, { useState, useEffect } from 'react';

function Publicaciones() {
  const [publicaciones, setPublicaciones] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    obtenerPublicaciones();
  }, []);

  const obtenerPublicaciones = async () => {
    try {
      const data = await getPublicacion();
      if (data) {
        setPublicaciones(data);
      }
    } catch (error) {
      console.error('Error fetching publications:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="mt-4">Publicaciones</h1>
      <div className="mt-4">
        <button className="btn btn-primary me-3" onClick={() => navigate('/publicaciones/ver')}>
          Ver publicaciones
        </button>
        <button className="btn btn-primary me-3" onClick={() => navigate('/publicaciones/agregar')}>
          Agregar publicaciones
        </button>
        <button className="btn btn-primary" onClick={() => navigate('/publicaciones/modificar')}>
          Modificar publicaciones
        </button>
      </div>
    </div>
  );
}

export default Publicaciones;