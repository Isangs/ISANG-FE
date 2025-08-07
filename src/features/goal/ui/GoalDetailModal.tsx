'use client';

import { X } from 'lucide-react';

type Goal = {
  name: string;
  score: number;
  total: number;
  colorFrom: string;
  colorTo: string;
  daily: number[];
};

const goals: Goal[] = [
  {
    name: '운동',
    score: 340,
    total: 400,
    colorFrom: 'from-orange-400',
    colorTo: 'to-red-500',
    daily: [45, 52, 38, 62, 48, 55, 60],
  },
  {
    name: '학습',
    score: 288,
    total: 400,
    colorFrom: 'from-blue-400',
    colorTo: 'to-indigo-500',
    daily: [30, 42, 55, 48, 62, 45, 52],
  },
  {
    name: '업무',
    score: 360,
    total: 400,
    colorFrom: 'from-green-400',
    colorTo: 'to-emerald-500',
    daily: [65, 72, 58, 78, 70, 82, 75],
  },
  {
    name: '건강',
    score: 272,
    total: 400,
    colorFrom: 'from-cyan-400',
    colorTo: 'to-teal-500',
    daily: [25, 35, 42, 38, 45, 40, 48],
  },
  {
    name: '개인성장',
    score: 220,
    total: 400,
    colorFrom: 'from-purple-400',
    colorTo: 'to-pink-500',
    daily: [20, 28, 32, 35, 38, 42, 45],
  },
];

const days = ['월', '화', '수', '목', '금', '토', '일'];

export default function GoalDetailModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 px-4 pt-10 backdrop-blur-sm">
      <div className="max-h-[650px] w-full max-w-sm overflow-y-auto rounded-3xl bg-white/90 p-6 shadow-lg">
        {/* 상단 */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">상세 그래프</h2>
          <button onClick={onClose}>
            <X className="h-5 w-5 text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        {/* 목표별 카드 */}
        {goals.map((goal) => (
          <div
            key={goal.name}
            className="mb-6 rounded-2xl bg-gradient-to-br from-[#FAF5FF] to-[#FDF2F8] p-4"
          >
            {/* 헤더 */}
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className={`h-4 w-4 rounded-full bg-gradient-to-r ${goal.colorFrom} ${goal.colorTo}`}
                />
                <span className="text-sm font-medium text-gray-800">
                  {goal.name}
                </span>
              </div>
              <span className="text-sm font-bold text-purple-600">
                {goal.score}/{goal.total}점
              </span>
            </div>

            {/* 요일 */}
            <div className="mb-2 flex justify-between px-1 text-[12px] text-gray-600">
              {days.map((day) => (
                <span key={day}>{day}</span>
              ))}
            </div>

            {/* 점수 */}
            <div className="flex justify-between px-1 text-[12px] text-gray-700">
              {goal.daily.map((score, i) => (
                <span key={i}>{score}점</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
