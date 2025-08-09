'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { X, Flame, Trophy, Star, Rocket, Crown, MapPin } from 'lucide-react';
import { BadgeCard } from './BadgeCard';
import { BadgeProgressCard } from './BadgeProgressCard';
import { cn } from '@/lib/utils';
import api from '@/shared/api/axios';

type BadgeDetailModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type ApiBadge = {
  badge?: string;
  name?: string;
  desc?: string;
  isAchieved?: boolean;
  progress?: number | string; // 달성 진행도
  condition?: number | string; // 달성 최대 점수
};

type BadgeDetailEnvelope = { result?: { badgeList?: ApiBadge[] } } | ApiBadge[];

function isObj(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null;
}
function extractBadgeList(data: BadgeDetailEnvelope): ApiBadge[] {
  if (Array.isArray(data)) return data;
  if (
    isObj(data) &&
    isObj(data.result) &&
    Array.isArray(data.result.badgeList)
  ) {
    return data.result.badgeList as ApiBadge[];
  }
  return [];
}
const num = (v: unknown, f = 0) => (Number.isFinite(Number(v)) ? Number(v) : f);

function iconByCode(code?: string) {
  switch (code) {
    case 'THREE_DAY':
    case 'STREAK_3':
      return <Flame size={20} />;
    case 'HUNDRED_SCORE':
    case 'SCORE_100':
      return <Trophy size={20} />;
    case 'PERFECT_WEEK':
      return <Star size={20} />;
    case 'LEVEL_10':
    case 'ROOKIE_OUT':
      return <Rocket size={20} />;
    case 'MONTH_KING':
      return <Crown size={20} />;
    default:
      return <MapPin size={20} />;
  }
}
function gradientByCode(code?: string): { from: string; to: string } {
  switch (code) {
    case 'THREE_DAY':
    case 'STREAK_3':
      return { from: '#FF512F', to: '#DD2476' };
    case 'HUNDRED_SCORE':
    case 'SCORE_100':
      return { from: '#FFD200', to: '#F7971E' };
    case 'PERFECT_WEEK':
      return { from: '#DA22FF', to: '#9733EE' };
    case 'LEVEL_10':
    case 'ROOKIE_OUT':
      return { from: '#36D1DC', to: '#5B86E5' };
    case 'MONTH_KING':
      return { from: '#C6FFDD', to: '#FBD786' };
    default:
      return { from: '#C86DD7', to: '#3023AE' };
  }
}

/* ===== 컴포넌트 ===== */
export function BadgeDetailModal({ isOpen, onClose }: BadgeDetailModalProps) {
  const [visible, setVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const [achieved, setAchieved] = useState<ApiBadge[]>([]);
  const [progressing, setProgressing] = useState<ApiBadge[]>([]);
  const [err, setErr] = useState<string | null>(null);

  // open/close 애니메이션
  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      const t = setTimeout(() => setVisible(true), 10);
      return () => clearTimeout(t);
    } else {
      setVisible(false);
      const t = setTimeout(() => setIsMounted(false), 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // 열릴 때만 데이터 로드
  useEffect(() => {
    if (!isOpen) return;
    (async () => {
      try {
        const { data } = await api.get<BadgeDetailEnvelope>('/badge/detail');
        const list = extractBadgeList(data);
        const done = list.filter((b) => b.isAchieved === true);
        const doing = list.filter((b) => !b.isAchieved);

        setAchieved(done);
        setProgressing(doing);
        setErr(null);
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          setErr(
            (e.response?.data as { message?: string } | undefined)?.message ??
              e.message,
          );
        } else {
          setErr(
            e instanceof Error ? e.message : '배지 정보를 불러오지 못했어요.',
          );
        }
      }
    })();
  }, [isOpen]);

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div
        className={cn(
          'relative h-[90vh] w-full max-w-sm overflow-hidden rounded-3xl bg-white px-5 pt-6 pb-10 transition-all duration-300 ease-out',
          visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0',
        )}
      >
        {/* 닫기 */}
        <button
          onClick={onClose}
          className="absolute top-7 right-6 text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>

        {/* 타이틀 */}
        <h2 className="mb-4 text-left text-[22px] font-bold text-gray-900">
          배지 상세 정보
        </h2>

        {/* 에러/로딩 */}
        {err && (
          <div className="mb-3 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {err}
          </div>
        )}

        <div className="max-h-[calc(90vh-120px)] space-y-6 overflow-y-auto pb-4">
          {/* 완료된 배지 */}
          <div className="flex flex-col gap-4">
            {achieved.length === 0 && (
              <p className="text-sm text-gray-500">완료된 배지가 없어요.</p>
            )}
            {achieved.map((b, i) => {
              const { from, to } = gradientByCode(b.badge);
              return (
                <BadgeCard
                  key={`${b.badge}-${i}`}
                  icon={iconByCode(b.badge)}
                  title={b.name ?? '배지'}
                  desc={b.desc ?? ''}
                  gradientFrom={from}
                  gradientTo={to}
                />
              );
            })}
          </div>

          {/* 진행 중 배지 */}
          <div className="flex flex-col gap-4">
            {progressing.length === 0 && (
              <p className="text-sm text-gray-500">진행 중인 배지가 없어요.</p>
            )}
            {progressing.map((b, i) => {
              const p = num(b.progress, 0);
              const c = Math.max(1, num(b.condition, 100));
              const ratio = Math.max(0, Math.min(1, p / c));
              const { from, to } = gradientByCode(b.badge);

              return (
                <BadgeProgressCard
                  key={`${b.badge}-doing-${i}`}
                  icon={iconByCode(b.badge)}
                  title={b.name ?? '배지'}
                  desc={b.desc ?? ''}
                  progress={`${p}/${c}`}
                  progressRatio={ratio}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
