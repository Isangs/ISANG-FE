import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { serverInstance } from '@/lib/axios';

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value; // ← 실제 쿠키 키 확인

    const { id } = await params;
    const body = (await req.json()).body as {
      isAddRecord: boolean;
      isPublic: boolean;
    };

    const { status } = await serverInstance.patch(`/task/${id}`, body, {
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
