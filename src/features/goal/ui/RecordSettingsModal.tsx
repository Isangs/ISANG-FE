'use client';

import { useEffect, useState } from 'react';
import { Switch } from '@/components/ui/switch';

interface RecordSettingsModalProps {
  onClose: () => void;
}

export function RecordSettingsModal({ onClose }: RecordSettingsModalProps) {
  const [recordEnabled, setRecordEnabled] = useState(true);
  const [isPrivate, setIsPrivate] = useState(true);

  const [visible, setVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // mount & transition 처리
  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  // unmount 전에 애니메이션 실행
  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      setIsMounted(false);
      onClose();
    }, 300); // 애니메이션 시간과 일치
  };

  if (!isMounted) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div
        className={`w-[327px] max-w-sm rounded-[24px] bg-white/90 p-6 shadow-lg transition-all duration-300 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
      >
        {/* 제목 */}
        <div className="mb-6 text-center text-lg font-bold text-gray-800">
          기록 설정
        </div>

        {/* 기록 추가 */}
        <div className="mb-6 flex items-center justify-between rounded-[16px] bg-white/70 px-4 py-3 backdrop-blur-sm">
          <div>
            <p className="text-sm font-semibold text-gray-800">기록 추가</p>
            <p className="text-xs text-gray-500">완료 기록을 저장합니다</p>
          </div>
          <Switch
            checked={recordEnabled}
            onCheckedChange={setRecordEnabled}
            className="bg-[#d1d5db] data-[state=checked]:bg-[#a855f7]"
          />
        </div>

        {/* 공개 범위 */}
        <div className="mb-6 flex items-center justify-between rounded-[16px] bg-white/70 px-4 py-3 backdrop-blur-sm">
          <div>
            <p className="text-sm font-semibold text-gray-800">공개 범위</p>
            <p className="text-xs text-gray-500">
              {isPrivate ? '나만 보기' : '모두 보기'}
            </p>
          </div>
          <Switch
            checked={!isPrivate}
            onCheckedChange={() => setIsPrivate((prev) => !prev)}
            className="bg-[#d1d5db] data-[state=checked]:bg-[#a855f7]"
          />
        </div>

        {/* 하단 버튼 */}
        <div className="flex gap-3">
          <button
            onClick={handleClose}
            className="w-1/2 rounded-[16px] bg-gray-200 py-3 text-sm font-medium text-gray-700"
          >
            취소
          </button>
          <button
            onClick={handleClose}
            className="w-1/2 rounded-[16px] bg-gradient-to-r from-purple-500 to-pink-500 py-3 text-sm font-medium text-white"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
