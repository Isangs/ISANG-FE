import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PROTECTED = ['/mypage', '/settings', '/feed', '/home'];

export function middleware(req: NextRequest) {
  if (PROTECTED.some((p) => req.nextUrl.pathname.startsWith(p))) {
    const hasToken = req.cookies.has('accessToken');
    if (!hasToken) {
      const login = new URL('/login', req.url);
      return NextResponse.redirect(login);
    }
  }
  return NextResponse.next();
}
