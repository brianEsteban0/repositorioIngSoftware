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
    alert("Error al obtener evaluacion");
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

export const updateEvaluacion = async (rut, evaluacion) => {
    try {
        console.log(JSON.stringify(evaluacion));

        const response = await axios.put(`/evaluacion/${rut}`, evaluacion);
        console.log(response);
        return response;
    } catch (error) {
        const errorMessage = error.response?.data.message || 'Error desconocido en Evaluacion';
        console.error('Error al editar la evaluacion', error);
        alert('Error ingresar los datos: ' + errorMessage);
    }
}

export const deleteEvaluacion = async (rut) => {
    try {
        const response = await axios.delete(`/evaluacion/${rut}`);
        console.log(rut);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const getEvaluacionByPostulacion = async (id) => {
    try {
        if (id === undefined) {
            return null;
        }
        const response = await axios.get(`/evaluacion/publicacion/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const getPostulanteByRut = async (rut) => {
    try {
        const response = await axios.get(`/postulante/publicacion/${rut}`);
        console.log(response);
        return response.data;

    } catch (error) {
        console.error(error);
    }
}

export const getPostulanteById = async (id) => {
    try {
        const response = await axios.get(`/postulante/${id}`);
        console.log(response);
        return response.data;

    } catch (error) {
        console.error(error);
    }
}

export const getPostulantes = async () => {
    try {
        const response = await axios.get('/postulante');
        return response.data;
    } catch (error) {
        console.error(error);
    }
}