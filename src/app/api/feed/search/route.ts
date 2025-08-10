import { NextResponse } from 'next/server';
import { GET_UPSTREAM } from '@/shared/api/upstream';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') ?? '';
  const { status, data } = await GET_UPSTREAM(`/feed/search?query=${q}`);
  return NextResponse.json(data, { status });
}
