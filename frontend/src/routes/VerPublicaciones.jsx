import React, { useState, useEffect } from 'react';
import { getPublicacion } from '../services/VerPublicaciones.service';

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
    <div>
      <h1>Ver Publicaciones</h1>
      <div>
        <input
          type="text"
          placeholder="Filtrar por título"
          value={filtroTitulo}
          onChange={(e) => setFiltroTitulo(e.target.value)}
        />
      </div>
      <div>
        <select value={ordenamiento || ''} onChange={handleOrdenamientoChange}>
          <option value="">Ordenar por...</option>
          <option value="montoAsc">Monto (Asc)</option>
          <option value="montoDesc">Monto (Desc)</option>
          <option value="cuposAsc"> Cupos (Asc)</option>
          <option value="cuposDesc"> Cupos (Desc)</option>
        </select>
      </div>
      <ul>
        {publicacionesOrdenadas.map((publicacion) => (
          <li key={publicacion._id}>
            <h3>{publicacion.titulo}</h3>
            <p>Descripción: {publicacion.descripcion}</p>
            <p>Objetivo: {publicacion.objetivo}</p>
            <p>Fecha de inicio: {publicacion.fecha_inicio}</p>
            <p>Fecha de término: {publicacion.fecha_termino}</p>
            <p>Monto: {publicacion.monto}</p>
            <p>Cupos: {publicacion.cupos}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VerPublicaciones;