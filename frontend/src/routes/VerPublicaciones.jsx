import React, { useState, useEffect } from 'react';
import { getPublicacion } from '../services/VerPublicaciones.service';
import 'bootstrap/dist/css/bootstrap.min.css';

function VerPublicaciones() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [filtroFecha, setFiltroFecha] = useState('');
  const [filtroTitulo, setFiltroTitulo] = useState('');
  const [ordenamiento, setOrdenamiento] = useState(null);

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

  const filtrarPorFecha = () => {
    // Implementa tu lógica de filtrado por fecha aquí
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

  const publicacionesOrdenadas = ordenarPublicaciones();

  return (
    <div className="container" style={{ backgroundColor: '#f5e5d1', padding: '20px' }}>
      <h1 className="mt-4 mb-4">Ver Publicaciones</h1>
      <div className="row">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Filtrar por título"
            value={filtroTitulo}
            onChange={(e) => setFiltroTitulo(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <select className="form-select mb-2" value={ordenamiento || ''} onChange={handleOrdenamientoChange}>
            <option value="">Ordenar por...</option>
            <option value="montoAsc">Monto (Asc)</option>
            <option value="montoDesc">Monto (Desc)</option>
            <option value="cuposAsc">Cupos (Asc)</option>
            <option value="cuposDesc">Cupos (Desc)</option>
          </select>
        </div>
      </div>
      <div className="row" style={{ margin: '20px -5px' }}>
        {publicacionesOrdenadas.map((publicacion) => (
          <div className="col-md-6" key={publicacion._id} style={{ padding: '5px' }}>
            <div className="card mb-4" style={{ border: '1px solid #ccc', backgroundColor: 'white' }}>
              <div className="card-body">
                <h5 className="card-title">{publicacion.titulo}</h5>
                <p className="card-text">Descripción: {publicacion.descripcion}</p>
                <p className="card-text">Objetivo: {publicacion.objetivo}</p>
                <p className="card-text">Fecha de inicio: {publicacion.fecha_inicio}</p>
                <p className="card-text">Fecha de término: {publicacion.fecha_termino}</p>
                <p className="card-text">Monto: {publicacion.monto}</p>
                <p className="card-text">Cupos: {publicacion.cupos}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


export default VerPublicaciones;