import './EstilosOPciones.css';
import { useAuth } from '../context/AuthContext';
import React from 'react';


function Opciones() {
  const { user } = useAuth();
  return (
    <div>
      {user.roles[0].name === 'admin' ? (
        <button key={"rubrica"} className='options'>Rubricas</button>
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
