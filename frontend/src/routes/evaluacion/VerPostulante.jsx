import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getPostulanteByRut,
  deleteEvaluacion,
} from "../../services/evaluacion.service";
import { useNavigate } from "react-router-dom";
function VerPostulante() {
  const { rut } = useParams();
  const navigate = useNavigate();
  const [evaluacion, setEvaluacion] = useState([]);
  useEffect(() => {
    getPostulanteByRut(rut).then((response) => {
      setEvaluacion(response.data);
      response.data === null
        ? deleteEvaluaciones(rut)
        : console.log("no se puede eliminar");
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
    
    <div style={{ width: "80%", // Ajustar según sea necesario
    margin: "auto", // Centra el contenedor
    display: "flex", 
    flexDirection: "column", 
    justifyContent: "center", 
    alignItems: "center", 
    background: "#f8f9fa", // Fondo gris claro
    padding: "20px", 
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
    <h1>Postulante {evaluacion.Representante}</h1>
    <div className="container">
      <div className="row align-items-start">
        <div className="col">Representante</div>
        <div className="col">{evaluacion.Representante}</div>
      </div>
      <div className="row align-items-center">
        <div className="col">Organizacion</div>
        <div className="col">{evaluacion.Organizacion}</div>
      </div>
      <div className="row align-items-end">
        <div className="col">Correo</div>
        <div className="col">{evaluacion.Correo}</div>
      </div>
      <div className="row align-items-end">
        <div className="col">Telefono</div>
        <div className="col">{evaluacion.Telefono}</div>
      </div>
      <div className="row align-items-end">
        <div className="col">Rut</div>
        <div className="col">{evaluacion.Rut_Representante}</div>
      </div>
      <div className="row align-items-end">
        <div className="col">Rut Organizacion</div>
        <div className="col">{evaluacion.Rut_Organizacion}</div>
      </div>
      <div className="row align-items-end">
        <div className="col">Descripcion</div>
        <div className="col">{evaluacion.descripcion}</div>
      </div>
    </div>
    <button className="btn btn-primary" onClick={() => window.history.back()}>
      Volver atrás
    </button>
    <style jsx>{`
    .row {
      margin-bottom: 20px;
    }
  `}</style>
  </div>
  );
}

export default VerPostulante;
