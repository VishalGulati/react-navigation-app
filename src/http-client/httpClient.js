import axios from 'axios';
import { baseURL } from '../config/endpoints';

export const API = axios.create({
  baseURL: baseURL
});

const requestGenerator = {
  getReq: endpoint => API.get(endpoint),
  postReq: (endpoint, payload) => API.post(endpoint, payload)
};

export default requestGenerator;
