import { NextResponse } from 'next/server';
import { serverInstance } from '@/lib/axios';
import { cookies } from 'next/headers';
import { CreateTaskInput } from '@/shared/api/tasks';
import { AxiosError } from 'axios';

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  const body: CreateTaskInput = await req.json()

  try {
     const { status } = await serverInstance.post('/task', body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    return NextResponse.json({}, { status });
  } catch (error) {
    if(error instanceof AxiosError) {
      console.log(error.response?.data);
    }
  }
}
