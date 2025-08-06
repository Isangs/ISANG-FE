// features/goal/ui/GoalCard.tsx

type Goal = {
  id: number;
  category: string;
  title: string;
  score: number;
};

export function GoalCard({ goal }: { goal: Goal }) {
  return (
    <div className="relative flex h-[156px] w-[343px] flex-col items-start overflow-hidden rounded-2xl bg-white/70 px-4 py-4">
      {/* 배경 그라데이션 */}
      <div className="absolute inset-0 -z-10 h-full w-full rounded-2xl bg-gradient-to-r from-orange-400 to-red-500 opacity-10" />

      {/* 데코 점 */}
      <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-300" />

      <div className="flex w-full flex-col gap-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <span className="rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-600">
              {goal.category}
            </span>
            <span className="h-2 w-2 rounded-full bg-red-500" />
            <span className="text-xs text-gray-500">높음</span>
          </div>

          {/* 아이콘 자리 */}
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/40 text-white">
            📈
          </div>
        </div>

        <h3 className="text-base font-semibold text-gray-900">{goal.title}</h3>

        {/* 장소 */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>📍</span>
          <span>한강공원</span>
        </div>

        {/* 진행도 바 */}
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
