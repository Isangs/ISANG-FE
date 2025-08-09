import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ??
  process.env.API_BASE ??
  process.env.API_URL ??
  '';

export async function GET() {
  try {
    if (!API_BASE) {
      return NextResponse.json(
        { isSuccess: false, code: 'COMMON500', message: 'API_BASE is empty' },
        { status: 500 },
      );
    }

    const cookieStore = await cookies();
    const rawToken =
      cookieStore.get('accessToken')?.value ??
      cookieStore.get('access_token')?.value ??
      cookieStore.get('Authorization')?.value ??
      '';
    const token = rawToken.startsWith('Bearer ')
      ? rawToken.split(' ')[1]
      : rawToken;

    if (!token) {
      return NextResponse.json(
        { isSuccess: false, code: 'COMMON403', message: 'No token' },
        { status: 401 },
      );
    }

    const res = await fetch(`${API_BASE}/goal/list`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    });

    const raw = await res.text();
    let parsed: unknown = {};
    try {
      parsed = raw ? JSON.parse(raw) : {};
    } catch {
      parsed = { message: raw };
    }
    const obj = (parsed && typeof parsed === 'object' ? parsed : {}) as Record<
      string,
      unknown
    >;
    const payload = {
      ...obj,
      isSuccess: res.ok && obj['isSuccess'] !== false,
      code: (obj['code'] as string | undefined) ?? `COMMON${res.status}`,
      message:
        (obj['message'] as string | undefined) ??
        res.statusText ??
        'Request failed',
    };

    return NextResponse.json(payload, { status: res.status });
  } catch (err: unknown) {
    const message =
      err instanceof Error
        ? err.message
        : typeof err === 'string'
          ? err
          : 'Server error';
    return NextResponse.json(
      { isSuccess: false, code: 'COMMON500', message },
      { status: 500 },
    );
  }
}
