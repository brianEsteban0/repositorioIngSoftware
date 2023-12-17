import React, { useState, useEffect } from 'react';
import { fetchPublicacionesResultados } from '../../services/VerPublicacionResultados.service';


function VerPublicacionesResultados() {
    const [publicaciones, setPublicaciones] = useState([]);
    const [filtroTitulo, setFiltroTitulo] = useState('');

    useEffect(() => {
        getPublicacionesResultados();
    }, []);

    const getPublicacionesResultados = async () => {
        try {
            const data = await fetchPublicacionesResultados();
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

    const ordenarPorTitulo = () => {
        const copiaPublicaciones = [...publicaciones];
        copiaPublicaciones.sort((a, b) => a.Titulo.localeCompare(b.Titulo));
        return copiaPublicaciones;
    };

    const publicacionesFiltradas = filtroTitulo
    ? filtrarPorTitulo()
    : publicaciones;

    return (
        <div>
            <h1>Ver Publicaciones de Resultados</h1>
            <div>
                <input
                    type="text"
                    placeholder="Filtrar por título"
                    value={filtroTitulo}
                    onChange={(e) => setFiltroTitulo(e.target.value)}
                />
            </div>
            <ul>
                {publicacionesFiltradas.map(publicacionresultado => (
                    <li key={publicacionresultado._id}>
                        <h3>{publicacionresultado.Titulo}</h3>
                        <p>Descripción de la publicacion: {publicacionresultado.Descripcion}</p>
                        <p>Nombre de la Organización: {publicacionresultado.Organizacion}</p>
                        <p>Nombre del representante: {publicacionresultado.Representante}</p>
                        <p>Rut del representante: {publicacionresultado.Rut_Representante}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default VerPublicacionesResultados;