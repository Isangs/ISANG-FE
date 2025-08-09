'use client';

import { useState } from 'react';
import { GoalCard } from './GoalCard';
import { GoalCategoryTabs } from './GoalCategoryTabs';
import { GoalHeader } from './GoalHeader';
import { AddGoalModal } from './AddGoalModal/AddGoalModal';
import { AddGoalButton } from './AddGoalButton';
import CompletionModal from '@/features/goal-complete/ui/CompletionModal/CompletionModal';
import { RecordSettingsModal } from './RecordSettingsModal';
import { FeedType, usePostStore } from '@/shared/store/post';
import { Post } from '@/entities/post/model/post';
import {
  createGoal as apiCreateGoal,
  deleteGoal as apiDeleteGoal,
} from '@/shared/api/goals';
import {
  verifyCompletionText,
  verifyCompletionImage,
  updateRecordSettings,
} from '@/shared/api/record';

// CompletionModal이 넘겨줄 데이터 형태
type CompletionSubmitPayload = {
  type: FeedType; // 'TEXT' | 'IMAGE'
  content?: string; // TEXT일 때
  imageUrl?: string; // IMAGE일 때
};

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

  // ✅ 서버 생성으로 교체
  const handleAddGoal = async (newGoal: {
    title: string;
    category: string;
  }) => {
    const created = await apiCreateGoal(newGoal);
    setGoals((prev) => [created, ...prev]);
  };

  const handleDeleteCategory = (categoryName: string) => {
    if (categoryName === '전체') return;
    setCategories((prev) => prev.filter((c) => c.name !== categoryName));
    if (selectedCategory === categoryName) setSelectedCategory('전체');
  };

  // ✅ 낙관적 삭제 + 실패 시 롤백
  const handleDeleteGoal = async (id: number) => {
    const backup = goals;
    setGoals((prev) => prev.filter((goal) => goal.id !== id));
    try {
      await apiDeleteGoal(id);
    } catch {
      setGoals(backup);
    }
  };

  const handleCompleteGoal = (goalId: number) => {
    setSelectedGoalId(goalId);
    setIsCompletionOpen(true);
  };

  // ✅ 텍스트/이미지 인증 API 호출 → 설정 모달로
  const handleSubmitCompletion = async (data: CompletionSubmitPayload) => {
    if (selectedGoalId == null) return;

    if (data.type === FeedType.TEXT) {
      await verifyCompletionText(selectedGoalId, data.content ?? '');
    } else {
      await verifyCompletionImage(selectedGoalId, data.imageUrl ?? '');
    }

    setSelectedFeedType(data.type);
    setCompletedGoalIds((prev) =>
      prev.includes(selectedGoalId) ? prev : [...prev, selectedGoalId],
    );

    setIsCompletionOpen(false);
    // ⚠️ 설정 모달에서 goalId를 써야 하므로 여기서는 selectedGoalId를 비우지 않음
    setTimeout(() => setIsRecordSettingsOpen(true), 300);
  };

  // ✅ 기록 설정 PATCH + 공개면 피드 반영
  const handleRecordSettingsConfirm = async (settings: {
    recordEnabled: boolean;
    isPrivate: boolean;
  }) => {
    if (selectedGoalId == null) return;

    await updateRecordSettings({
      goalId: selectedGoalId,
      recordEnabled: settings.recordEnabled,
      isPrivate: settings.isPrivate,
    });

    const goal = goals.find((g) => g.id === selectedGoalId);
    if (goal && settings.recordEnabled && !settings.isPrivate) {
      const newPost: Post = {
        id: crypto.randomUUID(),
        author: '김민수', // TODO: 로그인 유저 정보로 교체
        profileUrl: '/profile-kim.png',
        timeAgo: '방금 전',
        badge: goal.title,
        content: `🎯 ${goal.title} 목표를 완료했어요!`,
        imageUrl:
          selectedFeedType === FeedType.IMAGE ? '이미지_URL_자리' : undefined, // 필요 시 연결
        likeCount: 0,
        commentCount: 0,
      };
      addPost(newPost, selectedFeedType);
    }

    setIsRecordSettingsOpen(false);
    setSelectedGoalId(null); // 여기서 비움
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
        // ⬇️ (중요) onSubmit 시그니처: (payload: { type, content?, imageUrl? })
        onSubmit={handleSubmitCompletion}
      />

      {!isCompletionOpen && (
        <AddGoalButton onClick={() => setIsModalOpen(true)} />
      )}

      {isModalOpen && (
        <AddGoalModal
          onClose={() => setIsModalOpen(false)}
          onAdd={async (goal) => {
            await handleAddGoal(goal);
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
