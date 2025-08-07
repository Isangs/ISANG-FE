'use client';

import { ReactNode } from 'react';

type BadgeProgressCardProps = {
  icon: ReactNode;
  title: string;
  desc: string;
  progress: string; // 예: '16/30'
  progressRatio: number; // 예: 0.53
};

export function BadgeProgressCard({
  icon,
  title,
  desc,
  progress,
  progressRatio,
}: BadgeProgressCardProps) {
  return (
    <div className="w-full rounded-[28px] bg-white p-6 text-gray-800 shadow">
      <div className="flex items-center gap-3">
        <div className="text-gray-800">{icon}</div>
        <div className="flex flex-col">
          <p className="font-bold">{title}</p>
          <p className="text-sm text-gray-600">{desc}</p>
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between">
          <p className="mb-2 text-sm font-medium text-gray-700">진행도</p>
          <p className="text-sm text-gray-500">{progress}</p>
        </div>
        <div className="h-2 w-full rounded-full bg-gray-200">
          <div
            className="h-2 rounded-full bg-purple-500"
            style={{ width: `${progressRatio * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
