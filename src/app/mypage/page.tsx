import MainLayout from '@/shared/layout/MainLayout';
import { ProfileCard } from '@/entities/user/ui/ProfileCard';
import GoalScoreList from '@/features/goal/ui/GoalScoreList';
import { WeeklyChart } from '@/widgets/WeeklyChart/WeeklyChart';
import CompletionCircleList from '@/widgets/CompletionCircleList/CompletionCircleList';
import BadgeGallery from '@/features/badge/ui/BadgeGallery';
import ActivityFeed from '@/widgets/ActivityFeed/ActivityFeed';
import RecordList from '@/widgets/RecordList/ RecordList';
import { Settings } from 'lucide-react';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function MyPage() {
  // const cookieStore = await cookies();
  // const accessToken = cookieStore.get('accessToken');
  //
  // if (!accessToken) {
  //   redirect('/login');
  // }

  return (
    <MainLayout>
      {/* 상단 고정 영역 */}
      <div className="sticky top-0 z-10 flex items-center justify-between bg-white px-6 py-6">
        <h2 className="text-xl font-semibold text-gray-900">내 정보</h2>
        <Settings className="h-5 w-5 text-gray-500" />
      </div>

      {/* 스크롤 가능 영역 */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto flex flex-col gap-6 bg-gradient-to-b from-[#FAF5FF] via-[#EFF6FF] to-[#E0E7FF] px-4 py-6">
          <ProfileCard />
          <GoalScoreList />
          <WeeklyChart />
          <CompletionCircleList />
          <BadgeGallery />
          <RecordList />
          <ActivityFeed />
        </div>
      </div>
    </MainLayout>
  );
}
