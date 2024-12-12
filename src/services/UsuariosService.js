import axiosApi from "./Axios"

<<<<<<< HEAD
export const postRegister = async (usuario) => {
    try {
        const response = await axiosApi.post("/api/usuarios", usuario)
        return response.data
    } catch (error) {
        console.log(error)
=======

export default class ServiceUsuarios {
    insertUsuario(usuario){
        return new Promise(function(resolve){
            let request = "api/usuarios"
            let url = Global.urlApiCharlas + request
            axios.post(url,usuario).then(response => {
                resolve(response)
            })
        })
>>>>>>> 61a8d27ceb16aaee1f610f77eeeb7619e1c3d862
    }
}