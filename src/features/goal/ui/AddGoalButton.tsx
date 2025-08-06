import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

type AddGoalButtonProps = {
  className?: string;
  onClick: () => void;
};

export function AddGoalButton({ className, onClick }: AddGoalButtonProps) {
  return (
    <>
      <button
        onClick={onClick}
        className={cn(
          'fixed right-4 bottom-24 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-purple-500 via-purple-600 to-pink-500',
          className,
        )}
      >
        <div className="absolute top-1 left-1 h-14 w-14 rounded-full bg-gradient-to-br from-white/20 to-transparent" />

        <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-white/60" />

        <Plus className="relative z-10 h-6 w-6 text-white" strokeWidth={3} />
      </button>
    </>
  );
}
