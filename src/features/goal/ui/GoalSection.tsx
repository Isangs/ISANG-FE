'use client';

import { useState } from 'react';
import { GoalCard } from './GoalCard';
import { GoalCategoryTabs } from './GoalCategoryTabs';
import { GoalHeader } from './GoalHeader';

const dummyGoals = [
  { id: 1, category: '운동', title: '30분 걷기', score: 70 },
  { id: 2, category: '학습', title: '리액트 복습', score: 85 },
  { id: 3, category: '학습', title: '리액트 복습', score: 85 },
  { id: 4, category: '학습', title: '리액트 복습', score: 85 },
  { id: 5, category: '학습', title: '리액트 복습', score: 85 },
  { id: 6, category: '학습', title: '리액트 복습', score: 85 },
  { id: 7, category: '학습', title: '리액트 복습', score: 85 },
  { id: 8, category: '학습', title: '리액트 복습', score: 85 },
  { id: 9, category: '학습', title: '리액트 복습', score: 85 },
  { id: 10, category: '학습', title: '리액트 복습', score: 85 },
];

export function GoalSection() {
  const [selectedCategory, setSelectedCategory] = useState('전체');

  // 필터링
  const filteredGoals =
    selectedCategory === '전체'
      ? dummyGoals
      : dummyGoals.filter((goal) => goal.category === selectedCategory);

  return (
    <section className="flex h-screen w-full flex-col">
      {/* 상단 고정 영역 */}
      <div className="sticky top-0 z-10 w-full bg-white">
        <GoalHeader />
        <GoalCategoryTabs
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </div>

      {/* 카드 리스트 영역 */}
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
