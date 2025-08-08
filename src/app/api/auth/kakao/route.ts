// src/app/api/auth/kakao/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { code } = await req.json();

    if (!code) {
      return NextResponse.json({ error: 'missing_code' }, { status: 400 });
    }

    const clientId = process.env.KAKAO_CLIENT_ID;
    const clientSecret = process.env.KAKAO_CLIENT_SECRET;
    const redirectUri = process.env.KAKAO_REDIRECT_URI;

    if (!clientId || !redirectUri) {
      return NextResponse.json(
        {
          error: 'env_missing',
          detail: { clientId: !!clientId, redirectUri: !!redirectUri },
        },
        { status: 500 },
      );
    }

    const form = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: clientId,
      redirect_uri: redirectUri,
      code,
    });
    if (clientSecret) {
      form.set('client_secret', clientSecret);
    }

    const tokenRes = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      body: form,

      cache: 'no-store',
    });

    if (!tokenRes.ok) {
      const errText = await tokenRes.text().catch(() => '');
      return NextResponse.json(
        {
          error: 'token_exchange_failed',
          status: tokenRes.status,
          body: errText,
        },
        { status: 400 },
      );
    }

    const token = await tokenRes.json();
    const accessToken = token.access_token as string | undefined;

    if (!accessToken) {
      return NextResponse.json({ error: 'no_access_token' }, { status: 400 });
    }

    // HttpOnly 쿠키로 저장
    const res = NextResponse.json({ ok: true });
    res.cookies.set({
      name: 'accessToken',
      value: accessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60, // 1h
    });
    return res;
  } catch (e) {
    const detail = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: 'unexpected', detail }, { status: 500 });
  }
}
