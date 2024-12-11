import axios from "axios";

const userApi = axios.create({
    baseURL: "https://apicharlasalumnostajamar.azurewebsites.net/",
    headers: {
        "Content-type": "application/json"
    }
});