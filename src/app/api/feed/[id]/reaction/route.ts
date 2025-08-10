import { NextResponse } from 'next/server';
import { PATCH_UPSTREAM } from '@/shared/api/upstream';

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  const body = await req.json().catch(() => ({}));
  const { status, data } = await PATCH_UPSTREAM(`/feed/${id}/reaction`, body);
  return NextResponse.json(data, { status });
}
