'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  ResponsiveContainer,
} from 'recharts';
import api from '@/shared/api/axios';

type WeeklyItem = {
  goalId: number;
  name: string;
  totalScore: number;
  dayList: { day: string; score: number }[];
};

type ApiDay = { day?: string; date?: string; score?: number | string };
type ApiWeeklyItem = {
  goalId?: number | string;
  id?: number | string;
  name?: string;
  totalScore?: number | string;
  score?: number | string;
  dayList?: ApiDay[];
};

type WeeklyEnvelope =
  | { result?: { list?: ApiWeeklyItem[]; items?: ApiWeeklyItem[] } }
  | { list?: ApiWeeklyItem[] }
  | ApiWeeklyItem[]
  | ApiWeeklyItem
  | { result?: ApiWeeklyItem };

function isObj(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null;
}

function coerceNumber(v: unknown, fallback = 0): number {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

function getArrayProp<T = unknown>(obj: unknown, key: string): T[] | null {
  if (!isObj(obj)) return null;
  const val = (obj as Record<string, unknown>)[key];
  return Array.isArray(val) ? (val as T[]) : null;
}

function hasResult(d: unknown): d is { result: unknown } {
  return isObj(d) && 'result' in d;
}

function extractWeeklyList(data: WeeklyEnvelope): ApiWeeklyItem[] {
  if (Array.isArray(data)) return data as ApiWeeklyItem[];

  if (hasResult(data)) {
    const r = (data as { result: unknown }).result;

    const list = getArrayProp<ApiWeeklyItem>(r, 'list');
    if (list) return list;

    const items = getArrayProp<ApiWeeklyItem>(r, 'items');
    if (items) return items;

    if (isObj(r)) return [r as ApiWeeklyItem];
  }

  const topList = getArrayProp<ApiWeeklyItem>(data, 'list');
  if (topList) return topList;

  if (isObj(data)) return [data as ApiWeeklyItem];

  return [];
}

function normalizeWeeklyItem(w: ApiWeeklyItem): WeeklyItem {
  const goalId = Number(w.goalId ?? w.id ?? 0);
  const name = String(w.name ?? '목표');
  const totalScore = coerceNumber(w.totalScore ?? w.score, 0);

  const dayListSrc = Array.isArray(w.dayList) ? w.dayList : [];
  const dayList = dayListSrc.map((d): { day: string; score: number } => ({
    day: String(d?.day ?? d?.date ?? ''),
    score: coerceNumber(d?.score, 0),
  }));

  return { goalId, name, totalScore, dayList };
}

export function WeeklyChart() {
  const [chartType, setChartType] = useState<'line' | 'area'>('line');
  const [weeklyChartData, setWeeklyChartData] = useState<WeeklyItem[]>([]);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get<WeeklyEnvelope>(
          '/goal/weekly/achievement',
        );
        const list = extractWeeklyList(data).map(normalizeWeeklyItem);
        setWeeklyChartData(list);
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

  if (err) return <div className="text-red-600">에러: {err}</div>;
  if (!weeklyChartData.length) {
    return (
      <div className="w-full max-w-xl rounded-3xl bg-white/80 p-6 shadow-md">
        <h2 className="text-lg font-bold text-gray-900">주간 성과 차트</h2>
        <div className="mt-2 text-sm text-gray-500">데이터 없음</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl rounded-3xl bg-white/80 p-6 shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">주간 성과 차트</h2>
        <div className="flex gap-2">
          <Button
            className={`h-6 rounded-full px-3 py-1 text-xs ${chartType === 'line' ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setChartType('line')}
          >
            선형
          </Button>
          <Button
            className={`h-6 rounded-full px-3 py-1 text-xs ${chartType === 'area' ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setChartType('area')}
          >
            영역
          </Button>
        </div>
      </div>

      {weeklyChartData.map((item) => (
        <div
          key={item.goalId}
          className="mb-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 p-4"
        >
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-800">
              {item.name}
            </span>
            <span className="text-sm text-gray-600">{item.totalScore}점</span>
          </div>
          <div className="h-32 w-full">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === 'line' ? (
                <LineChart data={item.dayList.map((d) => ({ value: d.score }))}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#a855f7"
                    strokeWidth={3}
                    dot={{ r: 3 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              ) : (
                <AreaChart data={item.dayList.map((d) => ({ value: d.score }))}>
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#a855f7"
                    fill="#a855f7"
                    strokeWidth={3}
                  />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>
      ))}
    </div>
  );
}
