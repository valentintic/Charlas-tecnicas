import axiosApi from "./Axios"

export const getProfesoresAsync = async () => {
    try {
        const response = await axiosApi.get("/api/admin/profesores")
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getUsuariosActivosAsync = async () => {
    try {
        const response = await axiosApi.get("/api/admin/usuariosactivos")
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getAllUsersAdmin = async () => {
    try {
        const response = await axiosApi.get("/api/usuarios")
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const updateStateProfesorService = async (id, state) => {
    try {
        const resposne = await axiosApi.put('api/admin/updateestadoprofesor/' + id + '/' + state)
        return resposne.data
    } catch (error) {
        console.log(error)
    }
}

export const updateCursoUsuarioService = async (idUsuario, idCurso) => {
    try {
        const response = await axiosApi.put('api/Admin/UpdateCursoUsuario/' + idUsuario + '/' + idCurso)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const cursoUsuario = async () => {
    try {
        const response = await axiosApi.get('api/cursosusuarios')
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const updateRoleUsuarioService = async (idUsuario, idRole) => {
    try {
        const response = await axiosApi.put('api/admin/updateroleusuario/' + idUsuario + '/' + idRole)
        return response.data
    } catch (error) {
        console.log(error)
    }
}