import { NextResponse } from 'next/server';
import { GET_UPSTREAM } from '@/shared/api/upstream';

export async function GET(_: Request) {
  const { status, data } = await GET_UPSTREAM('/activity');
  return NextResponse.json(data, { status });
}
