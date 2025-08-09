import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { serverInstance } from '@/lib/axios';
import { AxiosError } from 'axios';

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    console.error('[goal/list] No token');
    return NextResponse.json(
      { isSuccess: false, code: 'COMMON403', message: 'No token' },
      { status: 401 },
    );
  }

  try {
    const { data, status } = await serverInstance.get(`/task/list`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log(
      '[goal/list] status:',
      status,
      'keys:',
      Object.keys(data || {}),
    );
    return NextResponse.json(data.result, { status });
  } catch (e) {
    const err = e as AxiosError;
    console.error(
      '[goal/list] ERROR',
      err.response?.status,
      err.response?.data,
    );
    return NextResponse.json(err.response?.data ?? {}, {
      status: err.response?.status ?? 500,
    });
  }
}
