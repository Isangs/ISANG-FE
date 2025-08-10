import { NextResponse } from 'next/server';
import { PATCH_UPSTREAM } from '@/shared/api/upstream';
import { AxiosError } from 'axios';

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  const body = await req.json();

  try {
    const { status } = await PATCH_UPSTREAM(
      `/feed/${id}/reaction?reactionType=${body.reactionType}`,
      body,
    );

    return NextResponse.json({}, { status });
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data);
    }
  }
}
