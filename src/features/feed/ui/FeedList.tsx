'use client';

import { useEffect, useState } from 'react';
import PostCard from '@/entities/user/ui/PostCard';
import type { Post } from '@/entities/post/model/post';
import { fetchFeeds, searchFeeds } from '@/shared/api/feed';

type Props = { keyword?: string };

function getErrorMessage(e: unknown): string {
  if (e instanceof Error) return e.message;
  if (typeof e === 'string') return e;
  if (typeof e === 'object' && e !== null) {
    const maybeMsg = (e as { message?: unknown }).message;
    if (typeof maybeMsg === 'string') return maybeMsg;
  }
  return '불러오기 실패';
}

export default function FeedList({ keyword = '' }: Props) {
  const q = keyword.trim();
  const isSearching = q.length > 0;

  const [items, setItems] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        setErr(null);
        const list = isSearching ? await searchFeeds(q) : await fetchFeeds();
        if (alive) setItems(list);
      } catch (e: unknown) {
        const msg = getErrorMessage(e);
        if (alive) setErr(msg);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [q, isSearching]);

  if (err) {
    return (
      <div className="mt-6 rounded-xl bg-red-50 p-4 text-sm text-red-600">
        에러: {err}
      </div>
    );
  }

  const isEmpty = !loading && items.length === 0;

  return (
    <div className="mt-4 mb-20 flex flex-col gap-4">
      {loading && (
        <div className="flex flex-col gap-3">
          <div className="h-24 animate-pulse rounded-xl bg-gray-200/60" />
          <div className="h-24 animate-pulse rounded-xl bg-gray-200/60" />
          <div className="h-24 animate-pulse rounded-xl bg-gray-200/60" />
        </div>
      )}

      {isEmpty ? (
        <div className="flex h-[300px] flex-col items-center justify-center text-gray-500">
          <div className="mb-4">
            <svg
              className="h-10 w-10 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M16.65 16.65a7 7 0 1114 0 7 7 0 01-14 0z"
              />
            </svg>
          </div>
          <p className="text-lg font-medium">검색 결과가 없습니다</p>
          <p className="text-sm">다른 키워드로 검색해보세요</p>
        </div>
      ) : (
        items.map((post, i) => <PostCard key={i} post={post} />)
      )}
    </div>
  );
}
