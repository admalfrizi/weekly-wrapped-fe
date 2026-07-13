import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { AUTH_PATH } from '@/constant/services'
import { LoginData } from '@/lib/validation'
import { CONFIG } from '@/config'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = LoginData.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json({ error: 'Invalid payload format' }, { status: 400 })
    }

    const res = await fetch(CONFIG.serverApiUrl + AUTH_PATH.LOGIN_URL, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })

    const data = await res.json()

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status })
    }

    const { 
      access_token, 
      refresh_token, 
      access_token_expires_at, 
      user 
    } = data.data;

    const expiresAtMs = access_token_expires_at * 1000;

    const cookieStore = await cookies();

    cookieStore.set('accessToken', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    })

    cookieStore.set('refreshToken', refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    })

    cookieStore.set('expiresAt', String(expiresAtMs), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    })

    return NextResponse.json({ 
      success: true, 
      user: user
    })

  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' }, 
      { status: 500 }
    )
  }
}