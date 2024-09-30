import axios from "axios"
import configs from "../configs"

function buildProtocolScheme() {
    const scheme = configs.app.enableHttps === true ? 'https' : 'http'
    return scheme;
}

const axiosInstance = axios.create({
    baseURL: buildProtocolScheme() + "://" + configs.app.host + "/managementportal/" ,
})


const authManagementPortalAxiosInstance = axios.create({
    baseURL: buildProtocolScheme() + "://" + configs.app.host + "/managementportal/api" ,
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token') 
    }
})

//adding bearer token
authManagementPortalAxiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
})

const localAxiosInstance = axios.create({
    baseURL: "http://" + configs.app.hostLocal.name + ":" + configs.app.hostLocal.port + "/api/" ,
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
    }
})

export { axiosInstance, authManagementPortalAxiosInstance, localAxiosInstance }