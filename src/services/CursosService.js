import axiosApi from "./Axios";

export const getCursos = async () => {
    try {
        const response = await axiosApi.get("api/cusos");
        return response.data;
    } catch (error) {
        console.log("Error getting Roles", error);
    }
}