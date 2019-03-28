import axios from 'axios';
import { baseURL } from '../config/endpoints';


const API = axios.create({
    baseURL: baseURL
});

export default API;