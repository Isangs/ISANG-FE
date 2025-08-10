import { api } from './axios'

type ApiEnvelope = { code?: string; message?: string; isSuccess?: boolean };

export async function verifyCompletionText(taskId: number, content: string) {
  await api.post(`/record/verify/${taskId}/text`, {
    body: { content },
  });
}

export async function verifyCompletionImage(taskId: number, imageUrl: string) {
  await api.post(`/record/verify/${taskId}/image`, {
    body: { imageUrl },
  });
}

export async function updateRecordSettings({
  taskId,
  isAddRecord,
  isPublic,
}: { taskId: number; isAddRecord: boolean; isPublic: boolean}) {
  await api.patch(`/task/${taskId}`, {
    body: {
      isAddRecord,
      isPublic
    },
  });
}
