import axiosApi from "./Axios"

export const postRegister = async (usuario) => {
    try {
        const response = await axiosApi.post("/api/usuarios", usuario)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getUserProfile = async () => {
    try {
        const response = await axiosApi.get("/api/usuarios/perfil")
        // console.log(response.data);
        return response.data
    } catch (error) {
        console.log(error)
    }
}