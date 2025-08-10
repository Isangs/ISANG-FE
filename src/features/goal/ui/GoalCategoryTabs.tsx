'use client';

import { cn } from '@/lib/utils';
import { GoalProps } from '@/features/goal/ui/GoalSection';
import { Goal } from '@/shared/types/goal';

type GoalCategoryTabsProps = {
  categories: GoalProps[];
  isDeleteMode?: boolean;
  selected: GoalProps | undefined;
  onSelect: (category: GoalProps | undefined) => void;
  onDelete: (category: GoalProps) => void;
};

export function GoalCategoryTabs({
  isDeleteMode = false,
  selected,
  onSelect,
  onDelete,
  categories = [],
}: GoalCategoryTabsProps) {
  const wrappedGoals: GoalProps[] = [
    {
      goalId: 0,
      name: "전체",
      colorCode: "bg-gray-200",
    },
    ...categories,
  ]

  return (
    <div className="relative flex w-full gap-2 overflow-x-auto px-4 pt-2 pb-5">
      {wrappedGoals.map((goal) => (
        <div key={goal.goalId} className="relative">
          {isDeleteMode && (
            <button
              className="absolute -top-2 -right-2 z-10 h-6 w-6 rounded-full bg-red-500 text-xs font-bold text-white shadow-md"
              onClick={() => onDelete(goal)}
            >
              ×
            </button>
          )}
          <button
            onClick={() => onSelect(goal)}
            className={cn(
              'h-9 rounded-full px-4 text-sm font-medium whitespace-nowrap bg-gradient-to-r text-white shadow-md',
                goal.colorCode,
                selected?.name === goal.name && 'ring-2 ring-black',
            )}
          >
            {goal.name}
          </button>
        </div>
      ))}
    </div>
  );
}
