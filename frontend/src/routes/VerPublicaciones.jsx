import React, { useState, useEffect } from 'react';
import { fetchPublicaciones } from '../services/VerPublicaciones.service';

function VerPublicaciones() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [filtroFecha, setFiltroFecha] = useState('');
  const [filtroTitulo, setFiltroTitulo] = useState('');

  useEffect(() => {
    obtenerPublicaciones();
  }, []);

  const obtenerPublicaciones = async () => {
    try {
      const data = await fetchPublicaciones();
      setPublicaciones(data);
    } catch (error) {
      console.error('Error fetching publications:', error);
    }
  };

  const filtrarPorFecha = () => {
    if (filtroFecha.trim() === '') {
      return publicaciones;
    }
    return publicaciones.filter(publicacion =>
      publicacion.fecha_termino >= filtroFecha
    );
  };

  const filtrarPorTitulo = () => {
    if (filtroTitulo.trim() === '') {
      return publicaciones;
    }
    return publicaciones.filter(publicacion =>
      publicacion.titulo.toLowerCase().includes(filtroTitulo.toLowerCase())
    );
  };


  const publicacionesFiltradas = filtroFecha
    ? filtrarPorFecha()
    : filtroTitulo
    ? filtrarPorTitulo()
    : publicaciones;

  const publicacionesOrdenadas = publicacionesFiltradas.sort((a, b) =>
    new Date(a.fecha_inicio) - new Date(b.fecha_inicio)
  );

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
        <input
          type="date"
          value={filtroFecha}
          onChange={(e) => setFiltroFecha(e.target.value)}
        />
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
            {/* Resto de la información de la publicación */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VerPublicaciones;