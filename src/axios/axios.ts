import axios from 'axios';

const baseURL =
  import.meta.env['VITE_BACKEND_URL'] || 'http://188.166.196.8:8081/api';
const axiosInstance = axios.create({
  baseURL,
});

export default axiosInstance;
