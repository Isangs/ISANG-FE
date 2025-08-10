import clientInstance from './axios';
import type { Task } from '@/shared/types/goal';

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

export async function fetchTaskList() {
  const { data } = await clientInstance.get('/task/list');
  return data.taskList;
}

// 프론트 폼 기준: title, category(서버 미사용), colorCode(옵션)
export type CreateTaskInput = {
  goalId: number;
  name: string;
  deadline: string;
};

export async function createTask(body: CreateTaskInput) {
  const { data } = await clientInstance.post<Task>('/task/create', body);
  return data;
}

export async function fetchAllTasks(): Promise<Task[]> {
  const { data } = await clientInstance.get('task/list');
  const list = data?.result?.taskList ?? [];
  return list.map(toTask);
}

export async function fetchTasksByGoal(goalId: number): Promise<Task[]> {
  const { data } = await clientInstance.get(
    `goal/task/list/${goalId}`,
  );
  const list = data?.result?.taskList ?? [];
  return list.map(toTask);
}

export async function deleteTask(taskId: number) {
  await clientInstance.delete(`task/delete/${taskId}`);
}
