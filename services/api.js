import axios from 'axios';

const api = axios.create({
    baseURL: 'http://10.0.0.140:5000',
    //baseURL: 'localhost:3333',
    
});
export default api;