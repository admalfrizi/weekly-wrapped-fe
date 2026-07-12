// app/api/proxy/[...path]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { CONFIG } from '@/config';

const BACKEND_URL = CONFIG.serverApiUrl;

async function forwardRequest(
  request: NextRequest, 
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const endpoint = path.join('/');
  const targetUrl = `${BACKEND_URL}/${endpoint}`;

  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  const headers = new Headers();
  headers.set('Content-Type', 'application/json');
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  let body;
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    body = await request.text();
  }

  try {
    const response = await fetch(targetUrl, {
      method: request.method,
      headers,
      body,
    });

    const data = await response.json().catch(() => ({}));
    return NextResponse.json(data, { status: response.status });

  } catch (error) {
    return NextResponse.json(
      { message: 'Internal Proxy Error' }, 
      { status: 500 }
    );
  }
}

// Export the specific methods Next.js expects
export const POST = forwardRequest;
export const PATCH = forwardRequest;
export const PUT = forwardRequest;
export const DELETE = forwardRequest;
export const GET = forwardRequest;