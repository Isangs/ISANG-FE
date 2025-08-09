'use client';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import api from '@/shared/api/axios';

type Item = { goalId: number; name: string; percentage: number };

type ApiProgress = {
  goalId?: number | string;
  id?: number | string;
  name?: string;
  percentage?: number | string;
  percentageScore?: number | string;
};

type ProgressEnvelope =
  | { result?: { goalProgressList?: ApiProgress[] } }
  | { goalProgressList?: ApiProgress[] }
  | ApiProgress[]
  | ApiProgress
  | { result?: ApiProgress };

function isObj(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null;
}
function getArrayProp<T = unknown>(obj: unknown, key: string): T[] | null {
  if (!isObj(obj)) return null;
  const val = (obj as Record<string, unknown>)[key];
  return Array.isArray(val) ? (val as T[]) : null;
}
function hasResult(d: unknown): d is { result: unknown } {
  return isObj(d) && 'result' in d;
}

function clampPercent(v: unknown): number {
  const n = Number(v);
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(100, n));
}

function extractList(data: ProgressEnvelope): ApiProgress[] {
  if (Array.isArray(data)) return data as ApiProgress[];

  if (hasResult(data)) {
    const r = (data as { result: unknown }).result;
    const list = getArrayProp<ApiProgress>(r, 'goalProgressList');
    if (list) return list;
    if (isObj(r)) return [r as ApiProgress];
  }

  const top = getArrayProp<ApiProgress>(data, 'goalProgressList');
  if (top) return top;

  if (isObj(data)) return [data as ApiProgress];

  return [];
}

function normalize(p: ApiProgress): Item {
  return {
    goalId: Number(p.goalId ?? p.id ?? 0),
    name: String(p.name ?? '목표'),
    percentage: clampPercent(p.percentage ?? p.percentageScore ?? 0),
  };
}

export default function CompletionCircleList() {
  const [items, setItems] = useState<Item[]>([]);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get<ProgressEnvelope>('/goal/progress');
        const list = extractList(data).map(normalize);
        setItems(list);
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          setErr(
            (e.response?.data as { message?: string } | undefined)?.message ??
              e.message,
          );
        } else {
          setErr(e instanceof Error ? e.message : '불러오기 실패');
        }
      }
    })();
  }, []);

  if (err) {
    return (
      <div className="w-full max-w-xl rounded-3xl bg-white/80 p-6 shadow-md">
        <h2 className="mb-4 text-lg font-bold text-gray-900">목표 달성률</h2>
        <div className="text-sm text-red-600">에러: {err}</div>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="w-full max-w-xl rounded-3xl bg-white/80 p-6 shadow-md">
        <h2 className="mb-4 text-lg font-bold text-gray-900">목표 달성률</h2>
        <div className="text-sm text-gray-500">데이터 없음</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl rounded-3xl bg-white/80 p-6 shadow-md">
      <h2 className="mb-4 text-lg font-bold text-gray-900">목표 달성률</h2>
      <div className="grid grid-cols-2 gap-x-8 gap-y-6">
        {items.map((item) => (
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
                  pathColor: '#a855f7',
                  trailColor: '#e5e7eb',
                  textColor: '#111827',
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
