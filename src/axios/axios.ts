import axios from 'axios';

const baseURL =
  import.meta.env['VITE_BACKEND_URL'] || 'https://staging.wefly.my.id/api/v1';
const axiosInstance = axios.create({
  baseURL,
});

export default axiosInstance;
