'use client';

import { Check } from 'lucide-react';
import { ReactNode } from 'react';

type BadgeCardProps = {
  icon: ReactNode;
  title: string;
  desc: string;
  gradientFrom: string;
  gradientTo: string;
};

export function BadgeCard({
  icon,
  title,
  desc,
  gradientFrom,
  gradientTo,
}: BadgeCardProps) {
  return (
    <div
      className="flex w-full items-center justify-between rounded-[28px] px-6 py-5 text-white"
      style={{
        background: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
      }}
    >
      <div className="flex items-center gap-3">
        <div className="text-white">{icon}</div>
        <div className="flex flex-col">
          <p className="font-bold">{title}</p>
          <p className="text-sm">{desc}</p>
        </div>
      </div>
      <Check className="text-white" />
    </div>
  );
}
