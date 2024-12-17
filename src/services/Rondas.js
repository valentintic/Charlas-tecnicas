import axiosApi from "./Axios";


export const getRondas = async () => {
    try {
        const request = await axiosApi.get("api/rondas/rondascurso");
        return request.data;
    } catch (err) {
        console.log("Error getting rondas", err);
    }
}

export const getRondasCurso = async () => {
    try {
        const request = await axiosApi.get("api/rondas/rondascurso");
        return request.data;
    } catch (err) {
        console.log("Error getting rondas curso", err);
    }
}

export const getRondasId = async (id) => {
    try {
        const request = await axiosApi.get(`api/rondas/${id}`);
    } catch (error) {
        console.log("Error getting rondas id", error);
    }
}