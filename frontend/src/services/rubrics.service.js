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
  