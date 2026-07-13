import { CONFIG } from '@/config'
import axios from 'axios'

export function createApiForBE(token?: string) {
  return axios.create({
    baseURL: CONFIG.serverApiUrl,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    timeout: 5000,
  })
}

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