'use client';

import { useState } from 'react';
import { GoalCard } from './GoalCard';
import { GoalCategoryTabs } from './GoalCategoryTabs';
import { GoalHeader } from './GoalHeader';
import { AddGoalModal } from './AddGoalModal/AddGoalModal';
import { AddGoalButton } from './AddGoalButton';
import CompletionModal from '@/features/goal-complete/ui/CompletionModal/CompletionModal';

const initialGoals = [
  { id: 1, category: '운동', title: '30분 걷기', score: 70 },
  { id: 2, category: '학습', title: '리액트 복습', score: 85 },
  { id: 3, category: '학습', title: '리액트 복습', score: 85 },
  { id: 4, category: '업무', title: '업무 정리', score: 90 },
];

export function GoalSection() {
  const [goals, setGoals] = useState(initialGoals);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [categories, setCategories] = useState([
    { name: '전체', color: 'gray' },
    { name: '운동', color: 'gray' },
    { name: '학습', color: 'gray' },
    { name: '업무', color: 'gray' },
    { name: '건강', color: 'gray' },
    { name: '개인성장', color: 'gray' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCompletionOpen, setIsCompletionOpen] = useState(false);

  const handleAddGoal = (newGoal: { title: string; category: string }) => {
    const newId = goals.length ? Math.max(...goals.map((g) => g.id)) + 1 : 1;
    const newGoalItem = {
      id: newId,
      score: 0,
      ...newGoal,
    };
    setGoals((prev) => [...prev, newGoalItem]);
  };

  const handleDeleteCategory = (categoryName: string) => {
    if (categoryName === '전체') return;

    setCategories((prev) => prev.filter((c) => c.name !== categoryName));

    if (selectedCategory === categoryName) {
      setSelectedCategory('전체');
    }
  };

  const handleDeleteGoal = (id: number) => {
    setGoals((prev) => prev.filter((goal) => goal.id !== id));
  };

  const filteredGoals =
    selectedCategory === '전체'
      ? goals
      : goals.filter((goal) => goal.category === selectedCategory);

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
            <GoalCard
              key={goal.id}
              goal={goal}
              isDeleteMode={isDeleteMode}
              onDelete={handleDeleteGoal}
              onOpenModal={() => setIsCompletionOpen(true)} // 이건 GoalSection에서 선언한 상태 핸들러
            />
          ))}
        </div>
      </div>

      <CompletionModal
        isOpen={isCompletionOpen}
        onClose={() => setIsCompletionOpen(false)}
      />

      {/* AddGoalButton은 CompletionModal이 열려있을 때 숨김 */}
      {!isCompletionOpen && (
        <AddGoalButton onClick={() => setIsModalOpen(true)} />
      )}

      {/* AddGoalModal */}
      {isModalOpen && (
        <AddGoalModal
          onClose={() => setIsModalOpen(false)}
          onAdd={(goal) => {
            handleAddGoal(goal);
            setIsModalOpen(false);
          }}
          onAddCategory={(category: { name: string; color: string }) => {
            setCategories((prev) => {
              if (prev.some((c) => c.name === category.name)) return prev;
              return [...prev, category];
            });
            setSelectedCategory(category.name);
          }}
        />
      )}
    </section>
  );
}
