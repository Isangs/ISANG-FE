'use client';

import { Button } from '@/components/ui/button';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const exerciseData = [
  { value: 50 },
  { value: 65 },
  { value: 40 },
  { value: 90 },
  { value: 60 },
  { value: 70 },
  { value: 80 },
];

const studyData = [
  { value: 40 },
  { value: 55 },
  { value: 70 },
  { value: 60 },
  { value: 75 },
  { value: 50 },
  { value: 60 },
];

export function WeeklyChart() {
  return (
    <div className="w-full max-w-xl rounded-3xl bg-white/80 p-6 shadow-md">
      {/* 제목 & 버튼 */}
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

      {/* 운동 */}
      <div className="mb-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-800">운동</span>
          <span className="text-sm text-gray-600">340점</span>
        </div>
        <div className="h-32 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={exerciseData}>
              <Line
                type="monotone"
                dataKey="value"
                stroke="#a855f7"
                strokeWidth={3}
                dot={{ r: 3, fill: '#a855f7', stroke: '#a855f7' }}
                activeDot={{ r: 6, fill: '#a855f7', stroke: '#a855f7' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 학습 */}
      <div className="rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-800">학습</span>
          <span className="text-sm text-gray-600">288점</span>
        </div>
        <div className="h-32 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={studyData}>
              <Line
                type="monotone"
                dataKey="value"
                stroke="#a855f7"
                strokeWidth={3}
                dot={{ r: 3, fill: '#a855f7', stroke: '#a855f7' }}
                activeDot={{ r: 6, fill: '#a855f7', stroke: '#a855f7' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
