import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEvaluacionByPostulacion } from "../../services/evaluacion.service";
import { obtenerPublicacionById} from "../../services/VerPublicaciones.service";
import { useNavigate } from 'react-router-dom';
function EvalPosPPublicaion() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [evaluaciones, setEvaluaciones] = useState([]);
    const [publicacion, setPublicacion] = useState([]);
    useEffect(() => {
        getEvaluacionByPostulacion(id).then((response) => {
            setEvaluaciones(response.data);
            console.log(response.data);
            
        });
        obtenerPublicacionById(id).then((response) => {
          console.log(response);
          setPublicacion(response);
      });
    }, []);
  return (
    <div>
      <h1>{publicacion.titulo}</h1>
      <table className="table ">
      <thead>
        <tr>
          <th>Rut</th>
          <th></th>
          <th>Evaluado</th>
          <th>Puntaje</th>
          <th>Acciones</th>
          
        </tr>
      </thead>
      <tbody>
        {evaluaciones?.map(evaluacion=>{
          return(
            <tr key={evaluacion._id}>
          <td>{evaluacion.postulanteRut}</td>
          <td></td>
          <td>{(evaluacion.scoretotal === 0)? <>No</> : <>Sí</>}</td>
          <td>{evaluacion.scoretotal}</td>
          <td>
                <button className="btn btn-primary" onClick={()=>{navigate(`/evaluacion/evaluar/${id}/${evaluacion.postulanteRut}`)}}>Evaluar</button>
                <button className="btn btn-info" onClick={()=>{navigate(`/evaluacion/ver-postulante/${evaluacion.postulanteRut}`)}}>Ver Postulante</button>
          </td>
          </tr>
          )
        })}
      </tbody>
    </table>
    <button className="btn btn-primary" onClick={() => navigate("/evaluacion")}>Volver atras</button>
    </div>
  );
}

export default EvalPosPPublicaion;