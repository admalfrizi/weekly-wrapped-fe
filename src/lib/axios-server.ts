import { CONFIG } from '@/config'
import axios from 'axios'

export function createApiForServer(token?: string) {
  return axios.create({
    baseURL: CONFIG.serverApiUrl,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    timeout: 5000,
  })
}