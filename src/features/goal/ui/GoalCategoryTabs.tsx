'use client';

import { cn } from '@/lib/utils';

type GoalCategoryTabsProps = {
  categories: { name: string; color: string }[];
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
    <div className="relative flex w-full gap-2 overflow-x-auto px-4 pt-2 pb-5">
      {categories.map(({ name }) => (
        <div key={name} className="relative">
          {isDeleteMode && (
            <button
              className="absolute -top-2 -right-2 z-10 h-6 w-6 rounded-full bg-red-500 text-xs font-bold text-white shadow-md"
              onClick={() => onDelete?.(name)}
            >
              ×
            </button>
          )}
          <button
            onClick={() => onSelect(name)}
            className={cn(
              'h-9 rounded-full px-4 text-sm font-medium whitespace-nowrap',
              selected === name
                ? 'bg-gradient-to-r from-gray-400 to-gray-600 text-white shadow-md'
                : 'bg-white/70 text-gray-700',
            )}
          >
            {name}
          </button>
        </div>
      ))}
    </div>
  );
}
