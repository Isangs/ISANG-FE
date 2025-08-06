'use Client';

import { GoalSection } from '@/features/goal/ui/GoalSection';
import { BottomNav } from '@/shared/ui/BottomNav';

export default function HomePage() {
  return (
    <main className="flex h-screen flex-col">
      <GoalSection />
      <BottomNav />
    </main>
  );
}
