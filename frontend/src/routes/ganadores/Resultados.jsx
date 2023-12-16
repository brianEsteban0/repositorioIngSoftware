import { useEffect, useState } from "react";
import { getResultados } from "../../services/resultados.service";
import { getPublicacion } from "../../services/VerPublicaciones.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
function Resultados() {
  const [resultados, setResultados] = useState([]);
  const [publicaciones, setPublicaciones] = useState([]);
  useEffect(() => {
    getResultados().then((response) => {
      setResultados(response.data);
      console.log(response.data);
    });
    getPublicacion().then((response) => {
      setPublicaciones(response);
      console.log(response);
    });
  }, []);
  return (
    <div>
      <h1>Resultados</h1>
      <p>Esta es la página de Resultados</p>
      <table className="table ">
        <thead>
          <tr>
          <th>Titulo</th>
          <th>fechainicio</th>
          <th>Monto</th>
          <th>Cantidad de Evaluados</th>
          <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {publicaciones?.map((publicacion) => {
            return publicacion.fecha_termino === "Plazo vencido" ? (
              <tr key={publicacion._id}>
                <td>{publicacion.titulo}</td>
                <td>{publicacion.fecha_inicio}</td>
                <td>{publicacion.monto}</td>
                <td>{publicacion.cupos}</td>
                <td>
                <button
                    className="btn btn-primary"
                  >Ver</button>
                  <button className="btn btn-light">
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button className="btn btn-info">
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </td>
              </tr>
            ) : (
              <div key={publicacion._id}></div>
            );
          })}
        </tbody>
      </table>
      <button className="btn btn-primary" onClick={() => navigate("/")}>
        Volver atras
      </button>
    </div>
  );
}

export default Resultados;
