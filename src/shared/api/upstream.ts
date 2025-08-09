import 'server-only';
import axios, { AxiosError } from 'axios';
import { cookies } from 'next/headers';

const API_URL =
  process.env.API_URL ||
  process.env.API_BASE ||
  process.env.NEXT_PUBLIC_API_BASE ||
  '';

type Result<T> = { status: number; data: T | unknown };

async function auth(): Promise<Record<string, string>> {
  const jar = await cookies();
  const token = jar.get('accessToken')?.value;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function unwrapError(e: unknown): Result<never> {
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

export async function GET_UPSTREAM<T>(
  path: string,
  params?: Record<string, unknown>,
): Promise<Result<T>> {
  if (!API_URL) throw new Error('API_URL missing');
  try {
    const res = await axios.get<T>(`${API_URL}${path}`, {
      headers: await auth(),
      params,
    });
    return { status: res.status, data: res.data };
  } catch (e: unknown) {
    return unwrapError(e);
  }
}

export async function PATCH_UPSTREAM<T>(
  path: string,
  body?: unknown,
): Promise<Result<T>> {
  if (!API_URL) throw new Error('API_URL missing');
  try {
    const res = await axios.patch<T>(`${API_URL}${path}`, body, {
      headers: await auth(),
    });
    return { status: res.status, data: res.data };
  } catch (e: unknown) {
    return unwrapError(e);
  }
}

export async function DELETE_UPSTREAM<T>(path: string): Promise<Result<T>> {
  if (!API_URL) throw new Error('API_URL missing');
  try {
    const res = await axios.delete<T>(`${API_URL}${path}`, {
      headers: await auth(),
    });
    return { status: res.status, data: res.data };
  } catch (e: unknown) {
    return unwrapError(e);
  }
}
