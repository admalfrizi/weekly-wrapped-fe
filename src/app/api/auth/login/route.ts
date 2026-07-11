import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { AUTH_PATH } from '@/constant/services'
import { baseURL } from '@/lib/axios'
import { LoginData } from '@/lib/validation'
import { CONFIG } from '@/config'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = LoginData.safeParse(body.loginData);

    if (!validatedData.success) {
      return NextResponse.json({ error: 'Invalid payload format' }, { status: 400 })
    }

    const res = await fetch(CONFIG.serverApiUrl + AUTH_PATH.LOGIN_URL, {
      method: 'POST',
      body: JSON.stringify(body.loginData),
      headers: { 'Content-Type': 'application/json' },
    })

    const data = await res.json()
    const token = data.data.access_token;
    const user = data.data.user

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status })
    }

    (await cookies()).set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24
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