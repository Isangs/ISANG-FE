'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';

export function WeeklyChart() {
  return (
    <div className="w-full max-w-sm rounded-3xl bg-white/80 p-6 shadow-md">
      {/* Title + Toggle Buttons */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">주간 성과 차트</h2>
        <div className="flex gap-2">
          <Button className="h-6 rounded-full bg-purple-500 px-3 py-1 text-xs text-white hover:bg-purple-600">
            선형
          </Button>
          <Button className="h-6 rounded-full bg-gray-200 px-3 py-1 text-xs text-gray-700 hover:bg-gray-300">
            영역
          </Button>
        </div>
      </div>

      {/* Chart Card 1 */}
      <div className="mb-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-800">운동</span>
          <span className="text-sm text-gray-600">340점</span>
        </div>
        <Image
          src="/img/DIV-167.svg"
          alt="운동 차트"
          width={263}
          height={128}
          className="h-32 w-full object-contain"
        />
      </div>

      {/* Chart Card 2 */}
      <div className="rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-800">학습</span>
          <span className="text-sm text-gray-600">288점</span>
        </div>
        <Image
          src="/img/DIV-177.svg"
          alt="학습 차트"
          width={263}
          height={128}
          className="h-32 w-full object-contain"
        />
      </div>
    </div>
  );
}
