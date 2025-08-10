'use client';

import { useEffect, useState, JSX } from 'react';
import api from '@/shared/api/axios';
import { Flame, Trophy, Star, Rocket, Crown, Medal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BadgeDetailModal } from './BadgeDetailModal';

type ApiBadge = { badge: string; name: string };
type UIBadge = { id: string; label: string; icon: JSX.Element };

const iconByBadge: Record<string, JSX.Element> = {
  THREE_DAY: <Flame size={32} />,
  HUNDRED_SCORE: <Trophy size={32} />,
  PERFECT_WEEK: <Star size={32} />,
  ROOKIE_OUT: <Rocket size={32} />,
  MONTH_KING: <Crown size={32} />,
  MASTER: <Medal size={32} />,
};

export default function BadgeGallery() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [badges, setBadges] = useState<UIBadge[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/badge/gallery');
        const list: ApiBadge[] = Array.isArray(data?.badgeList)
          ? data.badgeList
          : Array.isArray(data?.result?.badgeList)
            ? data.result.badgeList
            : [];

        const ui: UIBadge[] = list.map((b) => ({
          id: b.badge,
          label: b.name,
          icon: iconByBadge[b.badge] ?? <Star size={32} />,
        }));

        setBadges(ui);
      } catch (e: unknown) {
        const message =
          e instanceof Error
            ? e.message
            : typeof e === 'string'
              ? e
              : '불러오기 실패';
        setError(message);
      }
    })();
  }, []);

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

        {error && <div className="text-sm text-red-600">에러: {error}</div>}
        {!badges && !error && (
          <div className="text-sm text-gray-500">로딩중…</div>
        )}

        {badges && (
          <div className="grid grid-cols-3 gap-4">
            {badges.map((b) => (
              <div
                key={b.id}
                className={cn(
                  'flex h-[96px] flex-col items-center justify-center rounded-2xl p-4 shadow-sm',
                  'bg-gradient-to-br from-[#C86DD7] to-[#3023AE] text-white',
                )}
              >
                {b.icon}
                <p className="mt-1 text-center text-sm leading-tight">
                  {b.label}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      <BadgeDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
