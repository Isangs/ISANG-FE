'use client';

import { useEffect, useState } from 'react';
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
  fetchGoals,
  createGoal as apiCreateGoal,
  deleteGoal as apiDeleteGoal,
  fetchTasksByGoal,
} from '@/shared/api/goals';
import {
  verifyCompletionText,
  verifyCompletionImage,
  updateRecordSettings,
} from '@/shared/api/record';
import type { Goal } from '@/shared/types/goal';

type CompletionSubmitPayload = {
  type: FeedType;
  content?: string;
  imageUrl?: string;
};

// 공통 에러 메시지 헬퍼
const getErrorMessage = (err: unknown, fallback = '요청에 실패했어요.') =>
  err instanceof Error ? err.message : fallback;

export function GoalSection() {
  // 서버 데이터만 사용
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loadingGoals, setLoadingGoals] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

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

  const [selectedGoalId, setSelectedGoalId] = useState<number | null>(null); // PATCH용
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null); // verify용
  const [loadingTask, setLoadingTask] = useState(false);

  const [completedGoalIds, setCompletedGoalIds] = useState<number[]>([]);
  const [selectedFeedType, setSelectedFeedType] = useState<FeedType>(
    FeedType.TEXT,
  );

  const addPost = usePostStore((state) => state.addPost);

  // 최초 로드: 목표 목록
  useEffect(() => {
    (async () => {
      try {
        setLoadingGoals(true);
        setLoadError(null);
        const list = await fetchGoals();
        setGoals(list ?? []);
      } catch (err: unknown) {
        console.error('[goal] fetchGoals failed', err);
        setLoadError(getErrorMessage(err, '목표 목록을 불러오지 못했어요.'));
      } finally {
        setLoadingGoals(false);
      }
    })();
  }, []);

  // 목표 생성
  const handleAddGoal = async (newGoal: {
    title: string;
    category: string;
  }) => {
    try {
      const created = await apiCreateGoal(newGoal);
      setGoals((prev) => [created, ...prev]);
    } catch (err: unknown) {
      alert(getErrorMessage(err, '목표 생성에 실패했어요.'));
    }
  };

  const handleDeleteCategory = (categoryName: string) => {
    if (categoryName === '전체') return;
    setCategories((prev) => prev.filter((c) => c.name !== categoryName));
    if (selectedCategory === categoryName) setSelectedCategory('전체');
  };

  // 목표 삭제(낙관적)
  const handleDeleteGoal = async (id: number) => {
    const backup = goals;
    setGoals((prev) => prev.filter((g) => g.id !== id));
    try {
      await apiDeleteGoal(id);
    } catch (err: unknown) {
      setGoals(backup);
      alert(getErrorMessage(err, '목표 삭제에 실패했어요.'));
    }
  };

  // 완료 → taskId 조회 후 모달
  const handleCompleteGoal = async (goalId: number) => {
    setSelectedGoalId(goalId);
    setLoadingTask(true);
    try {
      const tasks = await fetchTasksByGoal(goalId);
      const firstTaskId = tasks?.[0]?.id;
      if (!firstTaskId) {
        alert('이 목표에 연결된 할 일이 없어요.');
        return;
      }
      setSelectedTaskId(firstTaskId);
      setIsCompletionOpen(true);
    } catch (err: unknown) {
      console.error('[goal] fetchTasksByGoal failed', err);
      alert(getErrorMessage(err, '할 일 조회 중 오류가 발생했어요.'));
    } finally {
      setLoadingTask(false);
    }
  };

  // 인증 제출
  const handleSubmitCompletion = async (data: CompletionSubmitPayload) => {
    if (selectedTaskId == null || selectedGoalId == null) return;

    try {
      if (data.type === FeedType.TEXT) {
        await verifyCompletionText(selectedTaskId, data.content ?? '');
      } else {
        await verifyCompletionImage(selectedTaskId, data.imageUrl ?? '');
      }

      setSelectedFeedType(data.type);
      setCompletedGoalIds((prev) =>
        prev.includes(selectedGoalId) ? prev : [...prev, selectedGoalId],
      );

      setIsCompletionOpen(false);
      setTimeout(() => setIsRecordSettingsOpen(true), 300);
    } catch (err: unknown) {
      alert(getErrorMessage(err, '완료 인증에 실패했어요.'));
    }
  };

  // 기록 설정
  const handleRecordSettingsConfirm = async (settings: {
    recordEnabled: boolean;
    isPrivate: boolean;
  }) => {
    if (selectedGoalId == null) return;

    try {
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
            selectedFeedType === FeedType.IMAGE ? '이미지_URL_자리' : undefined,
          likeCount: 0,
          commentCount: 0,
        };
        addPost(newPost, selectedFeedType);
      }
    } catch (err: unknown) {
      alert(getErrorMessage(err, '기록 설정 저장에 실패했어요.'));
    } finally {
      setIsRecordSettingsOpen(false);
      setSelectedGoalId(null);
      setSelectedTaskId(null);
    }
  };

  const filteredGoals =
    selectedCategory === '전체'
      ? goals
      : goals.filter((g) => g.category === selectedCategory);

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

      {/* 상태 표시 */}
      {loadingGoals ? (
        <div className="flex flex-1 items-center justify-center">
          목표 불러오는 중…
        </div>
      ) : loadError ? (
        <div className="flex flex-1 items-center justify-center text-red-500">
          {loadError}
        </div>
      ) : (
        <>
          {/* 목표 리스트 */}
          <div className="w-full flex-1 overflow-y-auto bg-gradient-to-b from-[#FAF5FF] via-[#EFF6FF] to-[#E0E7FF]">
            <div className="flex flex-col items-center gap-4 pt-4 pb-32">
              {filteredGoals.map((goal) => (
                <GoalCard
                  key={goal.id}
                  goal={goal}
                  isDeleteMode={isDeleteMode}
                  onDelete={handleDeleteGoal}
                  onOpenModal={() =>
                    !loadingTask && handleCompleteGoal(goal.id)
                  }
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
        </>
      )}

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
