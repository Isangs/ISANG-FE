// 프록시(/api/...)만 호출하도록 고정 + 서버/클라 모두 안전
type ApiEnvelope = { code: string; message: string; isSuccess: boolean };

function apiBase() {
  // 클라이언트면 상대경로로 OK
  if (typeof window !== 'undefined') return '';
  // 서버에서 실행될 수도 있으니 절대경로 보정
  const origin =
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.APP_URL ||
    'http://localhost:3000';
  return origin.replace(/\/$/, '');
}

export async function verifyCompletionText(goalId: number, content: string) {
  const url = `${apiBase()}/api/record/verify/${goalId}/text`; // ← /api/ 로 고정
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  });
  const data = (await res.json()) as ApiEnvelope;
  if (!res.ok || !data.isSuccess)
    throw new Error(`${data.code}: ${data.message}`);
  return data;
}

export async function verifyCompletionImage(goalId: number, imageUrl: string) {
  const url = `${apiBase()}/api/record/verify/${goalId}/image`; // ← /api/
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imageUrl }),
  });
  const data = (await res.json()) as ApiEnvelope;
  if (!res.ok || !data.isSuccess)
    throw new Error(`${data.code}: ${data.message}`);
  return data;
}

export async function updateRecordSettings(payload: {
  goalId: number;
  recordEnabled: boolean;
  isPrivate: boolean;
}) {
  const url = `${apiBase()}/api/record/setting/update`; // ← /api/
  const res = await fetch(url, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = (await res.json()) as ApiEnvelope;
  if (!res.ok || !data.isSuccess)
    throw new Error(`${data.code}: ${data.message}`);
  return data;
}
