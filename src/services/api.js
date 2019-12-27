import axios from 'axios';

// Seta a API na URL: http://localhost na porta 3333
const api = axios.create({
  baseURL: 'http://localhost:3333',
});

export default api;
