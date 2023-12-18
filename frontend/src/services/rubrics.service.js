import axios from './root.service';

export const getRubricas = async () => {
    try {
      const response = await axios.get('/rubric');
      if (response.status === 200) { 
        return response.data; 
      }
    } catch (error) {
      console.error(error);
      throw error; 
    }
};
  
export const getRubricaById = async (id) => {
    try {
      const response = await axios.get(`/rubric/${id}`);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
    
        console.error('Error al crear la publicación', error);
        alert('Error al crear la rubrica: ' + error.response.data.message); 
    }
}

export const createRubrica = async (rubrica) => {
    try {
      const response = await axios.post('/rubric', rubrica);
  
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
}

export const updateRubrica = async (id, rubrica) => {
    try {
      const response = await axios.put(`/rubric/${id}`, rubrica);
      console.log(response);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      const errorMessage = error.response?.data.message || 'Error desconocido al editar la rubrica';
      console.error('Error al editar la rubrica', error);
      alert('Error al editar la rubrica: ' + errorMessage);
    }
}

export const deleteRubrica = async (id) => {
    try {
      const response = await axios.delete(`/rubric/${id}`);
  
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
}

export const getRubricaByIdPublicacion = async (id) => {
  try {
    const response = await axios.get(`/rubric/publicacion/${id}`);
    if (response.status === 200 || response.data.data != null) {
      return response.data;
    }
  } catch (error) {
    if (error.response.status === 404) {
      const shouldDelete = window.confirm(
        "Rubrica no encontrada Asignar Rubrica a Publicacion"
      );
  
      if (shouldDelete) {
        window.history.back();
      }
    }
  }
}