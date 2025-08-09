import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { serverInstance } from '@/lib/axios';
import { AxiosError } from 'axios';

type CreateGoalBody = {
  name: string;
  colorCode: string;
};

export async function POST(req: Request) {
  const token = (await cookies()).get('accessToken')?.value;
  if (!token) {
    return NextResponse.json(
      { isSuccess: false, code: 'COMMON403', message: 'No token' },
      { status: 401 },
    );
  }

  try {
    const body: CreateGoalBody = await req.json();

    const { data, status } = await serverInstance.post('/goal/create', body, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return NextResponse.json(data, { status });
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(error.response?.data ?? {}, {
        status: error.response?.status ?? 500,
      });
    }
    return NextResponse.json(
      { isSuccess: false, code: 'COMMON500', message: 'Server error' },
      { status: 500 },
    );
  }
}
