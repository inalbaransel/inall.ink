import axios from 'axios';

// Backend URL .env'den alınacak. Yoksa default localhost olacak.
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Her istekte eğer token varsa Header'a ekler
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response Interceptor: 401 (Yetkisiz) dönerse token'ı sil ve login'e at (Opsiyonel)
api.interceptors.response.use((response) => response, (error) => {
  if (error.response?.status === 401) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      // window.location.href = '/login'; // İstenirse aktif edilebilir
    }
  }
  return Promise.reject(error);
});
