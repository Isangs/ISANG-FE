import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ??
  process.env.API_BASE ??
  process.env.API_URL ??
  '';

type CreateGoalBody = {
  name: string;
  colorCode: string;
};

export async function POST(req: Request) {
  try {
    const token = (await cookies()).get('accessToken')?.value;
    if (!token) {
      return NextResponse.json(
        { isSuccess: false, code: 'COMMON403', message: 'No token' },
        { status: 401 },
      );
    }

    const body: CreateGoalBody = await req.json();
    console.log('[goal/create] body:', body);
    const res = await fetch(`${API_BASE}/goal/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
      cache: 'no-store',
      redirect: 'manual',
    });

    const payload = await res.json().catch(() => ({}));
    return NextResponse.json(payload, { status: res.status });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json(
      { isSuccess: false, code: 'COMMON500', message: msg },
      { status: 500 },
    );
  }
}
