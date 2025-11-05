import { NextRequest, NextResponse } from 'next/server'
import { jwtDecode } from 'jwt-decode'

import { USER_ROLE } from './constant'

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get('accessToken')?.value || ''
  if (accessToken && (req.nextUrl.pathname === '/signin' || req.nextUrl.pathname === '/signup')) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  if (accessToken) {
    const role = jwtDecode<{ role: string }>(accessToken).role
    if (role === USER_ROLE.CUSTOMER && req.nextUrl.pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  if (!accessToken && req.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/signin', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/signin', '/signup', '/admin/:path*'],
}
