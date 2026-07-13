import axiosInstance from '@/lib/axios-client';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

export async function get<T>(url: string, config?: AxiosRequestConfig) : Promise<AxiosResponse<T>> {
    return axiosInstance.get<T>(url, config);
}

export async function post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
  return axiosInstance.post<T>(url, data, config);
}

export async function put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
  return axiosInstance.put<T>(url, data, config);
}

export async function patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
  return axiosInstance.patch<T>(url, data, config);
}

export async function remove<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
  return axiosInstance.delete<T>(url, config);
}