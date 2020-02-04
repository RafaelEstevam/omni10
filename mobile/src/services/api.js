import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.2.71:3030' //BACKEND 
});

export default api;