import userApi from "./Axios";

export const getCharlas = async () => {
    try {
        const response = await userApi.get("api/charlas");
        return response.data;
    } catch (error) {
        console.log("Error getting Charlas", error);
    }
}


