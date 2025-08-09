import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { serverInstance } from '@/lib/axios';
import { AxiosError } from 'axios';

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  try {
    const { data, status } = await serverInstance.get(`/task/list`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return NextResponse.json(data.result, { status });
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json({}, { status: error.status });
    }

    return NextResponse.json({}, { status: 500 });
  }
}
