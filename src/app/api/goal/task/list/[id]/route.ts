import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { serverInstance } from '@/lib/axios';

export async function GET(
  _request: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await ctx.params;
    const token = (await cookies()).get('accessToken')?.value;
    if (!token) {
      return NextResponse.json(
        { isSuccess: false, code: 'COMMON403', message: 'No token' },
        { status: 401 },
      );
    }

    const { data, status } = await serverInstance.get(`/goal/task/list/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return NextResponse.json(data.result, { status });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json(
      { isSuccess: false, code: 'COMMON500', message: msg },
      { status: 500 },
    );
  }
}
