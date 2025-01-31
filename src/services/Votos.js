import axiosApi from "./Axios";

export const getVotosCharla = async (idCharla) => {
    try {
        const response = await axiosApi.get(`api/votos/votosCharla/${idCharla}`);
        return response.data;
    } catch (error) {
        console.log("Error getting votos charla", error);
    }
} 

export const updateVotoCharla = async (voto) => {
    try {
        const response = await axiosApi.post('api/votos', voto);
        return response.data;
    } catch (error) {
        console.log("Error updating voto charla", error);
    }
}

export const deleteVotoCharla = async (idVoto) => {
    try {
        const response = await axiosApi.delete(`api/votos/${idVoto}`);
        return response.data;
    } catch (error) {
        console.log("Error deleting voto charla", error);
    }
}

export const getVotoUsuarioRonda = async (idRonda) => {
    try {
        const response = await axiosApi.get('api/votos/votoAlumnoRonda/' + idRonda)
        return response.data;
    } catch (error) {
        console.log("Error getting voto usuario ronda", error);
    }
}
