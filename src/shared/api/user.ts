import { User } from '@/shared/types/user';

export async function updateUser(data: User) {
  const res = await fetch('/api/user/update', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('업데이트 실패');
  return res.json();
}
