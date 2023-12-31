import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function PublicacionResultados() {
  const navigate = useNavigate();

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col text-center mb-4">
          <h1 className="display-3 text-primary">Explora las Publicaciones de Resultados</h1>
          <p className="lead">
            Descubre, crea y modifica las publicaciones de resultados de tu interés.
          </p>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-md-3 g-4">
        <div className="col">
          <div className="card h-100">
            <div className="card-body">
              <h2 className="card-title display-4 text-info">Ver Publicaciones</h2>
              <p className="card-text">
                Descubre las publicaciones de resultados existentes.
              </p>
              <button
                className="btn btn-outline-primary btn-lg"
                onClick={() => navigate('/publicacion_resultados/ver')}
              >
                Ir a Ver Publicaciones
              </button>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card h-100">
            <div className="card-body">
              <h2 className="card-title display-4 text-success">Crear Publicaciones</h2>
              <p className="card-text">
                Crea nuevas publicaciones de resultados.
              </p>
              <button
                className="btn btn-outline-success btn-lg"
                onClick={() => navigate('/publicacion_resultados/PorPublicacion')}
              >
                Ir a Crear Publicaciones
              </button>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card h-100">
            <div className="card-body">
              <h2 className="card-title display-4 text-warning">Editar Publicaciones</h2>
              <p className="card-text">
                Modifica o elimina publicaciones existentes.
              </p>
              <button
                className="btn btn-outline-warning btn-lg"
                onClick={() => navigate('/publicacion_resultados/modificar')}
              >
                Ir a Editar Publicaciones
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PublicacionResultados;



