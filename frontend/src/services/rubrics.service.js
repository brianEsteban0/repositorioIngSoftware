import axios from './root.service';

export const getRubricas = async () => {
    try {
      const response = await axios.get('/rubric');
  
      if (response.status === 200) { 
        return response.data; // Devuelve la respuesta directamente
      }
    } catch (error) {
      console.error(error);
      throw error; // Lanza el error nuevamente para que pueda ser manejado por el código que llama a la función
    }
};
  
export const getRubricaById = async (id) => {
    try {
      const response = await axios.get(`/rubric/${id}`);
  
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error(error);
      throw error;
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
  
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error(error);
      throw error;
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