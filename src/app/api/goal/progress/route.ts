import { NextResponse } from 'next/server';
import { GET_UPSTREAM } from '@/shared/api/upstream';
export async function GET() {
  const { status, data } = await GET_UPSTREAM('/goal/progress');

  if (status === 404) {
    return NextResponse.json({ goalProgressList: [] }, { status: 200 });
  }

  return NextResponse.json(data, { status });
}
