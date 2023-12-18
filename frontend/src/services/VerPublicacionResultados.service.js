import axios from "/src/services/root.service.js";

export const fetchPublicacionesResultados = async () => {
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

    export async function getPublicacionResultadoById(id) {
        try {
            const response = await axios.get(`/publicacion_resultados/${id}`);
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


    export const getPublicacionResultados = async () => {
        try {
            const response = await axios.get(`/publicacion_resultados`);
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

export async function actualizarPublicacionResultado(id, publicacionResultadoData) {
    try {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(publicacionResultadoData),
    };

    const response = await fetch(`http://localhost:3000/api/publicacion_resultados/${id}`, requestOptions);
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

export const createPublicacionResultado = async (PublicacionResultado) => {
    try {
        const response = await axios.post('/publicacion_resultados', PublicacionResultado);

    if (response.status === 200) {
        console.log(response.data);
        return response.data;
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export const deletePublicacionResultado = async (id) => {
    try {
        const response = await axios.delete(`/publicacion_resultado/${id}`);

        if (response.status === 200) {
            console.log(response.data);
            return response.data;
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}