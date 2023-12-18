import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getResultado ,updateResultado} from "../../services/resultados.service";
import { obtenerPublicacionById } from "../../services/VerPublicaciones.service";
import { getRubricaById } from "../../services/rubrics.service";
import {
  getPostulanteById,
  getEvaluacion,
} from "../../services/evaluacion.service";

function ResultadoPostulantes() {
  const id = useParams();
  console.log(id.id);
  const [resultado, setResultado] = useState([]);
  const [publicacion, setPublicacion] = useState([]);
  const [rubrica, setRubrica] = useState([]);
  const [postulante, setPostulante] = useState([]);
  const [evaluacion, setEvaluacion] = useState([]);

  const navigate = useNavigate();
  const [resultadoData, setResultadoData] = useState({
    estadoEvaluacion: "",
    ganador: null,
    postulacion: "",
    postulante: "",
    puntaje_total: 0,
    rubrica: "",
  });
  useEffect(() => {
    console.log(id, "id");
    getResultado(id?.id).then((response) => {
      setResultado(response?.data);

      // Obtén datos relacionados después de obtener el resultado
      const obtenerDatosRelacionados = async () => {
        try {
          const publicacionResponse = await obtenerPublicacionById(
            response.data?.postulacion
          );
          setPublicacion(publicacionResponse);
          console.log(publicacionResponse, "asdasasdasdasdas");

          const rubricaResponse = await getRubricaById(response?.data?.rubrica);
          setRubrica(rubricaResponse?.data);

          const postulanteResponse = await getPostulanteById(
            response.data?.postulante
          );
          setPostulante(postulanteResponse?.data);

          const evaluacionResponse = await getEvaluacion(
            postulanteResponse?.data.Rut_Representante
          );
          setEvaluacion(evaluacionResponse?.data);

          // Configura los datos iniciales después de obtener todos los datos relacionados
          const datosIniciales = {
            estadoEvaluacion: "Pendiente",
            ganador: null,
            postulacion: response.data.postulacion,
            postulante: response.data.postulante,
            puntaje_total: response.data.puntaje_total,
            rubrica: response.data.rubrica,
          };
          setResultadoData(datosIniciales);
        } catch (error) {
          console.error("Error al obtener datos relacionados:", error);
        }
      };

      // Llama a la función para obtener datos relacionados
      obtenerDatosRelacionados();
    });
  }, []);

  const handleInputChange = (field, value) => {
    setResultadoData({ ...resultadoData, [field]: value });
  };
  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      updateResultado(id?.id, resultadoData);
      alert("Datos enviados correctamente");
    } catch (error) {
      alert("Error al enviar datos");
    }
  };
  return (
    <div>
      <h1>Resultado de Postulantes</h1>
      <div className="container">
        <div className="mb-3">
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th scope="col">Postulante</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Representante</td>
                <td>{postulante?.Representante}</td>
              </tr>
              <tr>
                <td>Rut</td>
                <td>{postulante?.Rut_Representante}</td>
              </tr>
              <tr>
                <td>Telefono</td>
                <td>{postulante?.Telefono}</td>
              </tr>
              <tr>
                <td>Descripcion</td>
                <td>{postulante?.descripcion}</td>
              </tr>
            </tbody>
            <div></div>
          </table>
          <div>
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th scope="col">Publicacion</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Titulo</td>
                  <td>{publicacion?.titulo}</td>
                </tr>
                <tr>
                  <td>Monto</td>
                  <td>{publicacion?.monto}</td>
                </tr>
                <tr>
                  <td>Objetivo</td>
                  <td>{publicacion?.objetivo}</td>
                </tr>
                <tr>
                  <td>Descripcion</td>
                  <td>{publicacion?.descripcion}</td>
                </tr>
              </tbody>
            </table>
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th scope="col">Rubrica</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Titulo</td>
                  <td>{rubrica?.name}</td>
                </tr>
                {rubrica?.criteria?.map((criterio, index) => (
                  <tr key={index}>
                    <td>{criterio?.name}</td>
                    <td>{evaluacion?.scores?.[index]}</td>
                  </tr>
                ))}
                <tr>
                  <td>Puntaje Total</td>
                  <td>{resultado?.puntaje_total}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <form className="my-4" onSubmit={handleSubmit}>
          <div>
            <div>
              <label htmlFor="estadoEvaluacion">Estado :</label>
              <select
                id="estadoEvaluacion"
                value={resultadoData.estadoEvaluacion}
                className="form-select"
                onChange={(e) =>
                  handleInputChange("estadoEvaluacion", e.target.value)
                }
              >
                <option value="" disabled>
                  Selecciona estado
                </option>
                <option value="Pendiente" key="Pendiente">
                  Pendiente
                </option>
                <option value="Finalizada" key="Finalizacion">
                  Finalizadan
                </option>
                <option value="En Revision" key="En Revision">
                  En Revision
                </option>
              </select>
            </div>
            <div>
              <label htmlFor="ganador">Resultado:</label>
              <select
                id="ganador"
                value={resultadoData.ganador}
                className="form-select"
                onChange={(e) => handleInputChange("ganador", e.target.value)}
              >
                <option value={""} key="null">
                  Sin Resultado
                </option>
                <option value={true} key="true">
                  Ganador
                </option>
                <option value={false} key="false">
                  Rechazado
                </option>
              </select>
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <button type="submit"  className="btn btn-primary btn-lg my-2 mx-3" onClick={() => navigate(`/resultados`)}>
              Enviar
            </button>
          </div>
        </form>
        <button
          className="btn btn-danger ms-2 mb-3"
          onClick={() => navigate(`/resultados`)}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default ResultadoPostulantes;
