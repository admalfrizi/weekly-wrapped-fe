import { NextRequest, NextResponse } from "next/server"

export function proxy(request: NextRequest) {
  const currentPath = request.nextUrl.pathname

  if (
    currentPath.startsWith('/_next') ||
    currentPath.startsWith('/api') ||
    currentPath === '/favicon.ico'
  ) {
    return NextResponse.next()
  }

  const token = request.cookies.get('token')?.value
  
  const isAuthRoute = currentPath === '/login' || currentPath === '/register'
  
  if (isAuthRoute) {
    if (token) {
      return NextResponse.redirect(new URL('/', request.url))
    }
    return NextResponse.next()
  }

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}