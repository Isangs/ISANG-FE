import { serverInstance } from './../../../lib/axios';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(req: Request) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  const { data } = await serverInstance.get('/activity', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return NextResponse.json(data);
}
