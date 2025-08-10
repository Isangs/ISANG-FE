'use client';

import { useState } from 'react';
import FeedHeader from '@/features/feed/ui/FeedHeader';
import FeedList from '@/features/feed/ui/FeedList';
import { BottomNav } from '@/shared/ui/BottomNav';
import SearchBar from '@/features/feed/ui/SearchBar';

export default function FeedPage() {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  return (
    <div className="relative flex h-screen w-full flex-col items-center bg-gradient-to-b from-[#FAF5FF] via-[#EFF6FF] to-[#E0E7FF]">
      <div className="fixed top-0 z-10 flex w-full justify-center bg-white">
        <div className="w-full max-w-[640px]">
          <FeedHeader onSearchClick={() => setSearchVisible(true)} />
          {searchVisible && (
            <SearchBar
              keyword={searchKeyword}
              onChange={setSearchKeyword}
              onClose={() => {
                setSearchKeyword('');
                setSearchVisible(false);
              }}
            />
          )}
        </div>
      </div>

      <div className="mt-[72px] flex w-full flex-1 justify-center overflow-y-auto px-4 pb-4">
        <div className="w-full max-w-[640px]">
          <FeedList keyword={searchKeyword} />
        </div>
        <BottomNav />
      </div>
    </div>
  );
}
