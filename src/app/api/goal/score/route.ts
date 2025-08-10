import { NextResponse } from 'next/server';
import { GET_UPSTREAM } from '@/shared/api/upstream';
export async function GET() {
  const { status, data } = await GET_UPSTREAM('/goal/score');
  return NextResponse.json(data, { status });
}
