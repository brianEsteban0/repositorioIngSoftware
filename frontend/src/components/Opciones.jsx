import './EstilosOPciones.css';
import { useAuth } from '../context/AuthContext';
import React from 'react';
import { useNavigate } from 'react-router-dom';


function Opciones() {
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <div>
      {user.roles[0].name === 'admin' ? (
        <button key={"rubrica"} className='options'
          onClick={() => navigate('/rubricas')}
        >Rubricas</button>
      ) : (<></>)}

          <button key={"publicacion"} className='options'
          onClick={() => navigate('/publicaciones')}
          >Publicaciones</button>
          <button key={"evaluacion"} className='options'>Evaluacion</button>
          <button key={"postular"} className='options'>Postular</button>
          <button key={"publicacion_resultados"} className='options'onClick={() => navigate('/publicacion_resultados')}>Publicacion de Resultados</button>

    </div>
  );
}

export default Opciones;
