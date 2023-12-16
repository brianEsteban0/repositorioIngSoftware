import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getPostulanteByRut,
  deleteEvaluacion,
  getEvaluacion,
} from "../../services/Evaluacion.service";
import { getRubricaById } from "../../services/rubrics.service";
import { useNavigate } from "react-router-dom";
function EvalPostulante() {
  const { rut } = useParams();
  const navigate = useNavigate();
  const [postulante, setPostulante] = useState([]);
  const [evaluacion, setEvaluacion] = useState([]);
  const [rubrica, setRubrica] = useState([]);
  const [resultado, setResultado] = useState([]);
  useEffect(() => {
    getPostulanteByRut(rut).then((response) => {
      setPostulante(response.data);
      response.data === null
        ? deleteEvaluaciones(rut)
        : console.log("no se puede eliminar");
    });
    getEvaluacion(rut).then((response) => {
      setEvaluacion(response.data);
      console.log("ok");
      getRubricaById(response.data.rubric).then((response) => {
        setRubrica(response.data);
        console.log("ok");
      });
    });
  }, []);

  const deleteEvaluaciones = (id) => {
    const shouldDelete = window.confirm(
      "Postulante no encontrado ¿Eliminar Evaluacion?"
    );

    if (shouldDelete) {
      deleteEvaluacion(id);
      window.history.back();
    }
  };

  return (
    <div>
      <h1>EvalPostulante</h1>
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
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <button className="btn btn-primary">Editar</button>
              {"   "}
              <button className="btn btn-danger">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button className="btn btn-primary" onClick={() => window.history.back()}>
        Volver atras
      </button>
    </div>
  );
}

export default EvalPostulante;
