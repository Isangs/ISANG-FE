'use client';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import React from 'react';

const data = [
  { label: '운동', value: 85 },
  { label: '학습', value: 72 },
  { label: '업무', value: 90 },
  { label: '건강', value: 68 },
];

export default function CompletionCircleList() {
  return (
    <div className="w-full max-w-xl rounded-3xl bg-white/80 p-6 shadow-md">
      <h2 className="mb-4 text-lg font-bold text-gray-900">목표 달성률</h2>
      <div className="grid grid-cols-2 gap-x-8 gap-y-6">
        {data.map((item) => (
          <div
            key={item.label}
            className="flex flex-col items-center justify-center"
          >
            <div className="mb-2 h-20 w-20">
              <CircularProgressbar
                value={item.value}
                text={`${item.value}%`}
                strokeWidth={7}
                styles={buildStyles({
                  pathColor: '#a855f7', // 보라색
                  trailColor: '#e5e7eb', // 회색 trail
                  textColor: '#111827', // 텍스트
                  textSize: '18px',
                })}
              />
            </div>
            <span className="text-sm text-gray-700">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
