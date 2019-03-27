import axios from 'axios';

export const baseURL = `https://mock-api.dev.lalamove.com`;

export const API = axios.create({
    baseURL: baseURL
});