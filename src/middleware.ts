import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get('accessToken')?.value || ''
  if (accessToken && (req.nextUrl.pathname === '/signin' || req.nextUrl.pathname === '/signup')) {
    return NextResponse.redirect(new URL('/', req.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/signin', '/signup'],
}
