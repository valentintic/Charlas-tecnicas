import axiosApi from "./Axios";

export const getComentariosCharla = async (idCharla) => {
    try {
        const response = await axiosApi.get(`api/charlas/${idCharla}`); 
        return response.data.comentarios;
    } catch (error) {
        console.log("Error getting comentarios charla", error);
    }
}