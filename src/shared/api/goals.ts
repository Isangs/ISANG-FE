import clientInstance from './axios';
import type { Goal, Task, CreateTaskDto } from '@/shared/types/goal';

/** ---------- API 응답 모델 ---------- **/
type ApiGoal = {
  goalId: number;
  name: string;
  colorCode?: string;
  categoryName?: string;
  percentageScore?: number;
};

type ApiTask = {
  taskId: number;
  goal: { goalId: number; name: string; colorCode: string };
  name: string;
  priority?: string;
  percentageScore?: number;
  deadline?: number[];
};

type GoalListRes = { result?: { goalList?: ApiGoal[] } };
type TaskListRes = { result?: { taskList?: ApiTask[] } };

/** ---------- Normalizers ---------- **/
const toGoal = (g: ApiGoal): Goal => ({
  id: g.goalId,
  title: g.name,
  category: g.categoryName ?? '기타',
  score: Math.round(g.percentageScore ?? 0),
});

const toTask = (t: ApiTask): Task => ({
  id: t.taskId,
  goalId: t.goal.goalId,
  title: t.name,
  isDone: (t.percentageScore ?? 0) >= 100,
});

/** ---------- Goals ---------- **/
export async function fetchGoals(): Promise<Goal[]> {
  const { data } = await clientInstance.get<GoalListRes>('goal/list');
  const list = data?.result?.goalList ?? [];
  return list.map(toGoal);
}

// 프론트 폼 기준: title, category(서버 미사용), colorCode(옵션)
type CreateGoalInput = {
  title: string;
  category?: string;
  colorCode?: string;
};

export async function createGoal(body: CreateGoalInput) {
  const name = body.title?.trim();
  if (!name) throw new Error('title is required');

  const colorCode = (body.colorCode ?? '#FFFFFF').trim();

  const { data } = await clientInstance.post<Goal>('goal/create', {
    name,
    colorCode,
  });
  return data;
}

export async function deleteGoal(goalId: number) {
  await clientInstance.delete(`goal/delete/${goalId}`);
}

/** ---------- Tasks ---------- **/
export async function fetchAllTasks(): Promise<Task[]> {
  const { data } = await clientInstance.get<TaskListRes>('task/list');
  const list = data?.result?.taskList ?? [];
  return list.map(toTask);
}

export async function fetchTasksByGoal(goalId: number): Promise<Task[]> {
  const { data } = await clientInstance.get<TaskListRes>(
    `goal/task/list/${goalId}`,
  );
  const list = data?.result?.taskList ?? [];
  return list.map(toTask);
}

export async function createTask(body: CreateTaskDto) {
  const { data } = await clientInstance.post<Task>('task/create', body);
  return data;
}

export async function deleteTask(taskId: number) {
  await clientInstance.delete(`task/delete/${taskId}`);
}
