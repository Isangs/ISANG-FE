'use client';

import { Trash2 } from 'lucide-react';

type GoalHeaderProps = {
  isDeleteMode: boolean;
  onToggleDeleteMode: () => void;
};

export function GoalHeader({
  isDeleteMode,
  onToggleDeleteMode,
}: GoalHeaderProps) {
  return (
    <div className="flex w-full items-center justify-between px-4 py-6">
      <div className="flex flex-col">
        <h2 className="text-xl font-bold text-gray-900">오늘의 목표</h2>
        <p className="text-sm text-gray-600">힘내서 완료해보세요! 💪</p>
      </div>

      <button
        onClick={onToggleDeleteMode}
        className={`relative flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
          isDeleteMode ? 'bg-red-500' : 'bg-gray-100'
        }`}
      >
        <Trash2
          className={`h-4 w-4 ${isDeleteMode ? 'text-white' : 'text-gray-600'}`}
        />
      </button>
    </div>
  );
}
