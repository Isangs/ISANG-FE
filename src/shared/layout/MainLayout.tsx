import { BottomNav } from '../ui/BottomNav';
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background min-h-screen pb-[81px]">
      {children}
      <BottomNav />
    </div>
  );
}
