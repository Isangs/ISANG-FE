'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { AddCategoryModal } from './AddCategoryModal';
import { GoalInputSection } from './GoalInputSection';
import { GoalCategorySelector } from './GoalCategorySelector';

interface Props {
  onClose: () => void;
  onAdd: (goal: { title: string; category: string }) => void;
}

export function AddGoalModal({ onClose, onAdd }: Props) {
  const [visible, setVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  const [title, setTitle] = useState('');
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [categories, setCategories] = useState([
    '운동',
    '학습',
    '업무',
    '건강',
    '개인성장',
  ]);
  const [category, setCategory] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleAddCategorySubmit = () => {
    const trimmed = category.trim();
    if (!trimmed) return;
    setCategories((prev) => [...prev, trimmed]);
    setSelectedGoal(trimmed);
    setCategory('');
    setIsAddingCategory(false);
  };

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      setIsMounted(false);
      onClose();
    }, 300);
  };

  const handleAddGoal = () => {
    if (!title || !selectedGoal) return;
    onAdd({ title, category: selectedGoal });
    setTitle('');
    setSelectedGoal(null);
    handleClose();
  };

  if (!isMounted) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/30 pb-14 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={handleClose} />

      <div
        className={cn(
          'relative flex w-[375px] flex-col items-start rounded-t-[24px] bg-white/80 px-6 py-6 transition-transform duration-300',
          visible ? 'translate-y-0' : 'translate-y-full',
          isAddingCategory ? 'h-[620px]' : 'h-[491px]',
        )}
      >
        {/* 공통 요소 */}
        <div className="mx-auto mb-6 h-1 w-12 rounded-full bg-gray-300" />

        {isAddingCategory ? (
          <>
            <AddCategoryModal
              value={category}
              onChange={setCategory}
              onClose={() => setIsAddingCategory(false)}
              onSubmit={handleAddCategorySubmit}
            />
          </>
        ) : (
          // ✅ 기본 AddGoal UI
          <>
            <h2 className="mb-6 w-full text-center text-[20px] font-bold text-gray-800">
              새로운 할 일 추가
            </h2>

            <GoalInputSection value={title} onChange={setTitle} />

            <div className="mb-3 text-[14px] font-semibold text-gray-700">
              목표 선택
            </div>

            <button
              className="mb-4 w-full rounded-xl border-2 border-dashed border-gray-300 py-3 text-sm text-gray-600"
              onClick={() => setIsAddingCategory(true)}
            >
              + 새 목표 추가
            </button>

            <GoalCategorySelector
              categories={categories}
              selected={selectedGoal}
              onSelect={setSelectedGoal}
            />

            <button
              onClick={handleAddGoal}
              disabled={!title || !selectedGoal}
              className={cn(
                'w-full rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 py-3 text-sm font-semibold text-white shadow-lg transition-opacity',
                title && selectedGoal ? 'opacity-100' : 'opacity-50',
              )}
            >
              할 일 추가하기
            </button>
          </>
        )}
      </div>
    </div>
  );
}
