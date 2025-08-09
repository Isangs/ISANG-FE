import { NextResponse } from 'next/server';
import { serverInstance } from '@/lib/axios';
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const code = url.searchParams.get('code');
    const redirect = url.searchParams.get('redirect') || '/mypage';

    if (!code) return NextResponse.redirect(new URL('/login', url));

    const { data } = await serverInstance.post(`/auth/oauth/login/${code}`);
    const accessToken = data.result.accessToken;

    const res = NextResponse.redirect(new URL(redirect, url));

    res.cookies.set({
      name: 'accessToken',
      value: accessToken,
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 3600,
    });

    return res;
  } catch (e) {
    console.log(e);

    // const url = new URL(req.url);

    // return NextResponse.redirect(new URL('/example', url));
  }
}
