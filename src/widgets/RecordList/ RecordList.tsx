'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Eye, EyeOff, MoreHorizontal } from 'lucide-react';
import api from '@/shared/api/axios';

type RecordItem = {
  date: string;
  content: string;
  isPublic: boolean;
};

type ApiFeed = {
  id?: number | string;
  createdAt?: string;
  date?: string;
  content?: string;
  text?: string;
  body?: string;
  isPublic?: boolean;
  isPrivate?: boolean;
};

type FeedEnvelope =
  | { result?: { feeds?: ApiFeed[] } }
  | { feeds?: ApiFeed[] }
  | ApiFeed[]
  | ApiFeed;

function isObj(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null;
}
function getArrayProp<T>(obj: unknown, key: string): T[] | null {
  if (!isObj(obj)) return null;
  const val = (obj as Record<string, unknown>)[key];
  return Array.isArray(val) ? (val as T[]) : null;
}
function hasResult(d: unknown): d is { result: unknown } {
  return isObj(d) && 'result' in d;
}

function extractFeeds(data: FeedEnvelope): ApiFeed[] {
  if (Array.isArray(data)) return data as ApiFeed[];

  if (hasResult(data)) {
    const r = (data as { result: unknown }).result;
    const feeds = getArrayProp<ApiFeed>(r, 'feeds');
    if (feeds) return feeds;
    if (isObj(r)) return [r as ApiFeed];
  }

  const top = getArrayProp<ApiFeed>(data, 'feeds');
  if (top) return top;

  if (isObj(data)) return [data as ApiFeed];
  return [];
}

function normalize(f: ApiFeed): RecordItem {
  const rawDate = String(f.createdAt ?? f.date ?? '');
  const date = rawDate ? rawDate.slice(0, 10) : '';
  const content = String(f.content ?? f.text ?? f.body ?? '');
  const isPublic =
    typeof f.isPublic === 'boolean'
      ? f.isPublic
      : typeof f.isPrivate === 'boolean'
        ? !f.isPrivate
        : false;

  return { date, content, isPublic };
}

export default function RecordList() {
  const [expanded, setExpanded] = useState(false);
  const [items, setItems] = useState<RecordItem[]>([]);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get<FeedEnvelope>('/feed/myself');
        const list = extractFeeds(data).map(normalize);
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

  const displayed = expanded ? items : items.slice(0, 2);

  return (
    <div className="w-full max-w-xl rounded-3xl bg-white/80 p-6 shadow-md">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">내 기록</h2>
        <button
          onClick={() => setExpanded((v) => !v)}
          className="text-sm font-medium text-purple-600"
          disabled={!items.length}
        >
          {expanded ? '닫기' : '전체 보기'}
        </button>
      </div>

      {err && <div className="mt-2 text-sm text-red-600">에러: {err}</div>}
      {!items.length && !err && (
        <div className="mt-3 text-sm text-gray-500">데이터 없음</div>
      )}

      {!!items.length && (
        <div className="mt-3 flex flex-col gap-3 transition-all duration-300 ease-in-out">
          {displayed.map((record, idx) => (
            <div
              key={`${record.date}-${idx}`}
              className="flex justify-between rounded-2xl bg-white/50 p-4"
            >
              <div className="flex w-[239px] flex-col">
                <span className="mb-1 text-sm text-gray-600">
                  {record.date}
                </span>
                <p className="line-clamp-2 text-sm text-gray-800">
                  {record.content}
                </p>
                <div className="mt-2 flex items-center gap-1">
                  {record.isPublic ? (
                    <>
                      <Eye className="h-4 w-4 text-gray-400" />
                      <span className="text-xs text-gray-500">공개</span>
                    </>
                  ) : (
                    <>
                      <EyeOff className="h-4 w-4 text-gray-400" />
                      <span className="text-xs text-gray-500">비공개</span>
                    </>
                  )}
                </div>
              </div>
              <button className="flex h-6 w-6 items-center justify-center text-gray-400">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
