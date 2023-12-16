export async function eliminarPublicacion(id) {
    try {
      const response = await fetch(`http://localhost:3000/api/publicaciones/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
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
      console.error('Error deleting publication:', error);
      throw error;
    }
  }
  
  export async function actualizarPublicacion(id, datos) {
    try {
      const response = await fetch(`http://localhost:3000/api/publicaciones/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos),
      });
  
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
      console.error('Error updating publication:', error);
      throw error;
    }
  }