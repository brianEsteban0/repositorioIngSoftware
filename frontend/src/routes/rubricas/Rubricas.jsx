import { useNavigate } from 'react-router-dom'; 
import { useAuth } from '../../context/AuthContext';
import { getRubricas } from '../../services/rubrics.service'; 
import { useEffect, useState } from 'react';
import { deleteRubrica } from '../../services/rubrics.service';
import axios from '../../services/root.service';

const Rubricas = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        getRubricas().then((response) => {
            setData(response.data);
        });
    }, []);

    const [publicaciones, setPublicaciones] = useState([]);
    useEffect(() => {
      const fetchPublicaciones = async () => {
        try {
          const response = await axios.get('/publicaciones');
          setPublicaciones(response.data.data);
        } catch (error) {
          console.error('Error al obtener las publicaciones', error);
        }
      };
      fetchPublicaciones();
    }, []);
    

    const handleDelete = (id) => {
      const shouldDelete = window.confirm('¿Estás seguro de que deseas eliminar esta rubrica?');
  
      if (shouldDelete) {
          deleteRubrica(id).then((response) => {
              console.log(response);
              getRubricas().then((response) => {
                  setData(response.data);
              });
          });
      }
  }

    return (
        <div>
        <h1>Rubricas</h1>
        <label>
            <button key={"rubrica"} 
          onClick={() => navigate('/rubricas/generar')}
            >Generar Rubrica</button>
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
        {data.map(rubrica=>{
          return(
            <tr key={rubrica._id}>
          <td>{rubrica.name}</td>
          <td>{rubrica.criteria.length}</td>
          <td>{publicaciones.map(publicacion =>{if (rubrica.publicacion === publicacion._id) 
            return(publicacion.titulo)
          })}</td>
          <td>
                <button className="btn btn-primary" onClick={()=>{navigate(`/rubricas/editar/${rubrica._id}`)}}>Editar</button>
                {"   "}
                <button className="btn btn-danger" onClick={()=>{handleDelete(rubrica._id)}}>Eliminar</button>
          </td>
          </tr>
          )
        })}
      </tbody>
    </table>

        </div>
    );
}

export default Rubricas;