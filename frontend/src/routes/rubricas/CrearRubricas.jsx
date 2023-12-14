import { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../services/root.service';
const RubricForm = () => {
  const [rubricData, setRubricData] = useState({
    name: '',
    contestType: '',
    criteria: [{ name: '', score: 100 }], 
    publicacion: '', 
  });

  const [publicaciones, setPublicaciones] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPublicaciones = async () => {
      try {
        const response = await axios.get('/publicaciones');
        setPublicaciones(response.data.data);
      } catch (error) {
        console.error('Error al obtener las publicaciones', error);
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
      criteria: [...rubricData.criteria, { name: '', score: 100 }],
    });
  };

  const handleRemoveCriteria = (index) => {
    const updatedCriteria = [...rubricData.criteria];
    updatedCriteria.splice(index, 1);
    setRubricData({ ...rubricData, criteria: updatedCriteria });
  };

  const handleSubmit = (e) => {
    try {
        e.preventDefault();
      axios.post('/rubric', rubricData);
      alert('Rubrica creada con exito');
      navigate('/rubricas');
    } catch (error) {
      alert('Error al crear la rubrica');
    }
  };

 

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          value={rubricData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="contestType">Tipo de Concurso:</label>
        <input
          type="text"
          id="contestType"
          value={rubricData.contestType}
          onChange={(e) => handleInputChange('contestType', e.target.value)}
        />
      </div>
      <div>
        <label>Criterios:</label>
        {rubricData.criteria.map((criteria, index) => (
          <div key={index}>
            <span>{`Criterio ${index + 1}: `}</span>
            <input
              type="text"
              value={criteria.name}
              onChange={(e) => handleCriteriaChange(index, 'name', e.target.value)}
            />
            <span>{`Score: ${criteria.score}`}</span>
            <button type="button" onClick={() => handleRemoveCriteria(index)}>
              Eliminar Criterio
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddCriteria}>
          Añadir Criterio
        </button>
      </div>
      <div>
      <div>
        <label htmlFor="publicacion">Publicación:</label>
        <select
          id="publicacion"
          value={rubricData.publicacion}
          onChange={(e) => handleInputChange('publicacion', e.target.value)}
        >
          <option value="" disabled>
            Selecciona una publicación
          </option>
          {publicaciones.map((publicacion) => (
            <option key={publicacion.id} value={publicacion._id}>
              {publicacion.titulo}
            </option>
          ))}
        </select>
      </div>
      </div>
      <button type="submit">Enviar</button>
    </form>
    <button onClick={() => navigate('/rubricas')}>Cancelar</button>
    </div>
  );
};

export default RubricForm;

