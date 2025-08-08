import { NextResponse } from 'next/server';

async function exchangeToken(code: string) {
  const form = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: process.env.KAKAO_CLIENT_ID!,
    redirect_uri: process.env.KAKAO_REDIRECT_URI!, // 콘솔과 동일
    code,
  });
  const sec = process.env.KAKAO_CLIENT_SECRET;
  if (sec) form.set('client_secret', sec);

  const r = await fetch('https://kauth.kakao.com/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    body: form,
    cache: 'no-store',
  });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}

// 기존 POST는 놔둬도 되고, 아래 GET만 추가해도 됩니다.
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const code = url.searchParams.get('code');
    const redirect = url.searchParams.get('redirect') || '/mypage';
    if (!code) return NextResponse.redirect(new URL('/login', url));

    const token = await exchangeToken(code);

    const res = NextResponse.redirect(new URL(redirect, url));
    res.cookies.set({
      name: 'accessToken',
      value: token.access_token,
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60,
    });
    return res;
  } catch (e) {
    const detail = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: 'unexpected', detail }, { status: 500 });
  }
}
