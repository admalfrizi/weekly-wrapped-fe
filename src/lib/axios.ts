import { CONFIG } from '@/config'
import axios from 'axios'
import Cookies from 'js-cookie'

export const apiClientToBE = axios.create({
  baseURL: CONFIG.serverApiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
})

export const apiClient = axios.create({
  baseURL: '/api/proxy', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiForAuth = axios.create({
    baseURL : CONFIG.apiUrl,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
})

apiClientToBE.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = Cookies.get('accessToken'); 

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
)