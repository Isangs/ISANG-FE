'use client';

import {
  ResponsiveContainer,
  LineChart,
  Line,
  YAxis,
  Tooltip,
  CartesianGrid,
  XAxis,
} from 'recharts';

const days = ['월', '화', '수', '목', '금', '토', '일'];

type Goal = {
  name: string;
  score: number;
  total: number;
  colorFrom: string;
  colorTo: string;
  colorHex: string;
  daily: number[];
};

export function GoalDetailCard({ goal }: { goal: Goal }) {
  const chartData = days.map((day, i) => ({
    day,
    value: goal.daily[i],
  }));

  return (
    <div className="mb-6 rounded-2xl bg-gradient-to-br from-[#FAF5FF] to-[#FDF2F8] p-4">
      {/* 헤더 */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className={`h-4 w-4 rounded-full bg-gradient-to-r ${goal.colorFrom} ${goal.colorTo}`}
          />
          <span className="text-sm font-medium text-gray-800">{goal.name}</span>
        </div>
        <span className="text-sm font-bold text-purple-600">
          {goal.score}/{goal.total}점
        </span>
      </div>

      {/* 그래프 */}
      <div className="h-32 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 10, bottom: 20, right: 22 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="day"
              tick={false}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: '#6b7280' }}
              domain={[0, 100]}
              tickCount={5}
              width={30}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                fontSize: '12px',
              }}
              labelStyle={{ fontWeight: 'bold', color: '#6b7280' }}
              formatter={(value) => [`${value}점`, '']}
              labelFormatter={(label) => `요일: ${label}`}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={goal.colorHex}
              strokeWidth={3}
              dot={{ r: 4, fill: goal.colorHex }}
              activeDot={{ r: 6, strokeWidth: 2, fill: goal.colorHex }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 요일 + 점수 라벨 */}
      <div className="mt-3 grid grid-cols-7 gap-y-1 text-center text-xs text-gray-700">
        {chartData.map(({ day, value }, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="font-medium">{day}</div>
            <div className="text-[11px] text-gray-500">{value}점</div>
          </div>
        ))}
      </div>
    </div>
  );
}
