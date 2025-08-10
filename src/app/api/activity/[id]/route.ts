import { NextResponse } from 'next/server';
import { DELETE_UPSTREAM } from '@/shared/api/upstream';

type Ctx = { params: Promise<{ id: string }> };

export async function DELETE(_: Request, { params }: Ctx) {
  const { id } = await params;

  const { status, data } = await DELETE_UPSTREAM(`/activity/${id}`);
  return NextResponse.json(data, { status });
}
