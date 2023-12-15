import axios from './root.service';

export const getEvaluaciones = async () => {
  try {
    const response = await axios.get('/evaluacion');
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const getEvaluacion = async (id) => {
  try {
    const response = await axios.get(`/evaluacion/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const createEvaluacion = async (evaluacion) => {
    try {
        const response = await axios.post('/evaluacion', evaluacion);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const updateEvaluacion = async (id, evaluacion) => {
    try {
        const response = await axios.put(`/evaluacion/${id}`, evaluacion);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const deleteEvaluacion = async (id) => {
    try {
        const response = await axios.delete(`/evaluacion/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const getEvaluacionByPostulacion = async (id) => {
    try {
        const response = await axios.get(`/evaluacion/publicacion/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const getPostulanteByRut = async (rut) => {
    try {
        const response = await axios.get(`/postulante/publicacion/${rut}`);
        console.log(response.data);
        return response.data;

    } catch (error) {
        console.error(error);
    }
}