import { BottomNav } from '../ui/BottomNav';
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex h-screen flex-col overflow-hidden">
      {children}
      <BottomNav />
    </main>
  );
}
