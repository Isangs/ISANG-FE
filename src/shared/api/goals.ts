import type { Task } from '@/shared/types/goal';
import api from '@/shared/api/axios';

type ApiTask = {
  taskId: number;
  goal: { goalId: number; name: string; colorCode: string };
  name: string;
  priority?: string;
  percentageScore?: number;
  deadline?: number[];
};

const toTask = (t: ApiTask): Task => ({
  id: t.taskId,
  goalId: t.goal.goalId,
  title: t.name,
  isDone: (t.percentageScore ?? 0) >= 100,
});

export async function fetchGoalList() {
  const { data } = await api.get('/goal/list');
  return data.goalList;
}

// 프론트 폼 기준: title, category(서버 미사용), colorCode(옵션)
export type CreateGoalInput = {
  name: string;
  colorCode: string;
};

export async function createGoal(body: CreateGoalInput) {
  if (!body.name) throw new Error('title is required');

  const colorCode = (body.colorCode ?? '#FFFFFF').trim();

  await api.post('goal/create', {
    name: body.name,
    colorCode,
  });
}

export async function deleteGoal(goalId: number) {
  await api.delete(`/goal/delete/${goalId}`);
}


export async function fetchTasksByGoal(goalId: number): Promise<Task[]> {
  const { data } = await api.get(
    `/goal/task/list/${goalId}`,
  );
  const list = data?.result?.taskList ?? [];
  return list.map(toTask);
}