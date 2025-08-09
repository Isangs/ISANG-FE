import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ??
  process.env.API_BASE ??
  process.env.API_URL ??
  '';

export async function PATCH(req: Request) {
  try {
    if (!API_BASE) {
      return NextResponse.json(
        { isSuccess: false, code: 'COMMON500', message: 'API_BASE is empty' },
        { status: 500 },
      );
    }

    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value; // ← 실제 쿠키 키 확인
    if (!token) {
      return NextResponse.json(
        { isSuccess: false, code: 'COMMON403', message: 'No token' },
        { status: 401 },
      );
    }

    const body = (await req.json()) as {
      goalId?: number;
      recordEnabled?: boolean;
      isPrivate?: boolean;
    };
    // (옵션) 간단 검증
    if (typeof body.goalId !== 'number') {
      return NextResponse.json(
        { isSuccess: false, code: 'COMMON400', message: 'goalId required' },
        { status: 400 },
      );
    }

    const res = await fetch(`${API_BASE}/record/setting/update`, {
      method: 'PATCH',
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
