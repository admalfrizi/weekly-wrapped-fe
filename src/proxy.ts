import { NextRequest, NextResponse } from "next/server"
import { CONFIG } from "./config"

export async function proxy(request: NextRequest) {
  const currentPath = request.nextUrl.pathname

  if (
    currentPath.startsWith('/_next') ||
    currentPath.startsWith('/api') ||
    currentPath === '/favicon.ico'
  ) {
    return NextResponse.next()
  }

  let accessToken = request.cookies.get('accessToken')?.value
  const refreshToken = request.cookies.get('refreshToken')?.value
  const expiresAt = request.cookies.get('expiresAt')?.value

  let newAccessToken: string | undefined
  let newExpiresAt: string | undefined

  if (accessToken && expiresAt) {
    const isExpired = Date.now() >= parseInt(expiresAt, 10)

    if (isExpired) {
      if (refreshToken) {
        try {
          const refreshRes = await fetch(CONFIG.serverApiUrl + '/refresh', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh_token: refreshToken }),
          })

          if (refreshRes.ok) {
            const result = await refreshRes.json()
            
            newAccessToken = String(result.data.access_token)
            newExpiresAt = String(result.data.access_token_expires_at * 1000)
            
            accessToken = newAccessToken
            
          } else {
            return forceLogout(request)
          }
        } catch (error) {
          return forceLogout(request)
        }
      } else {
        accessToken = undefined 
      }
    }
  }
  
  const isAuthRoute = currentPath === '/login' || currentPath === '/register'
  let response: NextResponse

  if (isAuthRoute) {
    if (accessToken) {
      response = NextResponse.redirect(new URL('/', request.url))
    } else {
      response = NextResponse.next()
    }
  } else if (!accessToken) {
    response = NextResponse.redirect(new URL('/login', request.url))
  } else {
    response = NextResponse.next()
  }

  if (newAccessToken && newExpiresAt) {
    response.cookies.set('accessToken', newAccessToken, {
      httpOnly: true,
      path: '/',
      secure: CONFIG.requestSecureCookies === 'true',
      sameSite: 'lax',
    })
    
    response.cookies.set('expiresAt', newExpiresAt, {
      httpOnly: true,
      path: '/',
      secure: CONFIG.requestSecureCookies === 'true',
      sameSite: 'lax',
    })
  }

  return response
}

function forceLogout(request: NextRequest) {
  const response = NextResponse.redirect(new URL('/login', request.url))
  response.cookies.delete('accessToken')
  response.cookies.delete('refreshToken')
  response.cookies.delete('expiresAt')
  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}