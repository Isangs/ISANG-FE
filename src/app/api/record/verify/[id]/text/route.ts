import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ??
  process.env.API_BASE ??
  process.env.API_URL ??
  '';

export async function POST(
  req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  try {
    if (!API_BASE) {
      return NextResponse.json(
        { isSuccess: false, code: 'COMMON500', message: 'API_BASE is empty' },
        { status: 500 },
      );
    }

    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;
    if (!token) {
      return NextResponse.json(
        { isSuccess: false, code: 'COMMON403', message: 'No token' },
        { status: 401 },
      );
    }

    const { id } = await ctx.params;
    const body = (await req.json()) as { content?: string };

    const backendUrl = `${API_BASE}/record/verify/${id}/text`;
    const res = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
      cache: 'no-store',
    });

    // 응답 안전 파싱
    const raw = await res.text();
    let parsed: unknown = {};
    try {
      parsed = raw ? JSON.parse(raw) : {};
    } catch {
      parsed = { message: raw }; // text/plain 대응
    }

    // 최소 응답 형태 보장 { isSuccess, code, message }
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
