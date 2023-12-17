import React from 'react';
import { useState, useEffect } from 'react';
import {  getPublicacion  } from '../services/VerPublicaciones.service';
import { useNavigate } from 'react-router-dom';

function Postulacion() {
  const navigate = useNavigate();
  const [publicaciones, setPublicaciones] = useState([]);

  useEffect(() => {
    getPublicacion().then((response) => {
      setPublicaciones(response);
      console.log(response);
    });
  }, []);

  const handlePostular = (id) => {
    navigate(`/formulario-postulacion/${id}`);
  };
  const postular = (publicacionId) => {
    navigate(`/postulacion/formulario/${publicacionId}`);
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
          {publicaciones?.map((publicacion) =>
            publicacion.fecha_termino !== 'Plazo vencido' ? (
              <tr key={publicacion._id}>
                <td>{publicacion.cupos}</td>
                <td>{publicacion.titulo}</td>
                <td>{publicacion.monto}</td>
                <td>{publicacion.fecha_termino}</td>
                <td>
                  {/* Botón "Postular" para redirigir usando navigate */}
                  <button className="btn btn-primary" onClick={() => postular(publicacion._id)}>Postular</button>
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