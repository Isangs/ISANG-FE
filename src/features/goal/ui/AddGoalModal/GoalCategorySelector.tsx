'use client';

import { cn } from '@/lib/utils';

type Props = {
  categories: string[];
  selected: string | null;
  onSelect: (category: string) => void;
};

export function GoalCategorySelector({
  categories,
  selected,
  onSelect,
}: Props) {
  return (
    <div className="mb-6 flex w-full flex-wrap gap-3">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={cn(
            'rounded-full px-4 py-2 text-[14px] font-medium transition-colors',
            selected === category
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
              : 'bg-[#f2f4f5] text-[#4a5462]',
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
