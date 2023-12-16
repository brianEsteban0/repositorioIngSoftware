import { useNavigate } from 'react-router-dom'; 
import { useAuth } from '../../context/AuthContext';
import { getRubricas } from '../../services/rubrics.service'; 
import { useEffect, useState } from 'react';
import { deleteRubrica } from '../../services/rubrics.service';
import { getPublicacion } from '../../services/VerPublicaciones.service';
import axios from '../../services/root.service';

const Rubricas = () => {
    const [data, setData] = useState([]);
    const [publicaciones, setPublicaciones] = useState([]);
    const navigate = useNavigate();

    const fetchData = async () => {
      try {
          const [rubricasResponse, publicacionesResponse] = await Promise.all([
              getRubricas(),
              getPublicacion()
          ]);
          console.log(publicacionesResponse);
          console.log(rubricasResponse.data);
          setData(rubricasResponse.data);
          setPublicaciones(publicacionesResponse);
      } catch (error) {
          console.error("Error al obtener datos", error);
      }
  };

  useEffect(() => {
      fetchData();
  }, []);

    const handleDelete = (id) => {
        const shouldDelete = window.confirm('¿Estás seguro de que deseas eliminar esta rubrica?');

        if (shouldDelete) {
            deleteRubrica(id).then(() => {
                fetchData(); // Vuelve a cargar los datos después de eliminar
            });
        }
    };

    return (
        <div>
            <h1>Rubricas</h1>
            <label className='d-flex justify-content-between align-items-center principal'>
                <button key={"rubrica"} className='btn btn-dark' onClick={() => navigate('/rubricas/generar')}>
                    Generar Rubrica
                </button>
            </label>
            <br /><br />
            <table className="table ">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Criterios</th>
                        <th>Publicacion</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(rubrica => (
                        <tr key={rubrica._id}>
                            <td>{rubrica.name}</td>
                            <td>{rubrica.criteria.length}</td>
                            <td>
                                {publicaciones.map(publicacion => (
                                    rubrica.publicacion === publicacion._id && publicacion.titulo
                                ))}
                            </td>
                            <td>
                                <button className="btn btn-primary" onClick={() => { navigate(`/rubricas/editar/${rubrica._id}`) }}>
                                    Editar
                                </button>
                                {"   "}
                                <button className="btn btn-danger" onClick={() => { handleDelete(rubrica._id) }}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Rubricas;
