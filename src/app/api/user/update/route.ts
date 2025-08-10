import { NextResponse } from 'next/server';
import { PATCH_UPSTREAM } from '@/shared/api/upstream';
export async function PATCH(req: Request) {
  const body = await req.json();
  console.log(body)
  const { status } = await PATCH_UPSTREAM('/user/update', body);
  return NextResponse.json({ }, { status });
}
