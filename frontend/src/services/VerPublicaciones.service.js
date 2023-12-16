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
      const response = await axios.get(`/publicaciones/${id}`);
  
      if (response.status === 200) {
        return response.data;
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
  
export const getPublicacionById = async (id) =>{
    try {
      const response = await axios.get(`/publicaciones/${id}`);
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