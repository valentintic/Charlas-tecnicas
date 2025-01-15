import axiosApi from "./Axios"

export const postRegister = async (idcurso, usuario) => {
    try {
        const response = await axiosApi.post(`/api/usuarios/newalumno/${idcurso}`, usuario)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const getUserProfile = async () => {
    try {
        const response = await axiosApi.get("/api/usuarios/perfil")
        return response.data
    } catch (error) {
        console.log(error)
    }

}

export const getCharlasUser = async () => {
    try {
        const response = await axiosApi.get("/api/charlas/charlasalumno")
        // console.log(response.data);
        return response.data
    } catch (error) {
        console.log(error)
    }

}

export const getAlumnoId = async () => {
    try {
        const response = await axiosApi.get("/api/usuarios/perfil")
        return response.data.usuario.idUsuario
    } catch (error) {
        console.log(error)
    }
}

export const uploadUserImg  = async (id, imagenUsuario) => {
    try {
        const response = await axiosApi.post(`api/files/uploadImagenUsuario/${id}`, imagenUsuario);
        return response.data;
    } catch (error) {
        console.log("Error uploading user img", error);
    }
}

export const updateAlumno = async (usuario ) => {
    try {
        const response = await axiosApi.put("/api/usuarios", usuario);
        return response.data;
    } catch (error) {
        console.warn("Error updating alumno", error);
    }

}

export const changePassword = async (newPassword) => {
    try {
        const response = await axiosApi.put("/api/usuarios/updatepasswordusuario", newPassword);
        return response;
    } catch (error) {
        console.log(error);
    }
}