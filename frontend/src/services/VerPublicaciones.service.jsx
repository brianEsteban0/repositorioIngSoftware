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
  