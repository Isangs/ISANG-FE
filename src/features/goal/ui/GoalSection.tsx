'use client';

import { useState } from 'react';
import { GoalCard } from './GoalCard';
import { GoalCategoryTabs } from './GoalCategoryTabs';
import { GoalHeader } from './GoalHeader';

const dummyGoals = [
  { id: 1, category: '운동', title: '30분 걷기', score: 70 },
  { id: 2, category: '학습', title: '리액트 복습', score: 85 },
  { id: 3, category: '학습', title: '리액트 복습', score: 85 },
  { id: 4, category: '업무', title: '업무 정리', score: 90 },
];

export function GoalSection() {
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const [categories, setCategories] = useState([
    '전체',
    '운동',
    '학습',
    '업무',
    '건강',
    '개인성장',
  ]);

  const handleDeleteCategory = (category: string) => {
    if (category === '전체') return; // "전체"는 삭제 금지

    setCategories((prev) => prev.filter((c) => c !== category));

    // 선택된 카테고리를 삭제하면 "전체"로 이동
    if (selectedCategory === category) {
      setSelectedCategory('전체');
    }
  };

  // 필터링
  const filteredGoals =
    selectedCategory === '전체'
      ? dummyGoals
      : dummyGoals.filter((goal) => goal.category === selectedCategory);

  return (
    <section className="flex h-screen w-full flex-col">
      <div className="sticky top-0 z-10 w-full bg-white">
        <GoalHeader
          isDeleteMode={isDeleteMode}
          onToggleDeleteMode={() => setIsDeleteMode((prev) => !prev)}
        />

        <GoalCategoryTabs
          categories={categories}
          isDeleteMode={isDeleteMode}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
          onDelete={handleDeleteCategory}
        />
      </div>

      <div className="w-full flex-1 overflow-y-auto bg-gradient-to-b from-[#FAF5FF] via-[#EFF6FF] to-[#E0E7FF]">
        <div className="flex flex-col items-center gap-4 pt-4 pb-32">
          {filteredGoals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </div>
      </div>
    </section>
  );
}
