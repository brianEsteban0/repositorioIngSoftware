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
          className="buton buton-block success"
          onClick={() => navigate('/rubricas')}
        >
          Rubricas
        </button>
      </div>
    )}
    {user.roles[0].name === 'admin' && (
    <div className="col-4 mb-3">
      <button
        key="publicacion"
        className="buton buton-block success"
        onClick={() => navigate('/publicaciones')}
      >
        Publicaciones
      </button>
    </div>
    )}

    <div className="col-4 mb-3">
      <button
        key="evaluacion"
        className="buton buton-block success"
        onClick={() => navigate('/evaluacion')}
      >
        Evaluación
      </button>
    </div>

    <div className="col-4 mb-3">
      <button key="postular" 
      className="buton buton-block success"
      onClick={() => navigate('/postulacion')}
      >Postular</button>
    </div>

    <div className="col-4 mb-3">
      <button
        key="publicacion_resultados"
        className="buton buton-block success"
        onClick={() => navigate('/publicacion_resultados')}
      >Publicación de Resultados
      </button>
    </div>

    <div className="col-4 mb-3">
      <button
        key="publicacion_resultados"
        className="buton buton-block success"
        onClick={() => navigate('/resultados')}
      >Ganadores
      </button>
    </div>
  </div>
  );
}

export default Opciones;
