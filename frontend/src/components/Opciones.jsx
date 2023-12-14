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
        <div>
          <button key={"publicacion"} className='options'>Publicaciones</button>
          <button key={"evaluacion"} className='options'>Evaluacion</button>
          <button key={"postular"} className='options'>Postular</button>
        </div>
    </div>
  );
}

export default Opciones;
