'use client';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface CompletionCircleListProps {
  goalId: number;
  name: string;
  percentage: number;
}

export default function CompletionCircleList() {
  const [completionCircleListData, setCompletionCircleListData] = useState<CompletionCircleListProps[]>([]);

  useEffect(() => {
    const fetchCompletionCircle = async () => {
      const { data } = await axios.get('/api/goal/progress')
      setCompletionCircleListData(data.goalProgressList)
    }

    fetchCompletionCircle()
  }, []);

  return (
    <div className="w-full max-w-xl rounded-3xl bg-white/80 p-6 shadow-md">
      <h2 className="mb-4 text-lg font-bold text-gray-900">목표 달성률</h2>
      <div className="grid grid-cols-2 gap-x-8 gap-y-6">
        {completionCircleListData.map((item) => (
          <div
            key={item.goalId}
            className="flex flex-col items-center justify-center"
          >
            <div className="mb-2 h-20 w-20">
              <CircularProgressbar
                value={item.percentage}
                text={`${item.percentage}%`}
                strokeWidth={7}
                styles={buildStyles({
                  pathColor: '#a855f7', // 보라색
                  trailColor: '#e5e7eb', // 회색 trail
                  textColor: '#111827', // 텍스트
                  textSize: '18px',
                })}
              />
            </div>
            <span className="text-sm text-gray-700">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
