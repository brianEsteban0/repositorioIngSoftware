import React, { useState, useEffect } from 'react';
import { getPublicacionResultados } from '../../services/VerPublicacionResultados.service';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function VerPublicacionesResultados() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [filtroTitulo, setFiltroTitulo] = useState('');
  const [ordenamiento, setOrdenamiento] = useState(null);
  const [expandedPublication, setExpandedPublication] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getPublicacionesResultados();
  }, []);

  const getPublicacionesResultados = async () => {
    try {
      const data = await getPublicacionResultados();
      setPublicaciones(data);
    } catch (error) {
      console.error('Error fetching publications:', error);
    }
  };

  const filtrarPorTitulo = () => {
    if (filtroTitulo.trim() === '') {
      return publicaciones;
    }
    return publicaciones.filter(publicacionresultado =>
      publicacionresultado.Titulo.toLowerCase().includes(filtroTitulo.toLowerCase())
    );
  };

  const ordenenarPorOrganizacion = (publicaciones) => {
    if (ordenamiento === 'organizacionAsc') {
      return publicaciones.slice().sort((a, b) => a.organizacion - b.organizacion);
    } else if (ordenamiento === 'organizacionDesc') {
      return publicaciones.slice().sort((a, b) => b.organizacion - a.organizacion);
    }
    return publicaciones;
  };

  const ordenarPublicaciones = () => {
    let publicacionesFiltradas = filtroTitulo
      ? filtrarPorTitulo()
      : publicaciones;

    if (ordenamiento === 'organizacionAsc') {
      publicacionesFiltradas = publicacionesFiltradas.sort((a, b) => a.monto - b.monto);
    } else if (ordenamiento === 'organizacionDesc') {
      publicacionesFiltradas = publicacionesFiltradas.sort((a, b) => b.monto - a.monto);
    } else {
      publicacionesFiltradas = ordenenarPorOrganizacion(publicacionesFiltradas);
    }

    return publicacionesFiltradas;
  };

  const handleOrdenamientoCharge = (e) => {
    const selectedOrdenamiento  = e.target.value;
    setOrdenamiento(selectedOrdenamiento === ordenamiento ? null : selectedOrdenamiento);
  };

  const handleExpandirPublicacion = (publicacionId) => {
    setExpandedPublication(publicacionId === expandedPublication ? null : publicacionId);
  };

  const publicacionesOrdenadas = ordenarPublicaciones();

  const resultados = (publicacionId) => {
    // TODO: implementar
  };

  return (
    <div className="container" style={{ fontFamily: 'Arial, sans-serif', padding: '20px'}}>
      <div className="row">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Buscar por título"
            value={filtroTitulo}
            onChange={(e) => setFiltroTitulo(e.target.value)}
            style={{ backgroundColor: '#FFFFFF', color: '#333', border: '1px solid #C5AFA0' }}
          />
        </div>
        <div className="col-md-6">
          <select
            className="form-control mb-2"
            value={ordenamiento || ''}
            onChange={handleOrdenamientoCharge}
            style={{ backgroundColor: '#FFFFFF', color: '#333', border: '1px solid #C5AFA0' }}
          >
            <option value="">Ordenar por...</option>
            <option value="organizacionAsc">Organización (Ascendente)</option>
            <option value="organizacionDesc">Organización (Descendente)</option>
          </select>
        </div>
      </div>

      <div className="row justify-content-center" style={{ margin: '20px -5px'}}>
        {publicacionesOrdenadas.map((publicacion) => (
          <div
            className="col-md-6 mb-3"
            key={publicacion._id}
            style={{ padding: '10px', cursor: 'pointer' }}
            onClick={() => handleExpandirPublicacion(publicacion._id)}
          >
            <div className="card" style={{ border: '1px solid #E1E8ED', backgroundColor: '#FFFFFF', color: '#1C2938' }}>
              <div className="card-body d-flex flex-column">
                <div>
                  <h5 className="card-title" style={{ color: '#1C2938', marginBottom: '5px', fontSize: '16px', fontWeight: 'bold' }}>{publicacion.Titulo}</h5>
                  <p className="card-text" style={{ marginBottom: '5px', fontSize: '14px'}}>Organizacion: {publicacion.Organizacion}</p>
                  <p className="card-text" style={{ marginBottom: '5px', fontSize: '14px'}}>Representante: {publicacion.Representante}</p>
                </div>
                {expandedPublication === publicacion._id && (
                  <div style={{ marginTop: '14px' }}>
                    <p className="card-text">Descripción: {publicacion.Descripcion}</p>
                    <p className="card-text">Resultado: {publicacion.Resultado}</p>
                  </div>
                )}
                {/* Botones para Ver Resultado */}
                <div className="d-flex justify-content-end mt-auto">
  <button className="btn btn-primary" onClick={() => resultados(publicacion._id)}>Resultados</button>
</div>

                <button
                  className="btn btn-info"
                  style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    zIndex: '9999'
                  }}
                  onClick={() => navigate(-1)}
                >
                  Volver
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VerPublicacionesResultados;
