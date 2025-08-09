import { NextResponse } from 'next/server';
import { serverInstance } from '@/lib/axios';
import { cookies } from 'next/headers';

export async function GET(req: Request) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  try {
    const { data } = await serverInstance.get('/goal/progress', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return NextResponse.json(data.result);
  } catch (error) {
    return NextResponse.json({ goalProgressList: [] });
  }
}
