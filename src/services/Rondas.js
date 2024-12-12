import axiosApi from "./Axios";


export const getRondas = async () => {
    try {
        const request = await axiosApi.get("api/rondas");
        return request.data;
    } catch (err) {
        console.log("Error getting rondas", err);
    }
}