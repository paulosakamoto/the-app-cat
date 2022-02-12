import axios from 'axios';
import appConfig from '../config';
const api = axios.create({
    baseURL: 'https://api.thecatapi.com',
    timeout: 10000
});

api.interceptors.request.use(
    config => {
        config.headers = Object.assign({
            'x-api-key': appConfig.catApi.xApiKey
        }, config.headers);
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default api;
