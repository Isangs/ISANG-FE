'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import GoalDetailModal from './GoalDetailModal';
import axios from 'axios';

interface Goal {
  goalId: string;
  colorCode: string;
  name: string;
  score: number;
  maxScore: number;
  percentage: string;
}

export default function GoalScoreList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [goals, setGoals] = useState<Goal[]>([])

  useEffect(() => {
    const fetchGoalScore = async () => {
      const { data } = await axios.get('/api/goal/score')
      setGoals(data.goalList)
    }

    fetchGoalScore()
  }, []);

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
          <div key={goal.goalId} className="pt-4 first:pt-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={cn(`h-4 w-4 rounded-full bg-gradient-to-r`, goal.colorCode)}
                />
                <span className="text-[14px] font-medium text-gray-700">
                  {goal.name}
                </span>
              </div>
              <div className="flex items-center text-[14px]">
                <span className="font-bold text-purple-600">
                  {goal.score}점
                </span>
                <span className="ml-2 text-gray-500">/ {goal.maxScore}점</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-3">
              <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
                {
                  goal.percentage && <div
                    className={cn(
                      `h-full rounded-full bg-gradient-to-r shadow-sm`,
                      `w-[${goal.percentage}%]`,
                      goal.colorCode
                    )}
                  />
                }
              </div>
              <span className="w-[32px] text-right text-[14px] font-medium text-gray-600">
                {goal.percentage}%
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
