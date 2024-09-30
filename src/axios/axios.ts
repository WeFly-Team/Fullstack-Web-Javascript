import axios from 'axios';

const baseURL = import.meta.env['VITE_BACKEND_URL'];
const axiosInstance = axios.create({
  baseURL,
});

export const axiosNode = axios.create({
  baseURL: 'https://backend-nodejs.fly.dev/api',
});

export default axiosInstance;
