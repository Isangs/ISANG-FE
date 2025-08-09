'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { CompletionHeader } from './CompletionHeader';
import CompletionProofForm from './CompletionProofForm';
import { FeedType } from '@/shared/store/post';

// ✅ GoalSection과 동일한 페이로드 시그니처로 변경
export type CompletionSubmitPayload = {
  type: FeedType; // 'TEXT' | 'IMAGE'
  content?: string; // TEXT일 때
  imageUrl?: string; // IMAGE일 때 (업로드 후 URL)
};

type CompletionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CompletionSubmitPayload) => void; // ⬅️ 변경
};

export default function CompletionModal({
  isOpen,
  onClose,
  onSubmit,
}: CompletionModalProps) {
  const [visible, setVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      const timer = setTimeout(() => setVisible(true), 10);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
      const timer = setTimeout(() => setIsMounted(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isMounted) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#3E0063] to-[#002E73] transition-all duration-300 ease-out ${
        visible ? 'opacity-100' : 'opacity-0'
      } `}
    >
      <div
        className={`relative h-full w-full max-w-sm p-4 transition-all duration-300 ease-out ${
          visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        } `}
      >
        <button
          onClick={onClose}
          className="absolute top-8 left-8 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex flex-col items-center gap-6 rounded-3xl p-4">
          <CompletionHeader />
          {/* ⬇️ 폼에서 payload를 그대로 올려보내게 연결 */}
          <CompletionProofForm onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
}
