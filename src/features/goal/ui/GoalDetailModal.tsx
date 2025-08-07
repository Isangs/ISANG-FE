'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { GoalDetailCard } from './GoalDetailCard';

type Goal = {
  name: string;
  score: number;
  total: number;
  colorFrom: string;
  colorTo: string;
  colorHex: string;
  daily: number[];
};

const goals: Goal[] = [
  {
    name: '운동',
    score: 340,
    total: 400,
    colorFrom: 'from-orange-400',
    colorTo: 'to-red-500',
    colorHex: '#f97316',
    daily: [45, 52, 38, 62, 48, 55, 60],
  },
  {
    name: '학습',
    score: 288,
    total: 400,
    colorFrom: 'from-blue-400',
    colorTo: 'to-indigo-500',
    colorHex: '#3b82f6',
    daily: [30, 42, 55, 48, 62, 45, 52],
  },
  {
    name: '업무',
    score: 360,
    total: 400,
    colorFrom: 'from-green-400',
    colorTo: 'to-emerald-500',
    colorHex: '#10b981',
    daily: [65, 72, 58, 78, 70, 82, 75],
  },
  {
    name: '건강',
    score: 272,
    total: 400,
    colorFrom: 'from-cyan-400',
    colorTo: 'to-teal-500',
    colorHex: '#06b6d4',
    daily: [25, 35, 42, 38, 45, 40, 48],
  },
  {
    name: '개인성장',
    score: 220,
    total: 400,
    colorFrom: 'from-purple-400',
    colorTo: 'to-pink-500',
    colorHex: '#a855f7',
    daily: [20, 28, 32, 35, 38, 42, 45],
  },
];

export default function GoalDetailModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [visible, setVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      const timer = setTimeout(() => setVisible(true), 10);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
      const timer = setTimeout(() => {
        setIsMounted(false);
      }, 300); // 애니메이션 시간과 동일
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = () => {
    onClose();
  };

  if (!isMounted) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 px-4 pt-10 backdrop-blur-sm">
      <div
        className={`max-h-[650px] w-full max-w-sm overflow-y-auto rounded-3xl bg-white/90 p-6 shadow-lg transition-all duration-300 ease-out ${
          visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
      >
        {/* 상단 */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">상세 그래프</h2>
          <button onClick={handleClose}>
            <X className="h-5 w-5 text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        {/* 목표 카드 리스트 */}
        {goals.map((goal) => (
          <GoalDetailCard key={goal.name} goal={goal} />
        ))}
      </div>
    </div>
  );
}
