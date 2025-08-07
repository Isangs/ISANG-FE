'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import GoalDetailModal from './GoalDetailModal';

const goals = [
  {
    name: '운동',
    score: 340,
    total: 400,
    percent: '85%',
    color: 'from-orange-400 to-red-500',
    barWidth: 'w-[218.27px]',
  },
  {
    name: '학습',
    score: 288,
    total: 400,
    percent: '72%',
    color: 'from-blue-400 to-indigo-500',
    barWidth: 'w-[184.89px]',
  },
  {
    name: '업무',
    score: 360,
    total: 400,
    percent: '90%',
    color: 'from-green-400 to-emerald-500',
    barWidth: 'w-[231.11px]',
  },
  {
    name: '건강',
    score: 272,
    total: 400,
    percent: '68%',
    color: 'from-cyan-400 to-teal-500',
    barWidth: 'w-[174.61px]',
  },
  {
    name: '개인성장',
    score: 220,
    total: 400,
    percent: '55%',
    color: 'from-purple-400 to-pink-500',
    barWidth: 'w-[141.23px]',
  },
];

export default function GoalScoreList() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

        {goals.map((goal) => (
          <div key={goal.name} className="pt-4 first:pt-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'h-4 w-4 rounded-full bg-gradient-to-r',
                    goal.color,
                  )}
                />
                <span className="text-[14px] font-medium text-gray-700">
                  {goal.name}
                </span>
              </div>
              <div className="flex items-center text-[14px]">
                <span className="font-bold text-purple-600">
                  {goal.score}점
                </span>
                <span className="ml-2 text-gray-500">/ {goal.total}점</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-3">
              <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
                <div
                  className={cn(
                    'h-full rounded-full bg-gradient-to-r shadow-sm',
                    goal.color,
                    goal.barWidth,
                  )}
                />
              </div>
              <span className="w-[32px] text-right text-[14px] font-medium text-gray-600">
                {goal.percent}
              </span>
            </div>
          </div>
        ))}
      </div>
      <GoalDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
