import axios from 'axios';

export const ApiRequest = axios.create({
   baseURL: "http://localhost:8000/api"
});