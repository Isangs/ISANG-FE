import { MapPin, Check } from 'lucide-react';

type Goal = {
  id: number;
  category: string;
  title: string;
  score: number;
};

type GoalCardProps = {
  goal: Goal;
  isDeleteMode?: boolean;
  onDelete?: (id: number) => void;
  onOpenModal?: (id: number) => void;
  isCompleted?: boolean;
};

export function GoalCard({
  goal,
  isDeleteMode = false,
  onDelete,
  onOpenModal,
  isCompleted = false,
}: GoalCardProps) {
  return (
    <div className="relative flex h-[156px] w-[94%] flex-col items-start rounded-2xl bg-white/70 px-4 py-4">
      {isDeleteMode && (
        <button
          className="text-ls absolute -top-2 -right-2 z-10 h-8 w-8 rounded-full bg-red-500 font-bold text-white shadow-md"
          onClick={() => onDelete?.(goal.id)}
        >
          ×
        </button>
      )}

      {/* 배경 그라데이션 */}
      <div className="absolute inset-0 -z-10 h-full w-full rounded-2xl bg-gradient-to-r from-orange-400 to-red-500 opacity-10" />

      {/* 데코 점 */}
      <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-300" />

      <div className="flex w-full flex-col gap-1">
        <div className="flex items-center justify-between p-1">
          <div className="flex items-center gap-2 text-sm">
            <span className="rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-600">
              {goal.category}
            </span>
            <span className="h-2 w-2 rounded-full bg-red-500" />
            <span className="text-xs text-gray-500">높음</span>
          </div>

          {/* 완료 여부에 따라 체크 아이콘 표시 */}
          <button
            type="button"
            className="flex h-4 w-4 items-center justify-center rounded-full border-2 border-gray-400 bg-white/60 text-gray-600"
            onClick={() => onOpenModal?.(goal.id)}
          >
            {isCompleted && <Check className="h-3 w-3" />}{' '}
          </button>
        </div>

        <h3 className="text-base font-semibold text-gray-900">{goal.title}</h3>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="h-4 w-4" />
          <span>한강공원</span>
        </div>

        <div className="mt-2 flex items-center gap-3">
          <div className="h-2 w-full rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-gradient-to-r from-orange-400 to-red-500 shadow-sm"
              style={{ width: `${goal.score}%` }}
            />
          </div>
          <span className="text-sm text-gray-700">{goal.score}%</span>
        </div>
      </div>
    </div>
  );
}
