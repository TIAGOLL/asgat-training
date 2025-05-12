import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log('aqui');
  console.log('token: '+ token);
  if (token) {
    console.log('aqui2');
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
