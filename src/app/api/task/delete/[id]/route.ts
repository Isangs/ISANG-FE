import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { serverInstance } from '@/lib/axios';

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value; // ← 실제 쿠키 키 확인

    const { id } = await params;

    const { status } = await serverInstance.delete(`/task/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json({ }, { status });
  } catch (error) {
    return NextResponse.json(
      { },
      { status: 500 },
    );
  }
}
