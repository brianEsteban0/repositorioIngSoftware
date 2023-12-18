import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getResultados } from "../../services/resultados.service";
import { getPublicacion } from "../../services/VerPublicaciones.service";
import { getRubricas } from "../../services/rubrics.service";
import { getPostulantes, getPostulanteById } from "../../services/Evaluacion.service";
function Resultados() {
  const [resultados, setResultados] = useState([]);
  const navigate = useNavigate();
  const [publicaciones, setPublicaciones] = useState([]);
  const [rubricas, setRubricas] = useState([]);
  const [postulantes, setPostulantes] = useState([]);
  const [filtroResultado, setFiltroResultado] = useState([]);
  const [filtroPublicacion, setFiltroPublicacion] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");
  useEffect(() => {
    getResultados().then((response) => {
      setResultados(response.data);
      setFiltroResultado(response.data);
      console.log(response.data);
    });
    getPublicacion().then((response) => {
      setPublicaciones(response);
      console.log(response);
    });
    getRubricas().then((response) => {
      setRubricas(response.data);
      console.log(response.data);
    });
    getPostulantes().then((response) => {
      setPostulantes(response.data);
      console.log(response.data);
    });
  }, []);

  const handleClick = (id) => {
    console.log(id);
    getPostulanteById(id).then((response) => {
        console.log(response.data);
        (response.data === null)? alert("No hay postulante asociado a esta publicacion"): 
        navigate(`/evaluacion/ver-postulante/${response.data.Rut_Representante}`);
        }
    );
};

    const handleDefinirGanador = (id) => {
        navigate(`/resultados/${id}`);
    }

    const handleFiltrar = () => {
      let resultadosFiltrados = filtroResultado;
  
      if (filtroPublicacion) {
        resultadosFiltrados = resultadosFiltrados.filter(
          (resultado) => resultado.postulacion === filtroPublicacion
        );
      }
  
      if (filtroEstado) {
        resultadosFiltrados = resultadosFiltrados.filter(
          (resultado) => resultado.estadoEvaluacion === filtroEstado
        );
      }
  
      setResultados(resultadosFiltrados);
    };

  return (
    <>
      <h1>Resultados</h1>
      <h4>Filtrar</h4>
      <div className="container text-center">
        <div className="row align-items-start">
          <div className="col">Publicacion</div>
          <div className="col">Estado Postulacion</div>
        </div>
      </div>
      <div className="container text-center">
        <div className="row align-items-center">
          <div className="col">
            <select
              className="form-select mb-2"
              onChange={(e) => setFiltroPublicacion(e.target.value)}
              value={filtroPublicacion}
            >
              <option value="">Sin filtro</option>
              {publicaciones?.map((publicacion) => (
                <option key={publicacion._id} value={publicacion._id}>
                  {publicacion.titulo}
                </option>
              ))}
            </select>
          </div>
          <div className="col">
            <select
              className="form-select mb-2"
              onChange={(e) => setFiltroEstado(e.target.value)}
              value={filtroEstado}
            >
              <option value="">Sin filtro</option>
              <option value="Pendiente">Pendientes</option>
              <option value="Finalizada">Finalizada</option>
              <option value="EnRevision">En Revisión</option>
            </select>
          </div>
          <div className="col">
            <button className="btn btn-primary" onClick={handleFiltrar}>
              Aplicar Filtros
            </button>
          </div>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Rut</th>
            <th>Representante</th>
            <th>Publicacion</th>
            <th>Puntaje</th>
            <th>Estado Postulacion</th>
            <th>Resultado</th>
            <th>Postulante</th>
            <th>Definir Ganador</th>
          </tr>
        </thead>
        <tbody>
          {resultados?.map((resultado) => {
            const postulante = postulantes.find((elementos) => elementos._id === resultado.postulante);
            return (
              <tr key={resultado._id}>
                <td>
                    {postulante?.Rut_Representante}
                </td>
                <td>
                    {postulante?.Representante}
                </td>
                <td>
                    {publicaciones.find((elementos) => elementos._id === resultado.postulacion)?.titulo}
                </td>
                <td>{resultado?.puntaje_total}</td>
                <td>{resultado?.estadoEvaluacion}</td>
                <td>{resultado.ganador ? 'Ganador' : resultado.ganador === null ? 'Sin resultado' : 'Rechazado'}</td>
                <td>
                  <button
                    className="btn btn-info"
                    
                    onClick={() => {
                        handleClick(resultado.postulante);
                    }}    
                  >
                    Ver
                  </button>
                </td>
                <td>
                    <button className="btn btn-warning" 
                    onClick={() => {handleDefinirGanador(resultado._id)}}
                    >+</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button className="btn btn-primary" onClick={() => navigate("/")}>
        Volver atras
      </button>
    </>
  );
}

export default Resultados;
