import axiosApi from "./Axios"

export const getProfesoresAsync = async () => {
    try {
        const response = await axiosApi.get("/api/Admin/Profesores")
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getUsuariosActivosAsync = async () => {
    try {
        const response = await axiosApi.get("/api/Admin/UsuariosActivos")
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getAllUsersAdmin = async () => {
    try {
        const response = await axiosApi.get("/api/Usuarios")
        return response.data
    } catch (error) {
        console.log(error)
    }
}