import axios from './root.service';

export const getPublicacionResultados = async () => {
    try {
        const response = await axios.get('/publicacion_resultados');
        if (response.status === 200) {
            console.log(response.data);
            return response.data; // Devuelve la respuesta directamente
        }
    } catch (error) {
        console.error(error);
        throw error; // Lanza el error nuevamente para que pueda ser manejado por el código que llama a la función
    }
};

export const getPublicacionResultadoById = async (id) => {
    try {
        const response = await axios.get(`/publicacion_resultados/${id}`);

        if (response.status === 200) {
            console.log(response.data);
            return response.data;
        }
    } catch (error) {
        console.error(error);
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
}