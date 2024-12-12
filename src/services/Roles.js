import axiosApi from "./Axios";

export const getRoles = async () => {
    try {
        const response = await axiosApi.get("api/roles");
        return response.data;
    } catch (error) {
        console.log("Error getting Roles", error);
    }
}