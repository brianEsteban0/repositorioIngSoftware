import React, { useState, useEffect } from 'react';
import { getPublicacion } from '../services/VerPublicaciones.service';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function VerPublicaciones() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [filtroFecha, setFiltroFecha] = useState('');
  const [filtroTitulo, setFiltroTitulo] = useState('');
  const [ordenamiento, setOrdenamiento] = useState(null);
  const [expandedPublication, setExpandedPublication] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    obtenerPublicaciones();
  }, []);

  const obtenerPublicaciones = async () => {
    try {
      const data = await getPublicacion();
      setPublicaciones(data);
    } catch (error) {
      console.error('Error fetching publications:', error);
    }
  };
  

  const filtrarPorTitulo = () => {
    if (filtroTitulo.trim() === '') {
      return publicaciones;
    }
    return publicaciones.filter(publicacion =>
      publicacion.titulo.toLowerCase().includes(filtroTitulo.toLowerCase())
    );
  };

  const ordenarPorCupos = (publicaciones) => {
    if (ordenamiento === 'cuposAsc') {
      return publicaciones.slice().sort((a, b) => a.cupos - b.cupos);
    } else if (ordenamiento === 'cuposDesc') {
      return publicaciones.slice().sort((a, b) => b.cupos - a.cupos);
    }
    return publicaciones;
  };

  const ordenarPublicaciones = () => {
    let publicacionesFiltradas = filtroFecha
      ? filtrarPorFecha()
      : filtroTitulo
      ? filtrarPorTitulo()
      : publicaciones;

    if (ordenamiento === 'montoAsc') {
      publicacionesFiltradas = publicacionesFiltradas.sort((a, b) => a.monto - b.monto);
    } else if (ordenamiento === 'montoDesc') {
      publicacionesFiltradas = publicacionesFiltradas.sort((a, b) => b.monto - a.monto);
    } else if (ordenamiento === 'cuposAsc' || ordenamiento === 'cuposDesc') {
      publicacionesFiltradas = ordenarPorCupos(publicacionesFiltradas);
    }

    return publicacionesFiltradas;
  };

  const handleOrdenamientoChange = (e) => {
    const selectedOrdenamiento = e.target.value;
    setOrdenamiento(selectedOrdenamiento === ordenamiento ? null : selectedOrdenamiento);
  };

  const handleExpandirPublicacion = (publicacionId) => {
    setExpandedPublication(publicacionId === expandedPublication ? null : publicacionId);
  };

  const publicacionesOrdenadas = ordenarPublicaciones();

  const postular = (publicacionId) => {
    navigate(`/postulacion/formulario/${publicacionId}`);
  };

  const obtenerMasInformacion = (publicacionId) => {
    // TODO: Implement obtenerMasInformacion logic
  };

  return (
    <div className="container" style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <div className="row">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Filtrar por título"
            value={filtroTitulo}
            onChange={(e) => setFiltroTitulo(e.target.value)}
            style={{ backgroundColor: '#FFFFFF', color: '#333', border: '1px solid #C5AFA0' }}
          />
        </div>
        <div className="col-md-6">
          <select
            className="form-select mb-2"
            value={ordenamiento || ''}
            onChange={handleOrdenamientoChange}
            style={{ backgroundColor: '#FFFFFF', color: '#333', border: '1px solid #C5AFA0' }}
          >
            <option value="">Ordenar por...</option>
            <option value="montoAsc">Monto (Asc)</option>
            <option value="montoDesc">Monto (Desc)</option>
            <option value="cuposAsc">Cupos (Asc)</option>
            <option value="cuposDesc">Cupos (Desc)</option>
          </select>
        </div>
      </div>

      <div className="row justify-content-center" style={{ margin: '20px -5px' }}>
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
                  <h5 className="card-title" style={{ color: '#1C2938', marginBottom: '5px', fontSize: '16px', fontWeight: 'bold' }}>{publicacion.titulo}</h5>
                  <p className="card-text" style={{ marginBottom: '5px', fontSize: '14px' }}>Fecha de inicio: {publicacion.fecha_inicio}</p>
                  <p className="card-text" style={{ marginBottom: '5px', fontSize: '14px' }}>Fecha de término: {publicacion.fecha_termino}</p>
                  <p className="card-text" style={{ marginBottom: '5px', fontSize: '14px' }}>Cupos: {publicacion.monto}</p>
                  <p className="card-text" style={{ marginBottom: '5px', fontSize: '14px' }}>Cupos: {publicacion.cupos}</p>
                </div>
                {expandedPublication === publicacion._id && (
                  <div style={{ marginTop: '14px' }}>
                    <p className="card-text">Descripción: {publicacion.descripcion}</p>
                    <p className="card-text">Objetivo: {publicacion.objetivo}</p>
                  </div>
                )}
                {/* Botones para Postular y Obtener más información */}
                <div className="d-flex justify-content-end mt-auto">
                  <div className="d-grid gap-2">
                  <button className="btn btn-primary" onClick={() => postular(publicacion._id)}>Postular</button>
                    <button className="btn btn-secondary" onClick={() => obtenerMasInformacion(publicacion._id)}>Obtener más información</button>
                  </div>
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

export default VerPublicaciones;