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


  const handleGuardarClick = async() => {
     const puntajes = Object.values(scores);
    const scoresAsNumbers = puntajes.map(Number);
    const resultadoData = {
      postulanteRut: evaluacion.postulanteRut,
      rubric: rubrica._id,
      publicacion: id,
      scores: scoresAsNumbers,
      scoretotal: 0 // Obtener los puntajes como array
    };
    try {
    await setResultadoData(resultadoData);
    const response = await updateEvaluacion(rut, resultadoData);
    if (response.status === 200) { 
    
    alert("Puntuacion Registrada con exito");
    navigate(`/evaluacion/postulantes/${id}`);
    }
    // Puedes realizar otras acciones con resultadoData, por ejemplo, enviarlo a un servidor
    console.log("Resultado guardado:", resultadoData);
  }catch(error){
    const errorMessage = error.response?.data.message || 'Error desconocido al editar la rubrica';
    console.error('Error al editar la rubrica', error);
    alert('Error al editar la rubrica: ' + errorMessage);
  }
};

  return (
    <div>
      <h2>Evaluacion Postulante</h2>
      <h4>Rubrica : {rubrica?.name}</h4>
      <h4>Publicacion : {publicacion.titulo}</h4>
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
                  onChange={(e) => {
                    handleScoreChange(criterio._id, e.target.value);
                    
                  }}
                    min="0"
                    max="100"
                    placeholder="puntuacion entre 0 y 100"
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
