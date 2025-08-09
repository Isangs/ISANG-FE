import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ??
  process.env.API_BASE ??
  process.env.API_URL ??
  '';

export async function POST(req: Request) {
  try {
    if (!API_BASE) {
      return NextResponse.json(
        { isSuccess: false, code: 'COMMON500', message: 'API_BASE is empty' },
        { status: 500 },
      );
    }

    const cookieStore = await cookies();
    const token =
      cookieStore.get('accessToken')?.value ??
      cookieStore.get('access_token')?.value ??
      cookieStore.get('Authorization')?.value ??
      '';

    if (!token) {
      return NextResponse.json(
        { isSuccess: false, code: 'COMMON403', message: 'No token' },
        { status: 401 },
      );
    }

    const body = (await req.json()) as { taskId?: number; imageUrl?: string };
    if (typeof body.taskId !== 'number' || !body.imageUrl) {
      return NextResponse.json(
        {
          isSuccess: false,
          code: 'COMMON400',
          message: 'taskId and imageUrl required',
        },
        { status: 400 },
      );
    }

    const res = await fetch(`${API_BASE}/record/verify/image`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}`,
      },
      body: JSON.stringify(body),
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
