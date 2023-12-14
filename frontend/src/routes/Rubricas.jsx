import { useNavigate } from 'react-router-dom'; 
import { useAuth } from '../context/AuthContext';
import { getRubricas } from '../services/rubrics.service'; 
import { useEffect, useState } from 'react';

const Rubricas = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        getRubricas().then((response) => {
            setData(response.data);
            console.log(response.data);
        });
    }, []);
    const navigate = useNavigate();

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
          <th>Publicacion</th>
          <th>Capital Bursatil (en millones de USD)</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map(rubrica=>{
          return(
            <tr key={rubrica._id}>
          <td>{rubrica.name}</td>
          <td>{rubrica.name}</td>
          <td>brrrr</td>
          <td>
                <button className="btn btn-primary" onClick={()=>{}}>Editar</button>
                {"   "}
                <button className="btn btn-danger" onClick={()=>{}}>Eliminar</button>
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