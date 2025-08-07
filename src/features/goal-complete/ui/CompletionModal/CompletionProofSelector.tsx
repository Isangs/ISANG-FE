'use client';

import { FeedType } from '@/shared/store/post';
import { Pencil, Camera } from 'lucide-react';

type Props = {
  selectedType: FeedType;
  onSelect: (type: FeedType) => void;
};

export default function CompletionProofSelector({
  selectedType,
  onSelect,
}: Props) {
  return (
    <div className="mb-4 flex justify-between gap-2">
      <button
        onClick={() => onSelect(FeedType.TEXT)}
        className={`flex h-[77px] w-full flex-col items-center justify-center gap-1 rounded-xl ${
          selectedType === FeedType.TEXT
            ? 'bg-white text-purple-600'
            : 'bg-white/20 text-white'
        } shadow`}
      >
        <Pencil className="h-5 w-5" />
        <span className="text-xs font-semibold">텍스트</span>
      </button>
      <button
        onClick={() => onSelect(FeedType.IMAGE)}
        className={`flex h-[77px] w-full flex-col items-center justify-center gap-1 rounded-xl ${
          selectedType === FeedType.IMAGE
            ? 'bg-white text-purple-600'
            : 'bg-white/20 text-white'
        } shadow`}
      >
        <Camera className="h-5 w-5" />
        <span className="text-xs font-semibold">사진</span>
      </button>
    </div>
  );
}
