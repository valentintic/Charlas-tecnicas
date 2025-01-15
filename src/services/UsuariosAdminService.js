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

export const updateEstadoProfesores = async (usuario, estado ) => {
    try {
        const response = await axiosApi.put("/api/Admin/UpdateEstadoProfesor/"+usuario+"/true/"+ estado);
        return response.data;
    } catch (error) {
        console.warn("Error updating alumno", error);
    }
}

export const UpdateCursoUsuario = async (usuario, estado ) => {
    try {
        const response = await axiosApi.put("/api/Admin/UpdateCursoUsuario/"+usuario+"/true/"+ estado);
        return response.data;
    } catch (error) {
        console.warn("Error updating alumno", error);
    }
}

export const UpdateRoleUsuario = async (usuario, estado ) => {
    try {
        const response = await axiosApi.put("/api/Admin/UpdateRoleUsuario/"+usuario+"/true/"+ estado);
        return response.data;
    } catch (error) {
        console.warn("Error updating alumno", error);
    }
}
