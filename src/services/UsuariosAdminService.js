import axiosApi from "./Axios"

export const getProfesores = async () => {
    try {
        const response = await axiosApi.get("/api/Admin/Profesores")
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getUsuariosActivos = async () => {
    try {
        const response = await axiosApi.get("/api/Admin/UsuariosActivos")
        return response.data
    } catch (error) {
        console.log(error)
    }
}