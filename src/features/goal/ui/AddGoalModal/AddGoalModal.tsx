'use client';

import { useEffect, useState } from 'react';
import { AddCategoryModal } from './AddCategoryModal';
import { cn } from '@/lib/utils';

type Category = {
  name: string;
  color: string;
};

export function AddGoalModal({
  onClose,
  onAdd,
  onAddCategory,
}: {
  onClose: () => void;
  onAdd: (goal: { title: string; category: string }) => void;
  onAddCategory: (category: { name: string; color: string }) => void;
}) {
  const [title, setTitle] = useState('');
  const [categories, setCategories] = useState<Category[]>([
    { name: '운동', color: 'gray' },
    { name: '학습', color: 'gray' },
    { name: '업무', color: 'gray' },
    { name: '건강', color: 'gray' },
    { name: '개인성장', color: 'gray' },
  ]);
  const [selectedGoal, setSelectedGoal] = useState('');
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [categoryInput, setCategoryInput] = useState('');

  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleAddCategorySubmit = (newCategory: Category) => {
    setCategories((prev) => [...prev, newCategory]);
    setSelectedGoal(newCategory.name);
    setCategoryInput('');
    setIsAddingCategory(false);
    onAddCategory?.(newCategory);
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
            {categories.map((category) => {
              const isSelected = selectedGoal === category.name;
              const isDefault = category.color === 'gray';

              return (
                <button
                  key={category.name}
                  onClick={() => setSelectedGoal(category.name)}
                  className={cn(
                    'rounded-full px-4 py-2 text-sm transition',
                    isDefault
                      ? 'bg-gray-100 text-gray-700'
                      : ['bg-gradient-to-r', category.color, 'text-white'],
                    isSelected && 'ring-2 ring-black',
                  )}
                >
                  {category.name}
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
                  title,
                  category: selectedGoal,
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
