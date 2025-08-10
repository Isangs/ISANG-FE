'use client';

import { useCallback, useEffect, useState } from 'react';
import { TaskCard } from '../../task/ui/TaskCard';
import { GoalCategoryTabs } from './GoalCategoryTabs';
import { GoalHeader } from './GoalHeader';
import { AddTaskModal } from '../../task/ui/AddTaskModal';
import { AddGoalButton } from './AddGoalButton';
import CompletionModal from '@/features/goal-complete/ui/CompletionModal/CompletionModal';
import { RecordSettingsModal } from './RecordSettingsModal';
import { FeedType } from '@/shared/store/post';
import {
  deleteGoal as apiDeleteGoal,
  fetchGoalList,
  CreateGoalInput, createGoal, deleteGoal,
} from '@/shared/api/goals';
import {
  verifyCompletionText,
  verifyCompletionImage,
  updateRecordSettings,
} from '@/shared/api/record';
import { createTask, CreateTaskInput, fetchTaskList } from '@/shared/api/tasks';

type CompletionSubmitPayload = {
  type: FeedType;
  content?: string;
  imageUrl?: string;
};

export interface TaskProps {
  taskId: number;
  name: string;
  priority: string;
  percentageScore: number;
  deadline: string;
  goal: {
    goalId: number;
    name: string;
  }
}

export interface GoalProps {
  goalId: number;
  name: string;
  colorCode: string;
}

const getErrorMessage = (err: unknown, fallback = '요청에 실패했어요.') =>
  err instanceof Error ? err.message : fallback;

export function GoalSection() {
  const [tasks, setTasks] = useState<TaskProps[]>();
  const [goals, setGoals] = useState<GoalProps[]>();

  const [selectedTask, setSelectedTask] = useState<TaskProps>()
  const [selectedCategory, setSelectedCategory] = useState<GoalProps>();
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCompletionOpen, setIsCompletionOpen] = useState(false);
  const [isRecordSettingsOpen, setIsRecordSettingsOpen] = useState(false);

  const [selectedFeedType, setSelectedFeedType] = useState<FeedType>(
    FeedType.TEXT,
  );

  const refreshGoalList = useCallback(async () => {
    const goalList = await fetchGoalList()
    setGoals(goalList)
  }, [])

  const refreshTaskList = useCallback(async () => {
    const list = await fetchTaskList();
    setTasks(list ?? []);
  }, [])

  // 최초 로드: 목표 목록
  useEffect(() => {
    const refreshPage = async () => {
      await refreshGoalList()
      await refreshTaskList()
    }

    refreshPage()
  }, []);

  // 목표 생성
  const handleAddTask = async (newGoal: CreateTaskInput) => {
    try {
      await createTask(newGoal);
      // TODO 목표 리스트 리프레시 코드 작성해야 함
    } catch (err: unknown) {
      alert(getErrorMessage(err, '목표 생성에 실패했어요.'));
    }
  };

  const handleDeleteCategory = async (goal: GoalProps) => {
    await deleteGoal(goal.goalId)
    await refreshGoalList()
    if (selectedCategory === goal) setSelectedCategory(undefined);
  };

  const handleDeleteTask = async (id: number) => {
    const backup = goals;
    setTasks((prev) => prev?.filter((g) => g.taskId !== id));
    try {
      await apiDeleteGoal(id);
    } catch (err: unknown) {
      setGoals(backup);
      alert(getErrorMessage(err, '목표 삭제에 실패했어요.'));
    }
  };

  // 인증 제출
  const handleSubmitCompletion = async (data: CompletionSubmitPayload) => {
    try {
      if (data.type === FeedType.TEXT) {
        await verifyCompletionText(selectedTask?.taskId ?? 0, data.content ?? '');
      } else {
        await verifyCompletionImage(selectedTask?.taskId ?? 0, data.imageUrl ?? '');
      }

      setSelectedFeedType(data.type);
      setIsCompletionOpen(false);

      await refreshTaskList()
    } catch (err: unknown) {
      alert(getErrorMessage(err, '완료 인증에 실패했어요.'));
    }
  };

  const handleRecordSettingsConfirm = async (settings: {
    isAddRecord: boolean;
    isPublic: boolean;
  }) => {
    try {
      await updateRecordSettings({
        taskId: selectedTask?.taskId ?? 0,
        isAddRecord: settings.isAddRecord,
        isPublic: settings.isPublic,
      });

      setIsCompletionOpen(true);
    } catch (err: unknown) {
      alert(getErrorMessage(err, '기록 설정 저장에 실패했어요.'));
    } finally {
      setIsRecordSettingsOpen(false);
    }
  };

  const filteredTasks =
    selectedCategory === undefined || selectedCategory.name === '전체'
      ? tasks
      : tasks?.filter((g) => g.goal.name === selectedCategory.name);

  return (
    <section className="flex h-screen w-full flex-col">
      <div className="sticky top-0 z-10 w-full bg-white">
        <GoalHeader
          isDeleteMode={isDeleteMode}
          onToggleDeleteMode={() => setIsDeleteMode((prev) => !prev)}
        />
        {
          goals && <GoalCategoryTabs
            categories={goals}
            isDeleteMode={isDeleteMode}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
            onDelete={handleDeleteCategory}
          />
        }
      </div>


          {/* 목표 리스트 */}
          <div className="w-full flex-1 overflow-y-auto bg-gradient-to-b from-[#FAF5FF] via-[#EFF6FF] to-[#E0E7FF]">
            <div className="flex flex-col items-center gap-4 pt-4 pb-32">
              { filteredTasks && filteredTasks.map((task) => (
                <TaskCard
                  key={task.taskId}
                  task={task}
                  isDeleteMode={isDeleteMode}
                  onDelete={handleDeleteTask}
                  onOpenModal={() => {
                    setIsRecordSettingsOpen(true)
                    setSelectedTask(task)
                  }}
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

      {isModalOpen && goals && (
        <AddTaskModal
          goals={goals}
          onClose={() => setIsModalOpen(false)}
          onAdd={async (goal: CreateTaskInput) => {
            await handleAddTask(goal);
            setIsModalOpen(false);
            await refreshTaskList()
          }}
          onAddCategory={async (category: CreateGoalInput) => {
            await createGoal(category);
            await refreshGoalList()
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
