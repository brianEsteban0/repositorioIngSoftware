import { useNavigate } from 'react-router-dom'; 
import { useAuth } from '../../context/AuthContext';
import { getRubricas } from '../../services/rubrics.service'; 
import { useEffect, useState } from 'react';
import { deleteRubrica } from '../../services/rubrics.service';
import { obtenerPublicacionById } from '../../services/VerPublicaciones.service';

const Rubricas = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        getRubricas().then((response) => {
            setData(response.data);
            console.log(response.data);
        });
    }, []);
    const navigate = useNavigate();

    const handleDelete = (id) => {
      const shouldDelete = window.confirm('¿Estás seguro de que deseas eliminar esta rubrica?');
  
      if (shouldDelete) {
          deleteRubrica(id).then((response) => {
              console.log(response);
              getRubricas().then((response) => {
                  setData(response.data);
                  console.log(response.data);
              });
          });
      }
  }
    const obtenerPublicacion = async (id) => {
      try {
          console.log(id);
          if (id === undefined) {
              return 'No asignado';
          }
          const response = await obtenerPublicacionById(id);
          console.log(response.data);
          return response.data.titulo;
      } catch (error) {
          console.error('Error al obtener la publicacion', error);
      }
    }

    return (
        <div>
        <h1>Rubricas</h1>
        <div>
         
        </div>
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
          <td>{rubrica.publicacion}</td>
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