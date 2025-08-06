'use client';

import { Check, X } from 'lucide-react';

const activities = [
  {
    icon: <Check size={16} className="text-white" />,
    title: '30분 조깅 완료',
    time: '2시간 전',
    description: '한강공원에서 3km 달리기 완료!',
  },
  {
    icon: <Check size={16} className="text-white" />,
    title: '영어 단어 50개 암기',
    time: '4시간 전',
    description: '오늘 새로운 단어 50개 외웠어요.',
  },
  {
    icon: <Check size={16} className="text-white" />,
    title: '프로젝트 회의 참석',
    time: '어제',
    description: '팀 회의에서 새로운 아이디어 제안',
  },
];

export default function ActivityFeed() {
  return (
    <div className="w-full max-w-xl rounded-3xl bg-white/80 p-6 shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">최근 활동</h2>
        <button className="text-sm font-medium text-purple-600">
          전체 보기
        </button>
      </div>

      <div className="space-y-3 overflow-y-auto pr-1">
        {activities.map((activity, idx) => (
          <div
            key={idx}
            className="flex w-full items-start justify-between rounded-2xl bg-white/50 p-3 shadow-sm"
          >
            <div className="flex">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-purple-400 to-pink-400">
                {activity.icon}
              </div>
              <div className="ml-3 space-y-1">
                <p className="text-sm font-medium text-gray-900">
                  {activity.title}
                </p>
                <p className="text-sm text-gray-500">{activity.time}</p>
                <p className="text-xs text-gray-400 italic">{`"${activity.description}"`}</p>
              </div>
            </div>

            <button className="mt-1 ml-2 h-5 w-5 text-gray-400 hover:text-gray-700">
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
