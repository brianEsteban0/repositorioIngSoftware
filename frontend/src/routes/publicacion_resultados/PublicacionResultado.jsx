import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getPublicacionResultados } from "../../services/VerPublicacionResultados.service";
import { useEffect, useState } from "react";
import { deletePublicacionResultado } from "../../services/VerPublicacionResultados.service";
/*
function PublicacionResultados() {
    const [data, setData] = useState([]);
    useEffect(() => {
        getPublicacionResultados();
    }, []);

    const getPublicacionResultados = () => {
        getPublicacionResultados()
        .then((data) => {
            setData(data);
        })
        .catch((error) => {
            console.error('Error fetching publications:', error);
        });
*/
function PublicacionResultados() {
    const [data, setData] = useState([]);

    useEffect(() => {
        getPublicacionResultados().then((response) => {
            setData(response.data);
            console.log(response.data);
        });
    }, []);

    const publicacionResultadosDelete = (id) => {
        const shouldDelete = window.confirm('¿Estás seguro de que deseas eliminar esta publicacion?');

        if (shouldDelete) {
            deletePublicacionResultado(id).then((response) => {
                console.log(response);
                getPublicacionResultados().then((response) => {
                    setData(response.data);
                });
            });
        }
    }

            return (
                <div>
                <h1>Publicacion de Resultados</h1>
                <ul>
                {data.map((publicacionresultado) => (
                    <li key={publicacionresultado._id}>
                    <h3>{publicacionresultado.titulo}</h3>
                    <p>Descripción: {publicacionresultado.descripcion}</p>
                    <p>Organización: {publicacionresultado.organizacion}</p>
                    <p>Nombre de representante: {publicacionresultado.representante}</p>
                    <p>Rut de representante: {publicacionresultado.rut_representante}</p>
                    {/* Agrega aquí los demás campos del modelo */}
                    <button key={"publicacionresultado"}
                    onClick={() => navigate(`/publicacion_resultados/editar/${publicacionresultado._id}`)}
                    >Editar</button>
                    <button key={"publicacionresultado"}
                    onClick={() => publicacionResultadosDelete(publicacionresultado._id)}
                    >Eliminar</button>
                    </li>
                    ))}
                </ul>
            </div>
        );
    }

export default PublicacionResultados;