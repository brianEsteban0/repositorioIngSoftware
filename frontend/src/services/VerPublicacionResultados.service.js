import axios from './root.service';

export async function fetchPublicacionesResultados() {
    try {
        const response = await fetch("http://localhost:3000/api/publicacion_resultados");
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

export async function getPublicacionResultadoById(id) {
    try {
        const response = axios.get(`/publicacion_resultados/${id}`);
        const data = await response.json();

        console.log(data);

        if (data.state === 'Success') {
            return data.data;
        } else {
            return null;
            }
        } catch (error) {
            return null;
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

/* export const createPublicacionResultado = async (PublicacionResultado) => {
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

export const updatePublicacionResultado = async (id, PublicacionResultado) => {
    try {
        const response = await axios.put(`/publicacion_resultados/${id}`, PublicacionResultado);

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
} */