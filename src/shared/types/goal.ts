export type Goal = {
  id: number;
  title: string;
  name: string;
  colorCode: string;
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
export type RecordSettingsDto = {
  goalId: number;
  recordEnabled: boolean;
  isPrivate: boolean;
};
