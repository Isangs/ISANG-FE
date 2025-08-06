'use client';

import { cn } from '@/lib/utils';

type GoalCategoryTabsProps = {
  categories: string[];
  isDeleteMode?: boolean;
  selected: string;
  onSelect: (category: string) => void;
  onDelete?: (category: string) => void;
};

export function GoalCategoryTabs({
  isDeleteMode = false,
  selected,
  onSelect,
  onDelete,
  categories = [],
}: GoalCategoryTabsProps) {
  return (
    <div className="relative flex w-full gap-2 overflow-x-auto px-4 py-2">
      {categories.map((category) => (
        <div key={category} className="relative">
          {isDeleteMode && (
            <button
              className="absolute -top-2 -right-2 z-10 h-6 w-6 rounded-full bg-red-500 text-xs font-bold text-white shadow-md"
              onClick={() => {
                console.log(`${category} 삭제`);
                onDelete?.(category);
              }}
            >
              ×
            </button>
          )}
          <button
            onClick={() => onSelect(category)}
            className={cn(
              'h-9 rounded-full px-4 text-sm font-medium whitespace-nowrap',
              selected === category
                ? 'bg-gradient-to-r from-gray-400 to-gray-600 text-white shadow-md'
                : 'bg-white/70 text-gray-700',
            )}
          >
            {category}
          </button>
        </div>
      ))}
    </div>
  );
}
