import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { serverInstance } from '@/lib/axios';
import { AxiosError } from 'axios';

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;

    const { body } = await req.json();
    const { id } = await params;

    const { status } = await serverInstance.post(`/feed/text/${id}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json({}, { status: status });
  } catch (error) {
    if(error instanceof AxiosError) {
      console.log(error.response?.data)
    }

    return NextResponse.json({}, { status: 500 });
  }
}
