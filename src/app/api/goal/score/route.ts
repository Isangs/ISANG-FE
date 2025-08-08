import { NextResponse } from 'next/server';
import { instance } from '@/lib/axios';

export async function GET(req: Request) {
  const { data } = await instance.get('/goal/score', {
    headers: {
      Authorization: `Bearer ${process.env.API_TOKEN}`
    }
  })

  return NextResponse.json(data.result);
}
