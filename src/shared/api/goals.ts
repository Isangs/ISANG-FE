import api from '@/shared/api/axios';
import { Goal, Task, CreateGoalDto, CreateTaskDto } from '@/shared/types/goal';

// 백엔드/프록시가 배열을 감싸서 줄 수도 있으니 안전 파싱
type GoalListApi =
  | Goal[]
  | {
      data?: Goal[];
      result?: Goal[];
      content?: Goal[];
      isSuccess?: boolean;
      code?: string;
      message?: string;
    };

export async function fetchGoals(): Promise<Goal[]> {
  const { data } = await api.get<GoalListApi>('goal/list');

  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.data)) return data.data!;
  if (data && Array.isArray(data.result)) return data.result!;
  if (data && Array.isArray(data.content)) return data.content!;
  return [];
}
// (이미 있는 함수들)
// 할일 전체
export async function fetchAllTasks() {
  const { data } = await api.get<Task[]>('task/list');
  return data;
}
// 목표별 할일
export async function fetchTasksByGoal(goalId: number) {
  const { data } = await api.get<Task[]>(`goal/task/list/${goalId}`);
  return data;
}
// 목표 생성/삭제
export async function createGoal(body: CreateGoalDto) {
  const { data } = await api.post<Goal>('goal/create', body);
  return data;
}
export async function deleteGoal(goalId: number) {
  await api.delete(`goal/delete/${goalId}`);
}
// 할일 생성/삭제
export async function createTask(body: CreateTaskDto) {
  const { data } = await api.post<Task>('task/create', body);
  return data;
}
export async function deleteTask(taskId: number) {
  await api.delete(`task/delete/${taskId}`);
}
