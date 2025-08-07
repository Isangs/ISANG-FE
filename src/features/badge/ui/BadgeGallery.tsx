'use client';

import { useState } from 'react';
import { Flame, Trophy, Star, Rocket, Crown, Medal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BadgeDetailModal } from './BadgeDetailModal';

const badges = [
  {
    icon: <Flame size={32} />,
    label: '3일 연속',
    gradient: 'from-[#FF5F6D] to-[#FFC371]',
    locked: false,
  },
  {
    icon: <Trophy size={32} />,
    label: '100점 돌파',
    gradient: 'from-[#FDC830] to-[#F37335]',
    locked: false,
  },
  {
    icon: <Star size={32} />,
    label: '완벽한 주',
    gradient: 'from-[#C86DD7] to-[#3023AE]',
    locked: false,
  },
  {
    icon: <Rocket size={32} />,
    label: '초보 탈출',
    gradient: 'from-[#36D1DC] to-[#5B86E5]',
    locked: false,
  },
  {
    icon: <Crown size={32} />,
    label: '월간 왕',
    locked: true,
  },
  {
    icon: <Medal size={32} />,
    label: '마스터',
    locked: true,
  },
];

export default function BadgeGallery() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="w-full max-w-xl rounded-3xl bg-white/80 p-6 shadow-md">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">배지 갤러리</h2>
          <button
            className="text-sm font-medium text-purple-600"
            onClick={() => setIsModalOpen(true)}
          >
            자세히 보기
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {badges.map((badge, idx) => (
            <div
              key={idx}
              className={cn(
                'flex h-[96px] flex-col items-center justify-center rounded-2xl p-4 shadow-sm',
                badge.locked
                  ? 'bg-gray-100 text-gray-400'
                  : `bg-gradient-to-br ${badge.gradient} text-white`,
              )}
            >
              {badge.icon}
              <p className="mt-1 text-center text-sm leading-tight">
                {badge.label}
              </p>

              {badge.locked && (
                <div className="mt-2 h-1 w-full rounded-full bg-white/30">
                  <div className="h-1 w-[25%] rounded-full bg-white/60" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {isModalOpen && (
        <BadgeDetailModal onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}
