import axiosApi from "./Axios";

export const getComentariosCharla = async (idCharla) => {
    try {
        const response = await axiosApi.get(`api/charlas/${idCharla}`); 
        return response.data.comentarios;
    } catch (error) {
        console.log("Error getting comentarios charla", error);
    }
}

export const createComentario = async (comentario) => {
    try {
        const response = await axiosApi.post("api/comentarios", comentario);
        return response.data
    } catch (error) {
        console.log("Error creating comentario", error);
    }
}