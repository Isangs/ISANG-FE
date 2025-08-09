import { NextResponse } from 'next/server';
import { DELETE_UPSTREAM } from '@/shared/api/upstream';
type Ctx = { params: { id: string } };
export async function DELETE(_: Request, { params }: Ctx) {
  const { status, data } = await DELETE_UPSTREAM(`/activity/${params.id}`);
  return NextResponse.json(data, { status });
}
