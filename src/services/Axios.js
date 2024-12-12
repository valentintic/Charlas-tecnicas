import axios from "axios";

const userApi = axios.create({
    baseURL: "https://apicharlasalumnostajamar.azurewebsites.net/", // Tu URL base
});

userApi.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default userApi;
