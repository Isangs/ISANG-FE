'use client';

import { JSX, useEffect, useState } from 'react';
import axios from 'axios';
import { Flame, Trophy, Star, Rocket, Crown, Medal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BadgeDetailModal } from './BadgeDetailModal';
import api from '@/shared/api/axios';

type UIBadge = {
  id: string | number;
  label: string;
  locked: boolean;
  progress?: number; // 0~100
  iconType?: 'flame' | 'trophy' | 'star' | 'rocket' | 'crown' | 'medal';
  gradient?: string;
};

// 서버 응답 타입(예상 키들)
type ApiBadge = {
  id?: string | number;
  badgeId?: number;
  label?: string;
  name?: string;
  locked?: boolean;
  isLocked?: boolean;
  progress?: number | string;
  iconType?: UIBadge['iconType'] | string;
  gradient?: string;
};

type BadgeListEnvelope =
  | { result?: { badgeList?: ApiBadge[] } }
  | { data?: ApiBadge[] }
  | { content?: ApiBadge[] }
  | ApiBadge[];

// 타입가드
function isObj(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null;
}
function hasResult(
  d: BadgeListEnvelope,
): d is { result: { badgeList?: ApiBadge[] } } {
  return isObj(d) && 'result' in d;
}
function hasData(d: BadgeListEnvelope): d is { data?: ApiBadge[] } {
  return isObj(d) && 'data' in d;
}
function hasContent(d: BadgeListEnvelope): d is { content?: ApiBadge[] } {
  return isObj(d) && 'content' in d;
}

// 정규화
function normalizeBadge(b: ApiBadge, i: number): UIBadge {
  return {
    id: b.id ?? b.badgeId ?? i,
    label: b.label ?? b.name ?? '배지',
    locked: Boolean(b.locked ?? b.isLocked ?? false),
    progress:
      typeof b.progress === 'number'
        ? b.progress
        : b.progress != null
          ? Number(b.progress)
          : undefined,
    iconType: (b.iconType as UIBadge['iconType']) ?? 'star',
    gradient: b.gradient,
  };
}

const iconByType: Record<NonNullable<UIBadge['iconType']>, JSX.Element> = {
  flame: <Flame size={32} />,
  trophy: <Trophy size={32} />,
  star: <Star size={32} />,
  rocket: <Rocket size={32} />,
  crown: <Crown size={32} />,
  medal: <Medal size={32} />,
};

export default function BadgeGallery() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [badges, setBadges] = useState<UIBadge[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get<BadgeListEnvelope>('/badge/gallery');

        let list: ApiBadge[] = [];
        if (Array.isArray(data)) list = data;
        else if (hasResult(data) && Array.isArray(data.result?.badgeList))
          list = data.result.badgeList ?? [];
        else if (hasData(data) && Array.isArray(data.data))
          list = data.data ?? [];
        else if (hasContent(data) && Array.isArray(data.content))
          list = data.content ?? [];

        const ui = list.map(normalizeBadge);
        setBadges(ui);
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          setError(
            (e.response?.data as { message?: string } | undefined)?.message ??
              e.message,
          );
        } else {
          setError(e instanceof Error ? e.message : '불러오기 실패');
        }
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
            {badges.map((badge) => {
              const icon = iconByType[badge.iconType ?? 'star'];
              const locked = badge.locked;
              const gradient = badge.gradient ?? 'from-[#C86DD7] to-[#3023AE]';
              const progress = Math.max(0, Math.min(100, badge.progress ?? 25));

              return (
                <div
                  key={badge.id}
                  className={cn(
                    'flex h-[96px] flex-col items-center justify-center rounded-2xl p-4 shadow-sm',
                    locked
                      ? 'bg-gray-100 text-gray-400'
                      : `bg-gradient-to-br ${gradient} text-white`,
                  )}
                >
                  {icon}
                  <p className="mt-1 text-center text-sm leading-tight">
                    {badge.label}
                  </p>

                  {locked && (
                    <div className="mt-2 h-1 w-full rounded-full bg-white/30">
                      <div
                        className="h-1 rounded-full bg-white/60"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
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
