import MainLayout from '@/shared/layout/MainLayout';
import { ProfileCard } from '@/entities/user/ui/ProfileCard';
import GoalScoreList from '@/features/goal/ui/GoalScoreList';
import WeeklyChart from '@/widgets/WeeklyChart/WeeklyChart';
import CompletionCircleList from '@/widgets/CompletionCircleList/CompletionCircleList';
import BadgeGallery from '@/widgets/BadgeGallery/BadgeGallery';
import ActivityFeed from '@/widgets/ActivityFeed/ActivityFeed';
import RecordList from '@/widgets/RecordList/ RecordList';
import { Settings } from 'lucide-react'; // 설정 아이콘

export default function MyPage() {
  return (
    <MainLayout>
      <div className="flex items-center justify-between bg-white px-6 py-6">
        <h2 className="text-lg font-semibold text-gray-900">내 정보</h2>
        <Settings className="h-5 w-5 text-gray-500" />
      </div>

      <div className="to-[#E0E7FF]mx-auto flex max-w-screen-sm flex-col gap-6 bg-gradient-to-b from-[#FAF5FF] via-[#EFF6FF] px-4 py-6">
        <ProfileCard />
        <GoalScoreList />
        <WeeklyChart />
        <CompletionCircleList />
        <BadgeGallery />
        <RecordList />
        <ActivityFeed />
      </div>
    </MainLayout>
  );
}
