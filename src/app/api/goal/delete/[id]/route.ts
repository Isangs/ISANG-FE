import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { serverInstance } from '@/lib/axios';
import { AxiosError } from 'axios';

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const token = (await cookies()).get('accessToken')?.value;
  if (!token) {
    return NextResponse.json(
      { isSuccess: false, code: 'COMMON403', message: 'No token' },
      { status: 401 },
    );
  }

  try {
    const { data, status } = await serverInstance.delete(
      `/goal/delete/${params.id}`,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return NextResponse.json(data ?? {}, { status });
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
