import React from 'react';
import { useState, useEffect } from 'react';
import {  obtenerPublicacionById, getPublicacion    } from '../services/VerPublicaciones.service';
import { useNavigate } from 'react-router-dom';

function Postulacion() {
  const navigate = useNavigate();
  const [publicaciones, setPublicaciones] = useState([]);

  useEffect(() => {
    obtenerPublicaciones();
  }, []);

  const obtenerPublicaciones = async () => {
    try {
      const response = await getPublicacion();
      setPublicaciones(response);
    } catch (error) {
      console.error('Error al obtener las publicaciones:', error);
    }
  };

  const handlePostular = async (id) => {
    try {
      const publicacion = await obtenerPublicacionById(id);
      navigate(`/postulacion/formulario/${publicacion._id}`);
    } catch (error) {
      console.error('Error al obtener la publicación:', error);
    }
  };

  return (
    <div>
      <h1>Postulacion</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Cupos</th>
            <th>Titulo</th>
            <th>Monto</th>
            <th>Fecha limite Postulacion</th>
            <th>Postular</th>
          </tr>
        </thead>
        <tbody>
          {publicaciones.map((publicacion) =>
            publicacion.fecha_termino !== 'Plazo vencido' ? (
              <tr key={publicacion._id}>
                <td>{publicacion.cupos}</td>
                <td>{publicacion.titulo}</td>
                <td>{publicacion.monto}</td>
                <td>{publicacion.fecha_termino}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => handlePostular(publicacion._id)}>
                    Postular
                  </button>
                  <button className="btn btn-info">i</button>
                </td>
              </tr>
            ) : null
          )}
        </tbody>
      </table>
      <button className="btn btn-primary" onClick={() => navigate('/')}>
        Volver atras
      </button>
    </div>
  );
}

export default Postulacion;