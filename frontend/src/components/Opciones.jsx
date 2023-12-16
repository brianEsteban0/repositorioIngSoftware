import './EstilosOPciones.css';
import { useAuth } from '../context/AuthContext';
import React from 'react';
import { useNavigate } from 'react-router-dom';


function Opciones() {
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="row">
    {user.roles[0].name === 'admin' && (
      <div className="col-4 mb-3">
        <button
          key="rubrica"
          className="options btn btn-success"
          onClick={() => navigate('/rubricas')}
        >
          Rubricas
        </button>
      </div>
    )}

    <div className="col-4 mb-3">
      <button
        key="publicacion"
        className="options btn btn-success"
        onClick={() => navigate('/publicaciones')}
      >
        Publicaciones
      </button>
    </div>

    <div className="col-4 mb-3">
      <button
        key="evaluacion"
        className="options btn btn-success"
        onClick={() => navigate('/evaluacion')}
      >
        Evaluación
      </button>
    </div>

    <div className="col-4 mb-3">
      <button key="postular" className="options">
        Postular
      </button>
    </div>

    <div className="col-4 mb-3">
      <button
        key="publicacion_resultados"
        className="options btn btn-success"
        onClick={() => navigate('/publicacion_resultados')}
      >
        Publicación de Resultados
      </button>
    </div>
  </div>
  );
}

export default Opciones;
