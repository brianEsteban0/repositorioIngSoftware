import axios from './root.service';

  export async function obtenerPublicacionById(id) {
    try {
      const response = await axios.get(`/publicaciones/${id}`);
      console.log('Respuesta de la solicitud:', response);
  
      if (response.status === 200 && response.data) {
        const data = response.data; // Obtén los datos de la respuesta
        return data; // Devuelve los datos de la publicación
      } else {
        throw new Error('No se pudo obtener la publicación');
      }
    } catch (error) {
      console.error('Error al obtener la publicación:', error);
      throw error;
    }
  }

  export const getPublicacion = async () =>{
    try {
      const response = await axios.get(`/publicaciones`);
      console.log(response.status);
  
      if (response.status === 200) {
        return response.data.data;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

