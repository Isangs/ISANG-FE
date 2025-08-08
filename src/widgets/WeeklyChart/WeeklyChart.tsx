'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  ResponsiveContainer,
} from 'recharts';
import axios from 'axios';

interface WeeklyChartProps {
  goalId: number;
  maxScore: number;
  name: string;
  totalScore: number;
  dayList: {
    day: string;
    score: number;
  }[];
}

export function WeeklyChart() {
  const [chartType, setChartType] = useState<'line' | 'area'>('line');
  const [weeklyChartData, setWeeklyChartData] = useState<WeeklyChartProps[]>([]);

  useEffect(() => {
    const fetchWeeklyChart = async () => {
      const { data } = await axios.get('/api/goal/weekly/achievement')
      setWeeklyChartData(data)
    }

    fetchWeeklyChart()
  }, []);

  return (
    <div className="w-full max-w-xl rounded-3xl bg-white/80 p-6 shadow-md">
      {/* 제목 & 버튼 */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">주간 성과 차트</h2>
        <div className="flex gap-2">
          <Button
            className={`h-6 rounded-full px-3 py-1 text-xs ${
              chartType === 'line'
                ? 'bg-purple-500 text-white hover:bg-purple-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setChartType('line')}
          >
            선형
          </Button>
          <Button
            className={`h-6 rounded-full px-3 py-1 text-xs ${
              chartType === 'area'
                ? 'bg-purple-500 text-white hover:bg-purple-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setChartType('area')}
          >
            영역
          </Button>
        </div>
      </div>

      {
        weeklyChartData.map(item =>
          <div key={item.goalId} className="mb-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-800">{item.name}</span>
              <span className="text-sm text-gray-600">{item.totalScore}점</span>
            </div>
            <div className="h-32 w-full">
              <ResponsiveContainer width="100%" height="100%">
                {chartType === 'line' ? (
                  <LineChart data={item.dayList.map(day => { return { value: day.score }})}>
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#a855f7"
                      strokeWidth={3}
                      dot={{ r: 3, fill: '#a855f7', stroke: '#a855f7' }}
                      activeDot={{ r: 6, fill: '#a855f7', stroke: '#a855f7' }}
                    />
                  </LineChart>
                ) : (
                  <AreaChart data={item.dayList.map(day => { return { value: day.score }})}>
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#a855f7"
                      fill="#a855f7"
                      strokeWidth={3}
                    />
                  </AreaChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>)
      }
    </div>
  );
}
