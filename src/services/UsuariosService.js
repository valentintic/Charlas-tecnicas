import axiosApi from "./Axios"

export const postRegister = async (usuario) => {
    try {
        const response = await axiosApi.post("/api/usuarios", usuario)
        return response.data
    } catch (error) {
        console.log(error)
    }
}