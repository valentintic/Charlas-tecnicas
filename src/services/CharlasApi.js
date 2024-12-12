import axiosApi from "./Axios";

export const getCharlas = async () => {
    try {
        const response = await axiosApi.get("api/charlas");
        return response.data;
    } catch (error) {
        console.log("Error getting Charlas", error);
    }
}

export const createCharla = async () => {
    
}

