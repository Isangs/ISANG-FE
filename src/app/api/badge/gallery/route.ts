import { NextResponse } from 'next/server';
import { GET_UPSTREAM } from '@/shared/api/upstream';
type GalleryResp = {
  result?: {
    badgeList?: Array<{ badge: string; name: string }>;
  };
};

export async function GET() {
  const { status, data } = await GET_UPSTREAM<GalleryResp>('/badge/gallery');

  const list = Array.isArray(data?.result?.badgeList)
    ? data.result!.badgeList!
    : [];

  return NextResponse.json({ badgeList: list }, { status: status ?? 200 });
}
