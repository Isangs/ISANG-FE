export type Goal = {
  id: number;
  title: string;
  category: string;
  score: number;
};
export type Task = {
  id: number;
  goalId: number;
  title: string;
  isDone: boolean;
};

export type CreateGoalDto = { name: string; colorCode: string };
export type CreateTaskDto = { goalId: number; title: string };

export type RecordSettingsDto = {
  goalId: number;
  recordEnabled: boolean;
  isPrivate: boolean;
};
