'use server'

import { PaginationDataResponse } from '@/types/response';
import { cookies } from 'next/headers';

export interface APIResponse<T = any> {
  status: number;
  message: string;
  data?: T;
  errors?: any;
}

export async function fetchWithAuth<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<PaginationDataResponse<T>> {
  const cookieStore = await cookies();
  
  let accessToken = cookieStore.get('accessToken')?.value;
  const expiresAt = cookieStore.get('expiresAt')?.value;

  if (accessToken && expiresAt) {
    const isExpired = Date.now() >= parseInt(expiresAt, 10);

    if (isExpired) {
      const refreshToken = cookieStore.get('refreshToken')?.value;
      
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const refreshRes = await fetch('http://localhost:8080/api/v1/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      if (!refreshRes.ok) {
        cookieStore.delete('accessToken');
        cookieStore.delete('refreshToken');
        cookieStore.delete('expiresAt');
        throw new Error('Session expired. Please log in again.');
      }

      const refreshData = await refreshRes.json();
      const newData = refreshData.data;
      
      const newAccessToken: string = String(newData.access_token);
      const newExpiresAtStr: string = String(newData.access_token_expires_at * 1000);

      accessToken = newAccessToken;

      cookieStore.set('accessToken', newAccessToken, { httpOnly: true, path: '/' });
      cookieStore.set('expiresAt', newExpiresAtStr, { httpOnly: true, path: '/' });
    }
  }

  const headers = new Headers(options.headers);
  
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  const response = await fetch(`http://localhost:8080/api/v1${endpoint}`, {
    ...options,
    headers,
  });

  const jsonResponse = response.json();
  return jsonResponse;
}