import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? process.env.API_BASE ?? '';

export async function POST(
  req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  try {
    // 0) 환경 점검
    if (!API_BASE) {
      console.error('[verify:text] API_BASE is empty');
      return NextResponse.json(
        { isSuccess: false, code: 'COMMON500', message: 'API_BASE is empty' },
        { status: 500 },
      );
    }

    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;
    if (!token) {
      console.warn('[verify:text] no accessToken cookie');
      return NextResponse.json(
        { isSuccess: false, code: 'COMMON403', message: 'No token' },
        { status: 401 },
      );
    }

    const { id } = await ctx.params;
    const body = (await req.json()) as { content?: string };

    const backendUrl = `${API_BASE}/record/verify/${id}/text`;
    console.log(
      '[verify:text] ->',
      backendUrl,
      'contentLen=',
      body?.content?.length ?? 0,
    );

    const res = await fetch(backendUrl, {
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
      payload = raw ? (JSON.parse(raw) as unknown) : {};
    } catch {
      payload = { message: raw };
    }

    console.log('[verify:text] <- status=', res.status, 'payload=', payload);

    return NextResponse.json(payload, { status: res.status });
  } catch (err: unknown) {
    const message =
      err instanceof Error
        ? err.message
        : typeof err === 'string'
          ? err
          : 'Server error';
    console.error('[verify:text] proxy error:', message);
    return NextResponse.json(
      { isSuccess: false, code: 'COMMON500', message },
      { status: 500 },
    );
  }
}
