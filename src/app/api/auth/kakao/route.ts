// src/app/api/auth/kakao/route.ts
import { NextResponse } from 'next/server';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!;
const PROVIDER_BASE = process.env.KAKAO_LOGIN_BASE_PATH ?? '/auth/oauth/login';

async function exchangeTokenViaBackend(code: string, redirectUri: string) {
  const endpoint = new URL(
    `${PROVIDER_BASE.replace(/\/+$/, '')}/${encodeURIComponent(code)}`,
    API_BASE,
  ).toString();

  console.log('[OAuth] calling backend', { endpoint, redirectUri });

  const r = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ redirectUri }), // 백엔드가 body에 code도 필요하면 { code, redirectUri }
    cache: 'no-store',
  });

  const text = await r.text(); // 응답 항상 확보
  if (!r.ok) {
    console.error('[OAuth] backend error', r.status, text);
    throw new Error(`backend_login_failed: ${r.status} ${text}`);
  }
  try {
    return JSON.parse(text);
  } catch {
    return { accessToken: undefined, raw: text };
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const code = url.searchParams.get('code');
    const redirect = url.searchParams.get('redirect') || '/mypage';
    if (!code) return NextResponse.redirect(new URL('/login', url));

    const origin = `${url.protocol}//${url.host}`;
    const redirectUri = `${origin}/auth/oauth/kakao`;
    console.log('[OAuth] code received', { code, redirectUri });

    const token = await exchangeTokenViaBackend(code, redirectUri);

    const accessToken = token.accessToken ?? token.access_token;
    const maxAge = token.expiresIn ?? token.expires_in ?? 3600;
    if (!accessToken) throw new Error('No access token from backend');

    const res = NextResponse.redirect(new URL(redirect, url));
    res.cookies.set({
      name: 'accessToken',
      value: accessToken,
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge,
    });
    return res;
  } catch (e) {
    const detail = e instanceof Error ? e.message : String(e);
    console.error('[OAuth] route failed', detail);
    // 500 화면 대신 로그인으로 돌려보내고 에러 쿼리 붙이기(임시)
    const url = new URL(req.url);
    return NextResponse.redirect(
      new URL(`/login?err=${encodeURIComponent(detail.slice(0, 200))}`, url),
    );
    // 또는 JSON 그대로 보이게 유지하려면 아래:
    // return NextResponse.json({ error: 'unexpected', detail }, { status: 500 });
  }
}
