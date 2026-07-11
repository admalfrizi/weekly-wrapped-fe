import { CONFIG } from "@/config";
import axios, { AxiosError } from "axios";

const isServer = typeof window === 'undefined';

export const baseURL = isServer 
    ? CONFIG.serverApiUrl 
    : CONFIG.apiUrl;

const axiosInstance = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
})

axiosInstance.interceptors.request.use(async (config) => {
  if (isServer) {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    
    const token = cookieStore.get('token')?.value;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error: AxiosError<{ message?: string }>) => {
        const message =
        error.response?.data?.message ?? error.message ?? "Something went wrong";
        return Promise.reject(new Error(message));
    }
);

export default axiosInstance;