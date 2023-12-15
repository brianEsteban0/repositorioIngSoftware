import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostulanteByRut } from "../../services/Evaluacion.service";
import { useNavigate } from 'react-router-dom';
import { response } from "express";
function EvalPostulante() {
    const { rut } = useParams();
    const navigate = useNavigate();
    const [evaluacion, setEvaluacion] = useState([]);
    useEffect(() => {
        getPostulanteByRut(rut).then((response) => {
            setEvaluacion(response.data);
            console.log(response.data);
        });
       
    }, []);

    const deleteEvaluacion = (id) => {
        const shouldDelete = window.confirm('Postulante no encontrado ¿Eliminar Evaluacion?');
    
        if (shouldDelete) {
            deleteEvaluacion(id)
        }
    }

  return (
    <div>
      <h1>EvalPostulante</h1>
      <button className="btn btn-primary" onClick={() => window.history.back()}>Volver atras</button>
    </div>
  );
}

export default EvalPostulante;