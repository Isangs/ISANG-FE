import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const user = await req.json();

  console.log('서버에서 받은 유저 정보:', user);

  return NextResponse.json({ success: true });
}
