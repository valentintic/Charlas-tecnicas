import axios  from "axios";
import Global from "../Global";


export default class ServiceUsuarios {
    insertDepartamento(usuario){
        return new Promise(function(resolve){
            let request = "api/usuarios"
            let url = Global.urlApiCharlas + request
            axios.post(url,usuario).then(response => {
                resolve(response)
            })
        })
    }
}