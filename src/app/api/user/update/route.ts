import { NextResponse } from 'next/server';
import { PATCH_UPSTREAM } from '@/shared/api/upstream';
export async function PATCH(req: Request) {
  const body = await req.json().catch(() => ({}));
  const { status, data } = await PATCH_UPSTREAM('/user/update', body);
  return NextResponse.json(data, { status });
}
