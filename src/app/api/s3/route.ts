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

  try {
    const file = (await req.formData()).get('file') as File;

    const formData = new FormData();
    formData.append('file', file);

    const { data, status } = await serverInstance.post('/s3/upload', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
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
