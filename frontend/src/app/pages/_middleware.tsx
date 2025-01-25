import { NextResponse } from 'next/server';
import jwtDecode from 'jwt-decode';

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.token;

  if (!token && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (token) {
    try {
      const user = jwtDecode(token);

      // Controle de acesso para páginas específicas
      if (pathname.startsWith('/admin') && user.role !== 'admin') {
        return NextResponse.redirect(new URL('/', req.url));
      }

      if (pathname.startsWith('/user') && user.role !== 'user') {
        return NextResponse.redirect(new URL('/', req.url));
      }
    } catch (err) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}
