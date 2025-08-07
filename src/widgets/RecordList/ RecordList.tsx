'use client';

import { useState } from 'react';
import { Eye, EyeOff, MoreHorizontal } from 'lucide-react';

type RecordItem = {
  date: string;
  content: string;
  isPublic: boolean;
};

const records: RecordItem[] = [
  {
    date: '2024-01-15',
    content: '오늘 정말 힘들었지만 모든 할일을 완료했다!',
    isPublic: true,
  },
  {
    date: '2024-01-14',
    content: '운동 30분 완료. 체력이 조금씩 늘고 있는 것 같다.',
    isPublic: false,
  },
  {
    date: '2024-01-13',
    content: '조금은 느슨해졌지만 다시 집중해야겠다.',
    isPublic: true,
  },
  {
    date: '2024-01-12',
    content: '작심삼일을 깨자. 오늘도 파이팅.',
    isPublic: false,
  },
];

export default function RecordList() {
  const [expanded, setExpanded] = useState(false);

  const displayedRecords = expanded ? records : records.slice(0, 2);

  return (
    <div className="w-full max-w-xl rounded-3xl bg-white/80 p-6 shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">내 기록</h2>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm font-medium text-purple-600"
        >
          {expanded ? '닫기' : '전체 보기'}
        </button>
      </div>

      {/* List */}
      <div
        className={`mt-3 flex flex-col gap-3 transition-all duration-300 ease-in-out`}
      >
        {displayedRecords.map((record, idx) => (
          <div
            key={idx}
            className="flex justify-between rounded-2xl bg-white/50 p-4"
          >
            <div className="flex w-[239px] flex-col">
              <span className="mb-1 text-sm text-gray-600">{record.date}</span>
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
    </div>
  );
}
