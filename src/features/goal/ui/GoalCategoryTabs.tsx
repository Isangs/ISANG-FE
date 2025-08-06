'use client';
import { cn } from '@/lib/utils';

const categories = ['전체', '운동', '학습', '업무', '건강', '개인성장'];

type Props = {
  selected: string;
  onSelect: (category: string) => void;
};

export function GoalCategoryTabs({ selected, onSelect }: Props) {
  return (
    <div className="flex w-full gap-2 overflow-x-auto px-4 py-5">
      {categories.map((category) => (
        <button
          key={category}
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
      ))}
    </div>
  );
}
