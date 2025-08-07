'use client';

import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
type GoalDetailModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function GoalDetailModal({
  isOpen,
  onClose,
}: GoalDetailModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div
        className={cn(
          'relative w-[375px] rounded-t-[24px] bg-white/90 px-6 pt-6 pb-10 transition-transform duration-300',
        )}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>
        <h2 className="mb-4 text-lg font-bold text-gray-900">상세 그래프</h2>

        {/* 예시: 운동 */}
        <div className="mb-4 rounded-xl bg-[#fff0f5] p-4">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-orange-500" />
              <span className="text-sm font-medium text-gray-800">운동</span>
            </div>
            <span className="text-sm font-semibold text-purple-600">
              340/400점
            </span>
          </div>
          <div className="flex justify-between text-sm text-gray-700">
            {['월', '화', '수', '목', '금', '토', '일'].map((day, i) => (
              <div key={day} className="flex flex-col items-center">
                <span>{day}</span>
                <span className="mt-1 text-[13px] text-gray-600">
                  {[45, 52, 38, 62, 48, 55, 60][i]}점
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 이후 학습, 업무 등 반복적으로 구성 */}
      </div>
    </div>
  );
}
