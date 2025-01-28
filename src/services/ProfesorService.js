import axiosApi from "./Axios"

// OBTIENE TODOS LOS ALUMNOS DEL CURSO DEL PROFERSOR
export const getAlumnosCursoProfesorAsync = async () => {
    try {
        const response = await axiosApi.get("/api/profesor/alumnoscursoprofesor")
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// OBTIENE TODOS LOS ALUMNOS ACTIVOS DEL PROFESOR
export const getAlumnosCursoActivoProfesorAsync = async () => {
    try {
        const response = await axiosApi.get("/api/profesor/alumnoscursoactivoprofesor")
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// EL PROFESOR PUEDE CREAR UN NUEVO PROFESOR MEDIANTE UN KEY
export const postNewProfesorAsync = async (key, profesor) => {
    try {
        const response = await axiosApi.post("api/Profesor/newprofesor/"+key, profesor);
        return response.data;
    } catch (error) {   
        console.log("Error creando profesor", error);
    }
}

//EL PROFESOR PUEDE VER TODOS SUS CURSOS ACTIVOS
export const getCursosActivosProfesorAsync = async () => {
    try {
        const response = await axiosApi.get("/api/profesor/cursosactivosprofesor")
        return response.data
    } catch (error) {
        console.log(error)
    }
}

//EL PROFESOR PUEDE VER TODOS SUS CURSOS
export const getCursosProfesorAsync = async () => {
    try {
        const response = await axiosApi.get("/api/profesor/cursosprofesor")
        return response.data
    } catch (error) {
        console.log(error)
    }
}

//EL PROFESOR PUEDE ACTUALIZAR UN CHARLA POR SU IDCHARLA Y IDESTADO
export const updateEstadoCharlaProfesorAsync = async (idCharla, idEstado) => {
    try {
        const response = await axiosApi.put("api/profesor/updateestadocharla/"+idCharla+"/"+idEstado, "");
        return response;
    } catch (error) {
        console.log("Error updating estado charla como profesor", error);
    }
}

//EL PROFESOR PUEDE OBTENER TODAS SUS RONDAS
export const getRondasProfesorAsync = async () => {
    try {
        const response = await axiosApi.get("/api/profesor/rondasprofesor")
        return response.data
    } catch (error) {
        console.log(error)
    }
}

//EL PROFESOR PUEDE CREAR UN RONDA
export const postCreateRondaProfesorAsync = async (ronda) => {
    try {
        const response = await axiosApi.post("api/profesor/createronda", ronda);
        return response.data;
    } catch (error) {   
        console.log("Error creando la ronda como profesor", error);
    }
}

//EL PROFESOR PUEDE ACTUALIZAR UN RONDA
export const updateRondaProfesorAsync = async (ronda) => {
    try {
        const response = await axiosApi.post("api/profesor/updateronda", ronda);
        return response.data;
    } catch (error) {   
        console.log("Error acutalizando la ronda como profesor", error);
    }
}

// EL PROFESOR PUEDE ELIMINAR UN RONDA POR IDRONDA 
export const deleteRondaProfesorAsync = async (idRonda) => {
    try {
        const response = await axiosApi.delete("api/profesor/deleteronda/"+idRonda);
        return response.data;
    } catch (error) {   
        console.log("Error actualizando la ronda como profesor", error);
    }
}

// EL PROFESOR CAMBIA PUEDE CAMBIAR EL ESTADO DE UN ALUMNO A ACTIVO O INACTIVO (true o false) APUNTANDO A SU ID
export const updateEstadoAlumnoProfesorAsync = async (idAlumno, estado) => {
    try {
        const response = await axiosApi.put("api/profesor/updateestadoalumno/"+idAlumno+"/"+estado, "");
        return response.data;
    } catch (error) {   
        console.log("Error acutalizando el estado del alumno como profesor", error);
    }
}

// EL PROFESOR PUEDE CREAR UN NUEVO CURSO
export const postCreateCursoProfesorAsync = async (curso) => {
    try {
        const response = await axiosApi.post("api/profesor/createcurso", curso);
        return response.data;
    } catch (error) {   
        console.log("Error creando el curso como profesor", error);
    }
}

// Permite buscar un objeto Usuario y sus charlas por ID. ADMIN
export const getDatosAlumnoProfesorAsync = async (idAlumno) => {
    try {
        const response = await axiosApi.get("/api/profesor/datosalumno/"+idAlumno)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

// Permite acceder a todas las charlas del profesor
export const getCharlasCursoProfesor = async (idAlumno) => {
    try {
        const response = await axiosApi.get("/api/charlas/charlascurso")
        return response.data
    } catch (error) {
        console.log(error)
    }
}
