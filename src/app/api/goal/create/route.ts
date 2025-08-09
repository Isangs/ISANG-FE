// src/app/api/goal/create/route.ts
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ??
  process.env.API_BASE ??
  process.env.API_URL ??
  '';

export async function POST(req: Request) {
  try {
    const token = (await cookies()).get('accessToken')?.value;
    if (!token)
      return NextResponse.json(
        { isSuccess: false, code: 'COMMON403', message: 'No token' },
        { status: 401 },
      );

    const body = await req.json();

    const res = await fetch(`${API_BASE}/goal/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
      cache: 'no-store',
    });

    const raw = await res.text();
    let payload: unknown = {};
    try {
      payload = raw ? JSON.parse(raw) : {};
    } catch {
      payload = { message: raw };
    }

    return NextResponse.json(payload, { status: res.status });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json(
      { isSuccess: false, code: 'COMMON500', message: msg },
      { status: 500 },
    );
  }
}
