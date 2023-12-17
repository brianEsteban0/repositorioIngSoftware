import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getResultado } from "../../services/resultados.service";
import { getPublicacion } from "../../services/VerPublicaciones.service";
function ResultadoPostulantes() {
  const [postulantes, setPostulantes] = useState([]);
  const id = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getResultado(id.id).then((response) => {
      setPostulantes(response.data);
      console.log(response.data);
    });
  }, []);



  return (
    <div>
      <h1>Resultado de Postulantes</h1>
      <div className="container">
        <form  className="my-4">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Nombre:
            </label>
            <input
              type="text"
              id="name"
              className="form-control"
              value=""
            />
          </div>
          <div>
            <label htmlFor="contestType">Tipo de Concurso:</label>
            <input
              type="text"
              id="contestType"
              className="form-control"
              value=""

            />
          </div>
          <div className="mb-3 my-2 mx-3">
            <label>
              <h3>Criterios</h3>{" "}
            </label>
            <div className="d-flex justify-content-end mb-3 mr-3">
              <button
                type="button"
                className="btn btn-primary btn-sm"
              >
                Añadir Criterio
              </button>
            </div>


              <div>
                <span>a</span>
                <input
                  type="text"
                  value=""
                  className="form-control"
                  style={{ height: "50px" }}
                />
                <span></span>
                <div className="d-flex justify-content-end mb-3 mr-3">
                  <button
                    type="button"
                    className="btn btn-danger btn-sm fixed-end my-2 mx-3"
                  >
                    Eliminar
                  </button>
                </div>
              </div>

          </div>
          <div>
            <div>
              <label htmlFor="publicacion">Estado :</label>
              <select
                id="publicacion"
                value=""
                className="form-select"
              >
                <option value="" disabled>
                  Selecciona una publicación
                </option>
                <option value="Pendiente" disabled>
                    Pendiente
                </option>
                <option value="Finalizada" disabled>
                    Finalizadan
                </option>
                <option value="En Revision" disabled>
                    En Revision
                </option>
              </select>
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary btn-lg my-2 mx-3">
              Enviar
            </button>
          </div>
        </form>
        <button
          className="btn btn-danger ms-2 mb-3"
          onClick={() => navigate("/rubricas")}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default ResultadoPostulantes;
