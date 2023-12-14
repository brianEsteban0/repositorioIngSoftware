import { useNavigate } from 'react-router-dom'; 
import { useAuth } from '../context/AuthContext';
import { fetchPublicaciones } from '../services/VerPublicaciones.service';
import React, { useState, useEffect } from 'react';

function Publicaciones() {
    const [publicaciones, setPublicaciones] = useState([]);
  
    useEffect(() => {
      obtenerPublicaciones();
    }, []);
  
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
        <ul>
        {publicaciones.map((publicacion) => (
              <li key={publicacion._id}>
                <h3>{publicacion.titulo}</h3>
                <p>Descripción: {publicacion.descripcion}</p>
                <p>Objetivo: {publicacion.objetivo}</p>
                <p>Fecha de inicio: {publicacion.fecha_inicio}</p>
                <p>Fecha de término: {publicacion.fecha_termino}</p>
                <p>Monto: {publicacion.monto}</p>
                <p>Cupos: {publicacion.cupos}</p>
                {/* Agrega aquí los demás campos del modelo */}
              </li>
            ))}
        </ul>
      </div>
    );
  }

export default Publicaciones;