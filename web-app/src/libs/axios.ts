import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL
});

instance.defaults.headers.common['Access-Control-Allow-Origin'] = process.env.REACT_APP_BASE_URL; 
instance.defaults.withCredentials = true;   // serve para poder enviar os tokens no header

export default instance;