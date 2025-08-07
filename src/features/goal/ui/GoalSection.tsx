'use client';

import { useState } from 'react';
import { GoalCard } from './GoalCard';
import { GoalCategoryTabs } from './GoalCategoryTabs';
import { GoalHeader } from './GoalHeader';
import { AddGoalModal } from './AddGoalModal/AddGoalModal';
import { AddGoalButton } from './AddGoalButton';
import CompletionModal from '@/features/goal-complete/ui/CompletionModal/CompletionModal';
import { RecordSettingsModal } from './RecordSettingsModal';
import { FeedType, usePostStore } from '@/shared/store/post'; // ✅ Zustand store import
import { Post } from '@/entities/post/model/post';

export function GoalSection() {
  const [goals, setGoals] = useState([
    { id: 1, category: '운동', title: '30분 걷기', score: 70 },
    { id: 2, category: '학습', title: '리액트 복습', score: 85 },
    { id: 3, category: '학습', title: '리액트 복습', score: 85 },
    { id: 4, category: '업무', title: '업무 정리', score: 90 },
  ]);

  const [categories, setCategories] = useState([
    { name: '전체', color: 'gray' },
    { name: '운동', color: 'gray' },
    { name: '학습', color: 'gray' },
    { name: '업무', color: 'gray' },
    { name: '건강', color: 'gray' },
    { name: '개인성장', color: 'gray' },
  ]);

  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCompletionOpen, setIsCompletionOpen] = useState(false);
  const [isRecordSettingsOpen, setIsRecordSettingsOpen] = useState(false);
  const [completedGoalIds, setCompletedGoalIds] = useState<number[]>([]);
  const [selectedGoalId, setSelectedGoalId] = useState<number | null>(null);
  const [selectedFeedType, setSelectedFeedType] = useState<FeedType>(
    FeedType.TEXT,
  );
  const addPost = usePostStore((state) => state.addPost);

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
    if (selectedCategory === categoryName) setSelectedCategory('전체');
  };

  const handleDeleteGoal = (id: number) => {
    setGoals((prev) => prev.filter((goal) => goal.id !== id));
  };

  const handleCompleteGoal = (goalId: number) => {
    setSelectedGoalId(goalId);
    setIsCompletionOpen(true);
  };

  const handleSubmitCompletion = (feedType: FeedType) => {
    if (selectedGoalId !== null) {
      setCompletedGoalIds((prev) =>
        prev.includes(selectedGoalId) ? prev : [...prev, selectedGoalId],
      );
    }
    setSelectedFeedType(feedType);
    setIsCompletionOpen(false);
    setSelectedGoalId(null);
    setTimeout(() => {
      setIsRecordSettingsOpen(true);
    }, 300);
  };

  const handleRecordSettingsConfirm = (settings: {
    recordEnabled: boolean;
    isPrivate: boolean;
  }) => {
    const goal = goals.find((g) => g.id === selectedGoalId);
    if (!goal) return;

    if (settings.recordEnabled && !settings.isPrivate) {
      const newPost: Post = {
        id: crypto.randomUUID(),
        author: '김민수', // TODO: 로그인 유저 정보로 교체
        profileUrl: '/profile-kim.png',
        timeAgo: '방금 전',
        badge: goal.title,
        content: `🎯 ${goal.title} 목표를 완료했어요!`,
        imageUrl: undefined,
        likeCount: 0,
        commentCount: 0,
      };
      console.log('🔥 newPost 생성됨', newPost);
      addPost(newPost, selectedFeedType);
    }

    setIsRecordSettingsOpen(false);
    setSelectedGoalId(null);
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

      {/* 목표 리스트 */}
      <div className="w-full flex-1 overflow-y-auto bg-gradient-to-b from-[#FAF5FF] via-[#EFF6FF] to-[#E0E7FF]">
        <div className="flex flex-col items-center gap-4 pt-4 pb-32">
          {filteredGoals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              isDeleteMode={isDeleteMode}
              onDelete={handleDeleteGoal}
              onOpenModal={() => handleCompleteGoal(goal.id)}
              isCompleted={completedGoalIds.includes(goal.id)}
            />
          ))}
        </div>
      </div>

      <CompletionModal
        isOpen={isCompletionOpen}
        onClose={() => setIsCompletionOpen(false)}
        onSubmit={handleSubmitCompletion}
      />

      {!isCompletionOpen && (
        <AddGoalButton onClick={() => setIsModalOpen(true)} />
      )}

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

      {isRecordSettingsOpen && (
        <RecordSettingsModal
          onClose={() => setIsRecordSettingsOpen(false)}
          onConfirm={handleRecordSettingsConfirm}
        />
      )}
    </section>
  );
}
