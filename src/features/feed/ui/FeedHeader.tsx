'use client';

import { Search, Bell } from 'lucide-react';

export default function FeedHeader() {
  return (
    <header className="flex h-[72px] w-full max-w-[375px] items-center justify-between px-4">
      <h1 className="text-xl font-bold text-gray-800">피드</h1>
      <div className="flex items-center gap-6 text-gray-700">
        <Search size={22} />
        <Bell size={22} />
      </div>
    </header>
  );
}
