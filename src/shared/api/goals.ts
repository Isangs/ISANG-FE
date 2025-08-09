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

// 여러 형태 수용
type GoalListRes =
  | { result?: { goalList?: ApiGoal[] } }
  | { goalList?: ApiGoal[] }
  | { data?: ApiGoal[] }
  | { content?: ApiGoal[] }
  | ApiGoal[];

type TaskListRes = { result?: { taskList?: ApiTask[] } };

// create 응답도 단일/엔벨롭 모두 수용
type CreateGoalRes = { result: ApiGoal } | ApiGoal;

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

/** ---------- Helpers ---------- **/
function extractGoals(d: GoalListRes): ApiGoal[] {
  if (Array.isArray(d)) return d;
  if ('result' in d && d.result?.goalList) return d.result.goalList;
  if ('goalList' in d && d.goalList) return d.goalList;
  if ('data' in d && Array.isArray(d.data)) return d.data;
  if ('content' in d && Array.isArray(d.content)) return d.content;
  return [];
}

function hasResultGoal(d: CreateGoalRes): d is { result: ApiGoal } {
  return typeof d === 'object' && d !== null && 'result' in d;
}

/** ---------- Goals ---------- **/
// src/shared/api/goals.ts
export async function fetchGoals(): Promise<Goal[]> {
  const { data } = await clientInstance.get<GoalListRes>('goal/list');

  if (process.env.NODE_ENV !== 'production') {
    console.log('[fetchGoals] raw data:', JSON.stringify(data));
  }

  const list = extractGoals(data);

  if (process.env.NODE_ENV !== 'production') {
    console.log('[fetchGoals] extracted length:', list.length);
  }

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

  const { data } = await clientInstance.post<CreateGoalRes>('goal/create', {
    name,
    colorCode,
  });

  const raw: ApiGoal = hasResultGoal(data) ? data.result : data;
  return toGoal(raw);
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
