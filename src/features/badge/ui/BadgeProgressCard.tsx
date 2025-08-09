'use client';

import { ReactNode } from 'react';

type BadgeProgressCardProps = {
  icon: ReactNode;
  title: string;
  desc: string;
  progress: string;
  progressRatio: number;
  barColor?: string;
  backgroundClassName?: string;
  isLoading?: boolean;
};

export function BadgeProgressCard({
  icon,
  title,
  desc,
  progress,
  progressRatio,
  barColor,
  backgroundClassName = 'bg-white',
  isLoading = false,
}: BadgeProgressCardProps) {
  const widthPct = Math.max(0, Math.min(1, progressRatio)) * 100;

  return (
    <div
      className={`w-full rounded-[28px] p-6 text-gray-800 shadow ${backgroundClassName}`}
      role="group"
      aria-label={`${title} 배지 진행도 카드`}
    >
      <div className="flex items-center gap-3">
        <div className="text-gray-800" aria-hidden>
          {icon}
        </div>
        <div className="flex flex-col">
          <p className="font-bold">{title}</p>
          <p className="text-sm text-gray-600">{desc}</p>
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between">
          <p className="mb-2 text-sm font-medium text-gray-700">진행도</p>
          <p className="text-sm text-gray-500" aria-live="polite">
            {isLoading ? '...' : progress}
          </p>
        </div>

        <div className="h-2 w-full rounded-full bg-gray-200" aria-hidden>
          <div
            className="h-2 rounded-full"
            style={{
              width: `${widthPct}%`,
              background: barColor ?? '#a855f7',
              transition: 'width .25s ease',
            }}
          />
        </div>
      </div>
    </div>
  );
}
