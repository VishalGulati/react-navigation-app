import axios from 'axios';

const baseURL = `https://mock-api.dev.lalamove.com`;

const API = axios.create({
    baseURL: baseURL
});

export default API;