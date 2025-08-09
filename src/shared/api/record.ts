type ApiEnvelope = { code?: string; message?: string; isSuccess?: boolean };

function apiBase() {
  if (typeof window !== 'undefined') return '';
  const origin =
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.APP_URL ||
    'http://localhost:3000';
  return origin.replace(/\/$/, '');
}

export async function verifyCompletionText(taskId: number, content: string) {
  const url = `${apiBase()}/api/record/verify/text`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ taskId, content }),
  });
  let data: ApiEnvelope = {};
  try {
    data = await res.json();
  } catch {}
  const ok = res.ok && data.isSuccess !== false;
  if (!ok)
    throw new Error(
      `${data.code ?? `HTTP_${res.status}`}: ${data.message ?? 'Request failed'}`,
    );
  return data;
}

export async function verifyCompletionImage(taskId: number, imageUrl: string) {
  const url = `${apiBase()}/api/record/verify/image`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ taskId, imageUrl }),
  });
  let data: ApiEnvelope = {};
  try {
    data = await res.json();
  } catch {}
  const ok = res.ok && data.isSuccess !== false;
  if (!ok)
    throw new Error(
      `${data.code ?? `HTTP_${res.status}`}: ${data.message ?? 'Request failed'}`,
    );
  return data;
}

export async function updateRecordSettings(payload: {
  goalId: number;
  recordEnabled: boolean;
  isPrivate: boolean;
}) {
  const url = `${apiBase()}/api/record/setting/update`;
  const res = await fetch(url, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  let data: ApiEnvelope = {};
  try {
    data = await res.json();
  } catch {}
  const ok = res.ok && data.isSuccess !== false;
  if (!ok)
    throw new Error(
      `${data.code ?? `HTTP_${res.status}`}: ${data.message ?? 'Request failed'}`,
    );
  return data;
}
