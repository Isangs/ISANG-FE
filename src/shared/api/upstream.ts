import 'server-only';
import axios, { AxiosError } from 'axios';
import { cookies } from 'next/headers';
import { serverInstance } from '@/lib/axios';

export type Result<T> = { status: number; data: T };

type Query =
  | URLSearchParams
  | Record<string, string | number | boolean | null | undefined>;

async function auth(): Promise<Record<string, string>> {
  const jar = await cookies();
  const token = jar.get('accessToken')?.value;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function unwrapError(e: unknown): Result<unknown> {
  if (axios.isAxiosError(e)) {
    const err = e as AxiosError;
    return {
      status: err.response?.status ?? 500,
      data: err.response?.data ?? { message: err.message },
    };
  }
  return {
    status: 500,
    data: { message: e instanceof Error ? e.message : 'Unknown error' },
  };
}

export async function GET_UPSTREAM<T = unknown>(
  path: string,
  params?: Query,
): Promise<Result<T>> {
  try {
    const { data, status } = await serverInstance.get(`${path}`, {
      headers: await auth(),
      params,
    });
    return { status, data: data.result };
  } catch (e: unknown) {
    return unwrapError(e) as Result<T>;
  }
}

export async function PATCH_UPSTREAM<T = unknown>(
  path: string,
  body?: unknown,
): Promise<Result<T>> {
  try {
    const { data, status } = await serverInstance.patch(`${path}`, body, {
      headers: await auth(),
    });
    return { status, data: data.result };
  } catch (e: unknown) {
    return unwrapError(e) as Result<T>;
  }
}

export async function DELETE_UPSTREAM<T = unknown>(
  path: string,
): Promise<Result<T>> {
  try {
    const { data, status } = await serverInstance.delete(`${path}`, {
      headers: await auth(),
    });
    return { status, data: data.result };
  } catch (e: unknown) {
    return unwrapError(e) as Result<T>;
  }
}
