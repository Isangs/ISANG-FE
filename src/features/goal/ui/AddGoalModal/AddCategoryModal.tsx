'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

type AddCategoryModalProps = {
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
  onSubmit: (category: { name: string; color: string }) => void;
};

export function AddCategoryModal({
  value,
  onChange,
  onSubmit,
}: AddCategoryModalProps) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const colorOptions = [
    'from-pink-400 to-red-400',
    'from-orange-400 to-red-400',
    'from-yellow-400 to-orange-400',
    'from-green-400 to-emerald-400',
    'from-teal-400 to-cyan-400',
    'from-blue-400 to-indigo-400',
    'from-indigo-400 to-purple-400',
    'from-purple-400 to-pink-400',
  ];

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 pb-6">
        <input
          className="flex-1 rounded-xl border border-white/20 bg-white px-4 py-3 text-sm text-black placeholder:text-gray-400"
          placeholder="새 목표 이름"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button
          onClick={() => {
            const newItem = {
              name: value.trim(),
              color: selectedColor || '',
            };
            if (newItem.name && newItem.color) {
              onSubmit(newItem);
            }
          }}
          disabled={!value.trim() || !selectedColor}
          className="rounded-2xl bg-green-500 px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
        >
          추가
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {colorOptions.map((gradient, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedColor(gradient)}
            className={cn(
              'h-8 w-8 rounded-full bg-gradient-to-r',
              gradient,
              selectedColor === gradient && 'ring-2 ring-black',
            )}
          />
        ))}
      </div>
    </div>
  );
}
