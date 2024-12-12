import axiosApi from "./Axios";

export const postLogin = async (user) => {
    try {
        const response = await axiosApi.post("api/auth/login", user);
        return response.data;
    } catch (error) {
        console.log("Error getting login", error);
    }
}