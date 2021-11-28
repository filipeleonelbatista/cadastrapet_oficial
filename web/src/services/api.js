import axios from 'axios';

const api = axios.create({
    baseURL: 'https://cadastrapet.herokuapp.com/api/v1/',
});

export default api;