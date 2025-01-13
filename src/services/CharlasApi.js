import axiosApi from "./Axios";
import { getAlumnoId } from "./UsuariosService";
const idAlumno = getAlumnoId();
export const getCharlas = async () => {
    try {
        const response = await axiosApi.get("api/charlas/charlascurso/");
        console.log(response.data[0].imagenCharla);
        return response.data;
    } catch (error) {
        console.log("Error getting Charlas", error);
    }
}

export const createCharla = async (charla) => {
    try {
        const response = await axiosApi.post("api/charlas/", charla);
        return response.data;
    } catch (error) {   
        console.log("Error creating charla", error);
    }
}

export const updateCharla = async (charla) => {
    try {
        const response = await axiosApi.put("api/charlas/", charla);
        return response.data;
    } catch (error) {
        console.log("Error updating charla", error);
    }
}

export const deleteCharla = async (id) => {
    try {
        const response = await axiosApi.delete(`api/charlas/${id}`);
        return response.data;
    } catch (error) {
        console.log("Error deleting charla", error);
    }
}

export const getCharlasCursoIdRonda = async (idRonda) => {
    try {
        const response = await axiosApi.get(`api/charlas/charlasronda/${idRonda}`);
        return response.data;
    } catch (error) {
        console.log("Error getting charlas curso id ronda", error);
    }
}

export const getCharlasRondaEstado = async (idRonda, idEstado) => {
    try {
        const response = await axiosApi.get(`api/charlas/charlasrondaestado/${idRonda}/${idEstado}`);
    } catch (error) {
        console.log("Error getting charlas ronda estado", error);
    }
}

export const getCharlaById = async (id) => {
    try {
        const response = await axiosApi.get(`api/charlas/${id}`);
        return response.data;
    } catch (error) {
        console.log("Error getting charla id", error);
    }
}

export const uploadCharlasImg  = async (id, imagenCharla) => {
    try {
        const response = await axiosApi.post(`api/files/UploadImagenCharla/${id}`, imagenCharla);
        return response.data;
    } catch (error) {
        console.log("Error uploading charlas img", error);
    }
}

