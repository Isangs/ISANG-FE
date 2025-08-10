import { NextResponse } from 'next/server';
import { GET_UPSTREAM } from '@/shared/api/upstream';

type Ctx = { params: { id: string } };

export async function GET(_: Request, _res: Response, ctx: Ctx) {
  const { status, data } = await GET_UPSTREAM('/activity');
  return NextResponse.json(data, { status });
}
