import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const user = await req.json();

  console.log('서버에서 받은 유저 정보:', user);

  // 여기서 DB에 저장하는 로직이 들어가야 함
  return NextResponse.json({ success: true });
}
