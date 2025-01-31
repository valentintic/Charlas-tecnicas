import axiosApi from "./Axios";

export const postRecursos = async (data) => {
    try {
        const response = await axiosApi.post("/api/Recursos", data);
        return response.data;
    } catch (error) {
        return error.response.data; 
    }
}

export const updateRecursos = async (data) => {
    try {
        const response = await axiosApi.put(`/api/Recursos`, data);
        return response.data;
    } catch (error) {
        return error.response.data; 
    }
}

export const deleteRecursos = async (id) => {
    try {
        const response = await axiosApi.delete(`/api/Recursos/${id}`);
        return response.data;
    } catch (error) {
        return error.response.data; 
    }
}

export const getRecursosId = async (id) => {
    try {
        const response = await axiosApi.get(`/api/Recursos/${id}`);
        return response.data;
    } catch (error) {
        return error.response.data; 
    }
}