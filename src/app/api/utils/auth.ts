import { cookies } from 'next/headers';

export async function getAccessToken() {
  const jar = await cookies();
  return jar.get('accessToken')?.value ?? '';
}
