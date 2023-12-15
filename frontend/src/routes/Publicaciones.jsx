import { useNavigate } from 'react-router-dom'; 
import { useAuth } from '../context/AuthContext';
import { fetchPublicaciones } from '../services/VerPublicaciones.service';
import React, { useState, useEffect } from 'react';

function Publicaciones() {
    const [publicaciones, setPublicaciones] = useState([]);
  
    useEffect(() => {
      obtenerPublicaciones();
    }, []);
    const navigate = useNavigate();
    
    const obtenerPublicaciones = () => {
      fetchPublicaciones()
        .then((data) => {
          setPublicaciones(data);
        })
        .catch((error) => {
          console.error('Error fetching publications:', error);
        });
    };
  
    return (
      <div>
        <h1>Publicaciones</h1>
        <label>
            <button key={"publicaciones"} 
          onClick={() => navigate('/publicaciones/ver')}
            >Ver publicaciones</button>
            <button key={"publicaciones"} 
          onClick={() => navigate('/publicaciones/agregar')}
            >Agregar publicaciones</button>
          <button key={"publicaciones"} 
          onClick={() => navigate('/publicaciones/modificar')}
            >Modificar publicaciones</button>
            
        </label>
        <ul>
        </ul>
      </div>
    );
  }

export default Publicaciones;