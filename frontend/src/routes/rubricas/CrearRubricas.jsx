import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../services/root.service";
import "./CrearRubrica.css";
const RubricForm = () => {
  const [rubricData, setRubricData] = useState({
    name: "",
    contestType: "",
    criteria: [{ name: "", score: 100 }],
    publicacion: "",
  });

  const [publicaciones, setPublicaciones] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPublicaciones = async () => {
      try {
        const response = await axios.get("/publicaciones");
        setPublicaciones(response.data.data);
      } catch (error) {
        console.error("Error al obtener las publicaciones", error);
      }
    };

    fetchPublicaciones();
  }, []);

  const handleInputChange = (field, value) => {
    setRubricData({ ...rubricData, [field]: value });
  };

  const handleCriteriaChange = (index, field, value) => {
    const updatedCriteria = [...rubricData.criteria];
    updatedCriteria[index][field] = value;
    setRubricData({ ...rubricData, criteria: updatedCriteria });
  };

  const handleAddCriteria = () => {
    setRubricData({
      ...rubricData,
      criteria: [...rubricData.criteria, { name: "", score: 100 }],
    });
  };

  const handleRemoveCriteria = (index) => {
    const updatedCriteria = [...rubricData.criteria];
    updatedCriteria.splice(index, 1);
    setRubricData({ ...rubricData, criteria: updatedCriteria });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post("/rubric", rubricData);
  
      // Verificar si la solicitud fue exitosa
      if (response.data.status === 200) {
        alert('Rubrica creada con éxito');
        navigate('/rubricas');
      } else {
        const errorMessage = response.data.message || 'Error desconocido al crear la rubrica';
        alert('Error al crear la rubrica: ' + errorMessage);
      }
    } catch (error) {
      const errorMessage = error.response?.data.message || 'Error desconocido al crear la rubrica';
      console.error('Error al crear la rubrica', error);
      alert('Error al crear la rubrica: ' + errorMessage );
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="my-4">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Nombre:
          </label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={rubricData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="contestType">Tipo de Concurso:</label>
          <input
            type="text"
            id="contestType"
            className="form-control"
            value={rubricData.contestType}
            onChange={(e) => handleInputChange("contestType", e.target.value)}
          />
        </div>
        <div className="mb-3 my-2 mx-3">
          <label>
            <h3>Criterios</h3>{" "}
          </label>
          <div className="d-flex justify-content-end mb-3 mr-3">
            <button
              type="button"
              onClick={handleAddCriteria}
              className="btn btn-primary btn-sm"
            >
              Añadir Criterio
            </button>
          </div>

          {rubricData.criteria.map((criteria, index) => (
            <div key={index}>
              <span>{`Criterio ${index + 1}: `}</span>
              <input
                type="text"
                value={criteria.name}
                className="form-control"
                style={{ height: "50px" }}
                onChange={(e) =>
                  handleCriteriaChange(index, "name", e.target.value)
                }
              />
              <span></span>
              <div className="d-flex justify-content-end mb-3 mr-3">
                <button
                  type="button"
                  onClick={() => handleRemoveCriteria(index)}
                  className="btn btn-danger btn-sm fixed-end my-2 mx-3"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
        <div>
          <div>
            <label htmlFor="publicacion">Publicación:</label>
            <select
              id="publicacion"
              value={rubricData.publicacion}
              className="form-select"
              onChange={(e) => handleInputChange("publicacion", e.target.value)}
            >
              <option value="" disabled>
                Selecciona una publicación
              </option>
              {publicaciones?.map((publicacion) => (
                <option key={publicacion._id} value={publicacion._id}>
                  {publicacion.titulo}
                </option>
              ))}
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
  );
};

export default RubricForm;
