import axios from './root.service';
export async function fetchPublicaciones() {
    try {
      const response = await fetch("http://localhost:3000/api/publicaciones");
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data.state === 'Success') {
        return data.data;
      } else {
        throw new Error('State is not Success');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

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
  export async function actualizarPublicacion(id, publicacionData) {
  try {
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(publicacionData),
    };

    const response = await fetch(`http://localhost:3000/api/publicaciones/${id}`, requestOptions);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    if (data.state === 'Success') {
      return data.data; // Podrías retornar los datos actualizados si el estado es éxito
    } else {
      throw new Error('State is not Success');
    }
  } catch (error) {
    console.error('Error updating publication:', error);
    throw error;
  }
}
