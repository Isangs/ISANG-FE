'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

const categories = ['전체', '운동', '학습', '업무', '건강', '개인성장'];

export function GoalCategoryTabs() {
  const [selected, setSelected] = useState('전체');

  return (
    <div className="flex w-full gap-2 overflow-x-auto px-4 py-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelected(category)}
          className={cn(
            'h-9 rounded-full px-4 text-sm font-medium whitespace-nowrap',
            selected === category
              ? 'bg-gradient-to-r from-gray-400 to-gray-600 text-white shadow-md'
              : 'bg-white/70 text-gray-700',
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
