// src/shared/api/goals.ts
import { api } from './axios';
import { Goal, Task, CreateGoalDto, CreateTaskDto } from '@/shared/types/goal';

// ✔️ 이 파일은 goal/task만 담당 (record 함수는 여기서 제거)

// 할일 전체
export async function fetchAllTasks() {
  const { data } = await api.get<Task[]>('/task/list');
  return data;
}

// 목표별 할일
export async function fetchTasksByGoal(goalId: number) {
  const { data } = await api.get<Task[]>(`/goal/task/list/${goalId}`);
  return data;
}

// 목표 생성/삭제
export async function createGoal(body: CreateGoalDto) {
  const { data } = await api.post<Goal>('/goal/create', body);
  return data;
}
export async function deleteGoal(goalId: number) {
  await api.delete(`/goal/delete/${goalId}`);
}

// 할일 생성/삭제
export async function createTask(body: CreateTaskDto) {
  const { data } = await api.post<Task>('/task/create', body);
  return data;
}
export async function deleteTask(taskId: number) {
  await api.delete(`/task/delete/${taskId}`);
}
