import axios from "./root.service";

export const getResultados = async () => {
    try {
        const response = await axios.get("/resultados");
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const getResultado = async (id) => {
    try {
        const response = await axios.get(`/resultados/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const createResultado = async (resultado) => {
    try {
        const response = await axios.post("/resultados", resultado);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const updateResultado = async (id, resultado) => {
    try {
        const response = await axios.put(`/resultados/${id}`, resultado);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const deleteResultado = async (id) => {
    try {
        const response = await axios.delete(`/resultados/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const getResultadosByPostulacion = async (id) => {
    try {
        if (id === undefined) {
            return null;
        }
        const response = await axios.get(`/resultados/resultadosPorPostulacion/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}