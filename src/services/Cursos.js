import axiosApi from "./Axios"; 

export const createCurso = async (curso) => {
    try {
        const response = await axiosApi.post("/api/Profesor/CreateCurso", curso);
        return response;
    } catch (error) {
        console.log(error);
    }   
}