import { NextResponse } from 'next/server';
import { GET_UPSTREAM } from '@/shared/api/upstream';

export async function GET() {
  const { status, data } = await GET_UPSTREAM('/badge/gallery');

  const list = Array.isArray(data?.result?.badgeList)
    ? data.result!.badgeList!
    : [];

  return NextResponse.json({ badgeList: list }, { status: status ?? 200 });
}
