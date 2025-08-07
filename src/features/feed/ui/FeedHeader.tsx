'use client';

import { Search, Bell } from 'lucide-react';

export default function FeedHeader({
  onSearchClick,
}: {
  onSearchClick: () => void;
}) {
  return (
    <header className="flex h-[72px] w-full items-center justify-between px-4">
      <h1 className="text-xl font-bold text-gray-800">피드</h1>
      <div className="flex items-center gap-6 text-gray-700">
        <button onClick={onSearchClick}>
          <Search size={22} />
        </button>
        <Bell size={22} />
      </div>
    </header>
  );
}
