import {getPublicacion} from '../../services/VerPublicaciones.service';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function EvaluarPostulante(){
    const [publicaciones, setPublicaciones] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        getPublicacion().then((response) => {
            setPublicaciones(response);
            console.log(response);
        });
    }, []);
    return(
        <div>
            <h1>Postulantes por publicacion</h1>
            <table className="table ">
      <thead>
        <tr>
          <th>Titulo</th>
          <th>fechainicio</th>
          <th>Periodo de Evaluacion</th>
          <th>Cantidad de Postulante</th>
          <th>Ver Porsulantes</th>
          
        </tr>
      </thead>
      <tbody>
        {publicaciones.map(publicacion=>{
          return(
            <tr key={publicacion._id}>
          <td>{publicacion.titulo}</td>
          <td>{publicacion.fecha_inicio}</td>
          <td>{publicacion.fecha_termino === "Plazo vencido" ? "Iniciado" : publicacion.fecha_termino}</td>
          <td>{publicacion.cupos}/1</td>
          <td>
                <button className="btn btn-primary" onClick={()=>{navigate(`/evaluacion/postulantes/${publicacion._id}`)}} disabled={publicacion.fecha_termino != "Plazo vencido"}>Ver</button>
            
          </td>
          </tr>
          )
        })}
      </tbody>
    </table>
        </div>
    )
}

export default EvaluarPostulante;