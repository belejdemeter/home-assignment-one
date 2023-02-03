import type {AxiosRequestConfig, ParamsSerializerOptions} from "axios";
import axios from "axios";
import AuthService from '../services/auth'
import storage from "../services/auth/storage";
const config: AxiosRequestConfig = {
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: false, // Check cross-site Access-Control
    headers: {'Content-Type': 'application/json'},
    responseType: 'json',
};

const client = axios.create(config);

// 1. Request interceptors
client.interceptors.request.use(async (config) => {
    const token = storage.getAccessToken();
    if (!!token) {
        config.headers.set('Authorization', `Bearer ${token}`);
    }
    return config;
});

// 2. Response interceptors
// 2.1 Handle response errors
client.interceptors.response.use(
    response => response,
    async error => {
        // process error from API
        if (error.response) {
            if (error.response.status === 500) {
                return Promise.reject('Internal server error')
            }

            // process client errors
            if (error.response.status >= 400 || error.response.status <= 500) {
                const data = error.response.data;

                if (data.errors && data.errors[0]) {
                    const firstErrorDetails = data.errors[0].details;
                    return Promise.reject(firstErrorDetails);
                }

                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }

);

export default client;
