'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface AddCategoryModalProps {
  onClose: () => void;
  onAdd: (category: string) => void;
}

export function AddCategoryModal({ onClose, onAdd }: AddCategoryModalProps) {
  const [category, setCategory] = useState('');

  const handleAdd = () => {
    const trimmed = category.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setCategory('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="relative w-[320px] rounded-xl bg-white p-6 shadow-xl">
        <h3 className="mb-4 text-center text-lg font-bold text-gray-800">
          새 목표 추가
        </h3>

        <input
          type="text"
          placeholder="목표 이름을 입력하세요"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mb-4 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-md bg-gray-200 px-4 py-2 text-sm text-gray-700"
          >
            취소
          </button>

          <button
            onClick={handleAdd}
            disabled={category.trim() === ''}
            className={cn(
              'rounded-md bg-purple-500 px-4 py-2 text-sm text-white',
              category.trim() === '' && 'cursor-not-allowed opacity-50',
            )}
          >
            추가
          </button>
        </div>
      </div>
    </div>
  );
}
