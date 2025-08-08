import { NextResponse } from 'next/server';
import { instance } from '@/lib/axios';

export async function GET(req: Request) {
  try {
    const { data } = await instance.get('/user/detail', {
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`
      }
    })

    return NextResponse.json(data.result);
  } catch (error) {
    console.log(error)
  }
}
