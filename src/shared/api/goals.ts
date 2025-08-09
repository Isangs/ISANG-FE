// src/shared/api/goals.ts
import api from '@/shared/api/axios';
import type { Goal, Task, CreateTaskDto } from '@/shared/types/goal'; // ← CreateGoalDto 제거

/** ---------- Goal: 응답 정규화 ---------- **/
type ApiGoal = {
  goalId: number;
  name: string;
  colorCode?: string;
  categoryName?: string;
  percentageScore?: number;
};

type GoalListEnvelope =
  | { result?: { goalList?: ApiGoal[] } }
  | { data?: ApiGoal[] }
  | { content?: ApiGoal[] }
  | ApiGoal[];

function isObj(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null;
}
function hasResult(
  d: GoalListEnvelope,
): d is { result: { goalList?: ApiGoal[] } } {
  return isObj(d) && 'result' in d;
}
function hasData(d: GoalListEnvelope): d is { data?: ApiGoal[] } {
  return isObj(d) && 'data' in d;
}
function hasContent(d: GoalListEnvelope): d is { content?: ApiGoal[] } {
  return isObj(d) && 'content' in d;
}

const normalizeGoal = (g: ApiGoal): Goal => ({
  id: g.goalId,
  title: g.name,
  category: g.categoryName ?? '기타',
  score: Math.round(g.percentageScore ?? 0),
});

export async function fetchGoals(): Promise<Goal[]> {
  const { data } = await api.get<GoalListEnvelope>('goal/list');
  if (Array.isArray(data)) return data.map(normalizeGoal);
  if (hasResult(data) && Array.isArray(data.result?.goalList))
    return data.result.goalList.map(normalizeGoal);
  if (hasData(data) && Array.isArray(data.data))
    return data.data.map(normalizeGoal);
  if (hasContent(data) && Array.isArray(data.content))
    return data.content.map(normalizeGoal);
  return [];
}

/** ---------- Task ---------- **/
type ApiTask = {
  taskId: number;
  goal: { goalId: number; name: string; colorCode: string };
  name: string;
  priority?: string;
  percentageScore?: number;
  deadline?: number[];
};
type TaskListEnvelope = {
  code?: string;
  message?: string;
  isSuccess?: boolean;
  result?: { taskList?: ApiTask[] };
};
const normalizeTask = (t: ApiTask): Task => ({
  id: t.taskId,
  goalId: t.goal.goalId,
  title: t.name,
  isDone: (t.percentageScore ?? 0) >= 100,
});
export async function fetchAllTasks(): Promise<Task[]> {
  const { data } = await api.get<TaskListEnvelope>('task/list');
  const list = data?.result?.taskList ?? [];
  return list.map(normalizeTask);
}
export async function fetchTasksByGoal(goalId: number): Promise<Task[]> {
  const { data } = await api.get<TaskListEnvelope>(`goal/task/list/${goalId}`);
  const list = data?.result?.taskList ?? [];
  return list.map(normalizeTask);
}

/** ---------- Create/Delete ---------- **/

// 명시 타입으로 고정(프론트 폼 기준): title, category(서버 미사용), colorCode(옵션)
type CreateGoalInput = {
  title: string;
  category?: string; // 서버엔 안 보냄(혼동 방지용으로 남김)
  colorCode?: string; // 없으면 기본값 사용
};

export async function createGoal(body: CreateGoalInput) {
  const name = body.title?.trim();
  if (!name) throw new Error('title is required');

  const colorCode = (body.colorCode ?? '#FFFFFF').trim();

  const { data } = await api.post<Goal>('goal/create', { name, colorCode });
  return data;
}

export async function deleteGoal(goalId: number) {
  await api.delete(`goal/delete/${goalId}`);
}

export async function createTask(body: CreateTaskDto) {
  const { data } = await api.post<Task>('task/create', body);
  return data;
}
export async function deleteTask(taskId: number) {
  await api.delete(`task/delete/${taskId}`);
}
