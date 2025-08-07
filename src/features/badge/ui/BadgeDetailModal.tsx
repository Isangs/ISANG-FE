'use client';

import { X, Flame, Trophy, Star, Rocket, Crown, MapPin } from 'lucide-react';
import { BadgeCard } from './BadgeCard';
import { BadgeProgressCard } from './BadgeProgressCard';

export function BadgeDetailModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative h-[90vh] w-full max-w-sm overflow-hidden rounded-3xl bg-white px-5 pt-6 pb-10">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-7 right-6 text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>

        {/* 타이틀 */}
        <h2 className="mb-4 text-left text-[22px] font-bold text-gray-900">
          배지 상세 정보
        </h2>

        {/* 스크롤 영역 */}
        <div className="max-h-[calc(90vh-120px)] space-y-6 overflow-y-auto pb-4">
          {/* 완료된 배지들 */}
          <div className="flex flex-col gap-4">
            <BadgeCard
              icon={<Flame size={20} />}
              title="3일 연속"
              desc="3일 연속 할일 완료"
              gradientFrom="#FF512F"
              gradientTo="#DD2476"
            />
            <BadgeCard
              icon={<Trophy size={20} />}
              title="100점 돌파"
              desc="총 점수 100점 달성"
              gradientFrom="#FFD200"
              gradientTo="#F7971E"
            />
            <BadgeCard
              icon={<Star size={20} />}
              title="완벽한 주"
              desc="일주일 모든 할일 완료"
              gradientFrom="#DA22FF"
              gradientTo="#9733EE"
            />
            <BadgeCard
              icon={<Rocket size={20} />}
              title="초보 탈출"
              desc="레벨 10 달성"
              gradientFrom="#36D1DC"
              gradientTo="#5B86E5"
            />
          </div>

          {/* 진행 중 배지들 */}
          <div className="flex flex-col gap-4">
            <BadgeProgressCard
              icon={<Crown size={20} />}
              title="월간 왕"
              desc="한 달간 1위 유지"
              progress="16/30"
              progressRatio={16 / 30}
            />
            <BadgeProgressCard
              icon={<MapPin size={20} />}
              title="마스터"
              desc="레벨 50 달성"
              progress="24/50"
              progressRatio={24 / 50}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
