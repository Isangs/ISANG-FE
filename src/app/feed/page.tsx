'use client';

import FeedHeader from '@/features/feed/ui/FeedHeader';
import FeedList from '@/features/feed/ui/FeedList';
import { BottomNav } from '@/shared/ui/BottomNav';
export default function FeedPage() {
  return (
    <div className="relative flex h-screen w-full flex-col items-center bg-gradient-to-b from-[#FAF5FF] via-[#EFF6FF] to-[#E0E7FF]">
      {/* 고정 헤더 */}
      <div className="fixed top-0 z-10 w-full max-w-[375px] bg-white">
        <FeedHeader />
      </div>

      {/* 스크롤 가능한 리스트 */}
      <div className="mt-[72px] w-full max-w-[375px] flex-1 overflow-y-scroll px-4 pb-4">
        <FeedList />
        <BottomNav />
      </div>
    </div>
  );
}
