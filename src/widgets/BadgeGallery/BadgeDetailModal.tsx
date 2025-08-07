'use client';

import { Flame, Trophy, Star, Rocket, Crown, Medal, X } from 'lucide-react';

const badges = [
  { icon: <Flame size={20} />, title: '3일 연속', desc: '3일 연속 할일 완료' },
  {
    icon: <Trophy size={20} />,
    title: '100점 돌파',
    desc: '총 점수 100점 달성',
  },
  {
    icon: <Star size={20} />,
    title: '완벽한 주',
    desc: '일주일 모두 할일 완료',
  },
  { icon: <Rocket size={20} />, title: '초보 탈출', desc: '레벨 10 달성' },
  {
    icon: <Crown size={20} />,
    title: '월간 왕',
    desc: '한 달간 1위 유지',
    progress: '16/30',
  },
  { icon: <Medal size={20} />, title: '마스터', desc: '레벨 50 달성' },
];

export function BadgeDetailModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">배지 상세 정보</h2>
          <button onClick={onClose}>
            <X className="text-gray-400" />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="rounded-xl p-4 text-white"
              style={{
                background:
                  index === 0
                    ? 'linear-gradient(to right, #FF5F6D, #FFC371)'
                    : index === 1
                      ? 'linear-gradient(to right, #FDC830, #F37335)'
                      : index === 2
                        ? 'linear-gradient(to right, #C86DD7, #3023AE)'
                        : index === 3
                          ? 'linear-gradient(to right, #36D1DC, #5B86E5)'
                          : 'white',
                color: index >= 4 ? '#333' : 'white',
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-semibold">
                  {badge.icon}
                  <span>{badge.title}</span>
                </div>
                {index < 4 && <span className="text-white">✓</span>}
              </div>
              <p className="mt-1 text-sm">{badge.desc}</p>

              {badge.progress && (
                <div className="mt-2">
                  <p className="text-sm text-gray-700">진행도</p>
                  <div className="mt-1 h-2 w-full rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full bg-purple-500"
                      style={{ width: '53%' }}
                    />
                  </div>
                  <p className="text-right text-sm text-gray-600">
                    {badge.progress}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
