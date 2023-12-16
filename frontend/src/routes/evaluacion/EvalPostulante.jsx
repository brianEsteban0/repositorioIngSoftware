import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getPostulanteByRut,
  deleteEvaluacion,
  getEvaluacion,
  updateEvaluacion,
} from "../../services/Evaluacion.service";
import { obtenerPublicacionById } from "../../services/VerPublicaciones.service";
import { getRubricaByIdPublicacion } from "../../services/rubrics.service";
import { useNavigate } from "react-router-dom";
function EvalPostulante() {
  const { id,rut } = useParams();
  const navigate = useNavigate();
  const [postulante, setPostulante] = useState([]);
  const [evaluacion, setEvaluacion] = useState([]);
  const [rubrica, setRubrica] = useState([]);
  const [publicacion, setPublicacion] = useState([]);
  const [scores, setScores] = useState({});
  const [resultadoData, setResultadoData] = useState({
    postulanteRut: "",
    rubric: "",
    publicacion: "",
    scores: [],
  });
  useEffect(() => {
    getPostulanteByRut(rut).then((response) => {
      setPostulante(response.data);
      console.log(response.data);
      response.data === null
        ? deleteEvaluaciones(rut)
        : console.log("no se puede eliminar");
    });
    getEvaluacion(rut).then((response) => {
        console.log(response.data);
      setEvaluacion(response.data);
    });
        getRubricaByIdPublicacion(id).then((response) => {
        console.log(response.data);
        if (response.data === null) {
            const shouldDelete = window.confirm(
                "Rubrica no encontrada Asignar Rubrica a Publicacion"
              );
          
              if (shouldDelete) {
                window.history.back();
              }
        }
        setRubrica(response.data);
      });
        obtenerPublicacionById(id).then((response) => {
        setPublicacion(response);
        console.log(response);
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

  const handleScoreChange = (criterioId, value) => {
    setScores((prevScores) => ({
      ...prevScores,
      [criterioId]: value,
    }));
  };

  const handleGuardarClick = () => {
     const puntajes = Object.values(scores);
    const scoresAsNumbers = puntajes.map(Number);
    const resultadoData = {
      postulanteRut: evaluacion.postulanteRut,
      rubric: evaluacion.rubric,
      publicacion: evaluacion.publicacion,
      scores: scoresAsNumbers,
      scoretotal: 0 // Obtener los puntajes como array
    };
    setResultadoData(resultadoData);
    updateEvaluacion(rut, resultadoData);
    alert("Puntuacion Registrada con excito");
    navigate(`/evaluacion/postulantes/${id}`);
    // Puedes realizar otras acciones con resultadoData, por ejemplo, enviarlo a un servidor
    console.log("Resultado guardado:", resultadoData);
  };

  return (
    <div>
      <h2>Evaluacion Postulante</h2>
      <h4>Rubrica {rubrica?.name}</h4>
      <h4>Publicacion {publicacion.titulo}</h4>
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Puntaje</th>
          </tr>
        </thead>
        <tbody>
          {rubrica?.criteria?.map((criterio) => (
            <tr key={criterio._id}>
              <td>{criterio.name}</td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  value={scores[criterio._id] || ""}
                  onChange={(e) =>
                    handleScoreChange(criterio._id, e.target.value)}
                    min="0"
                    max="100"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-primary" onClick={handleGuardarClick}>
        Guardar
      </button>
      <button className="btn btn-primary" onClick={() => window.history.back()}>
        Volver atras
      </button>
    </div>
  );
}

export default EvalPostulante;
