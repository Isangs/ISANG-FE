'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { cn } from '@/lib/utils';
import GoalDetailModal from './GoalDetailModal';
import api from '@/shared/api/axios';

type GoalUI = {
  id: string | number;
  name: string;
  score: number;
  maxScore: number;
  percentage: number;
  colorCode?: string;
};

type ApiGoal = {
  goalId?: number | string;
  name?: string;
  score?: number | string;
  maxScore?: number | string;
  percentage?: number | string;
  percentageScore?: number | string;
  colorCode?: string;
};

type GoalListEnvelope =
  | { result?: { goalList?: ApiGoal[] } }
  | { goalList?: ApiGoal[] }
  | ApiGoal[];

function isObj(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null;
}
function hasResult(
  d: GoalListEnvelope,
): d is { result: { goalList?: ApiGoal[] } } {
  return isObj(d) && 'result' in d;
}
function hasGoalListRoot(d: GoalListEnvelope): d is { goalList?: ApiGoal[] } {
  return isObj(d) && 'goalList' in d;
}

function asPercent(v: unknown) {
  const n = Number(v);
  if (Number.isFinite(n)) return Math.min(100, Math.max(0, n));
  return 0;
}

function normalizeGoal(g: ApiGoal, i: number): GoalUI {
  const score = Number(g.score ?? g.percentageScore ?? 0);
  const maxScore = Number(g.maxScore ?? 100);
  const percentage = asPercent(
    g.percentage ??
      g.percentageScore ??
      (maxScore ? (score / maxScore) * 100 : 0),
  );

  return {
    id: g.goalId ?? i,
    name: g.name ?? '이름 없음',
    score,
    maxScore,
    percentage,
    colorCode: g.colorCode,
  };
}

export default function GoalScoreList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [goals, setGoals] = useState<GoalUI[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get<GoalListEnvelope>('/goal/score');

        let list: ApiGoal[] = [];
        if (Array.isArray(data)) list = data;
        else if (hasResult(data) && Array.isArray(data.result?.goalList))
          list = data.result.goalList ?? [];
        else if (hasGoalListRoot(data) && Array.isArray(data.goalList))
          list = data.goalList ?? [];

        setGoals(list.map(normalizeGoal));
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          setError(
            (e.response?.data as { message?: string } | undefined)?.message ??
              e.message,
          );
        } else {
          setError(e instanceof Error ? e.message : '불러오기 실패');
        }
      }
    })();
  }, []);

  if (error) return <div className="text-red-600">에러: {error}</div>;
  if (!goals.length)
    return (
      <div className="w-full max-w-xl rounded-3xl bg-white/80 p-10 shadow-md">
        <h2 className="mb-2 text-[18px] font-bold text-gray-900">
          목표별 점수
        </h2>
        <div className="text-sm text-gray-500">데이터 없음</div>
      </div>
    );

  return (
    <>
      <div className="w-full max-w-xl rounded-3xl bg-white/80 p-10 shadow-md">
        <div className="flex items-center justify-between pb-4">
          <h2 className="text-[18px] font-bold text-gray-900">목표별 점수</h2>
          <button
            className="text-[14px] font-normal text-purple-600"
            onClick={() => setIsModalOpen(true)}
          >
            자세히 보기
          </button>
        </div>

        {goals.map((goal) => {
          const isHex =
            typeof goal.colorCode === 'string' &&
            goal.colorCode.startsWith('#');

          return (
            <div key={goal.id} className="pt-4 first:pt-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'h-4 w-4 rounded-full',
                      !isHex && goal.colorCode
                        ? `bg-gradient-to-r ${goal.colorCode}`
                        : 'bg-gray-300',
                    )}
                    style={
                      isHex ? { backgroundColor: goal.colorCode } : undefined
                    }
                  />
                  <span className="text-[14px] font-medium text-gray-700">
                    {goal.name}
                  </span>
                </div>
                <div className="flex items-center text-[14px]">
                  <span className="font-bold text-purple-600">
                    {goal.score}점
                  </span>
                  <span className="ml-2 text-gray-500">
                    / {goal.maxScore}점
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-3">
                <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
                  <div
                    className={cn(
                      'h-full rounded-full shadow-sm',
                      !isHex && goal.colorCode
                        ? `bg-gradient-to-r ${goal.colorCode}`
                        : '',
                    )}
                    style={{
                      width: `${goal.percentage}%`,
                      ...(isHex ? { backgroundColor: goal.colorCode } : {}),
                    }}
                  />
                </div>
                <span className="w-[32px] text-right text-[14px] font-medium text-gray-600">
                  {goal.percentage}%
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <GoalDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
