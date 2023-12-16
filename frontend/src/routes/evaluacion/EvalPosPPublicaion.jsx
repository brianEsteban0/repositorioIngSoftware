import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEvaluacionByPostulacion } from "../../services/Evaluacion.service";
import { useNavigate } from 'react-router-dom';
function EvalPosPPublicaion() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [evaluaciones, setEvaluaciones] = useState([]);
    useEffect(() => {
        getEvaluacionByPostulacion(id).then((response) => {
            setEvaluaciones(response.data);
            console.log(response.data);
        });
    }, []);
  return (
    <div>
      <h1>Evaluacion Por Publicacion</h1>
      <table className="table ">
      <thead>
        <tr>
          <th>Rut</th>
          <th>fechainicio</th>
          <th>Periodo de Evaluacion</th>
          <th>Cantidad de Postulante</th>
          <th>Ver Postulantes</th>
          
        </tr>
      </thead>
      <tbody>
        {evaluaciones.map(evaluacion=>{
          return(
            <tr key={evaluacion._id}>
          <td>{evaluacion.postulanteRut}</td>
          <td></td>
          <td></td>
          <td></td>
          <td>
                <button className="btn btn-primary" onClick={()=>{navigate(`/evaluacion/evaluar/${evaluacion.postulanteRut}`)}}>Evaluar</button>
                <button className="btn btn-info" onClick={()=>{navigate(`/evaluacion/ver-postulante/${evaluacion.postulanteRut}`)}}>Ver Postulante</button>
          </td>
          </tr>
          )
        })}
      </tbody>
    </table>
    <button className="btn btn-primary" onClick={() => window.history.back()}>Volver atras</button>
    </div>
  );
}

export default EvalPosPPublicaion;