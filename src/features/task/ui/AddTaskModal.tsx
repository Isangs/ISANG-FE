'use client';

import { useEffect, useState } from 'react';
import { AddCategoryModal } from '../../goal/ui/AddGoalModal/AddCategoryModal';
import { cn } from '@/lib/utils';
import { GoalProps, TaskProps } from '@/features/goal/ui/GoalSection';
import { CreateGoalInput } from '@/shared/api/goals';
import { CreateTaskInput } from '@/shared/api/tasks';

export function AddTaskModal({
  onClose,
  onAdd,
  onAddCategory,
  goals
}: {
  onClose: () => void;
  onAdd: (goal: CreateTaskInput) => void;
  onAddCategory: (category: CreateGoalInput) => void;
  goals: GoalProps[];
}) {
  const [title, setTitle] = useState('');
  const [selectedGoal, setSelectedGoal] = useState<GoalProps>();
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [categoryInput, setCategoryInput] = useState('');

  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleAddCategorySubmit = (newGoal: GoalProps) => {
    setSelectedGoal(newGoal);
    setCategoryInput('');
    setIsAddingCategory(false);
    onAddCategory(newGoal);
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsMounted(false);
      onClose();
    }, 300);
  };

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/30 pb-14 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={handleClose} />

      <div
        className={cn(
          'relative w-[375px] rounded-t-[24px] bg-white/90 px-6 pt-6 pb-15 transition-transform duration-300',
          isVisible ? 'translate-y-0' : 'translate-y-full',
        )}
      >
        <div className="mx-auto mb-6 h-1 w-12 rounded-full bg-gray-300" />
        <h2 className="mb-6 text-center text-xl font-bold text-gray-800">
          새로운 할 일 추가
        </h2>

        <input
          className="mb-6 w-full rounded-xl border border-white/30 bg-white/70 px-4 py-3 text-[16px] backdrop-blur-sm placeholder:text-gray-400"
          placeholder="할 일을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* 목표 선택 */}
        <div className="mb-6 w-full">
          <p className="mb-2 text-sm font-bold text-gray-800">목표 선택</p>

          {/* 카테고리 추가 모달 */}
          <div className={cn(isAddingCategory ? 'mb-8 block' : 'hidden')}>
            <AddCategoryModal
              value={categoryInput}
              onChange={setCategoryInput}
              onClose={() => setIsAddingCategory(false)}
              onSubmit={handleAddCategorySubmit}
            />
          </div>

          {/* 새 목표 추가 버튼 */}
          <button
            className={cn(
              'mb-4 w-full rounded-xl border-2 border-dashed border-gray-300 py-4 text-sm text-gray-600',
              isAddingCategory && 'hidden',
            )}
            onClick={() => setIsAddingCategory(true)}
          >
            + 새 목표 추가
          </button>

          {/* 카테고리 리스트 */}
          <div className="mb-4 flex flex-wrap gap-3">
            {goals.map((goal) => {
              const isSelected = selectedGoal?.name === goal.name;
              const isDefault = goal.colorCode === 'gray';

              return (
                <button
                  key={goal.name}
                  onClick={() => setSelectedGoal(goal)}
                  className={cn(
                    'rounded-full px-4 py-2 text-sm transition',
                    isDefault
                      ? 'bg-gray-100 text-gray-700'
                      : ['bg-gradient-to-r', goal.colorCode, 'text-white'],
                    isSelected && 'ring-2 ring-black',
                  )}
                >
                  {goal.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-auto w-full">
          <button
            onClick={() => {
              if (title && selectedGoal) {
                onAdd({
                  goalId: selectedGoal.goalId,
                  name: title,
                  deadline: '2025-05-05T00:00'
                });
              }
            }}
            disabled={!title || !selectedGoal}
            className="w-full rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-4 text-sm font-semibold text-white shadow-lg transition-opacity disabled:opacity-50"
          >
            할 일 추가하기
          </button>
        </div>

        <button
          onClick={handleClose}
          className="absolute top-4 right-6 text-2xl text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
      </div>
    </div>
  );
}
