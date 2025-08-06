'use client';

import { Pencil, Camera, Mic } from 'lucide-react';

export default function CompletionProofForm() {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="w-full max-w-[345px] rounded-2xl bg-white/10 p-7 py-8 backdrop-blur">
        {/* 섹션 타이틀 */}
        <h3 className="mb-4 text-center text-sm font-semibold text-white">
          완료 증명 제출
        </h3>

        {/* 버튼 3개 */}
        <div className="mb-4 flex justify-between gap-2">
          <button className="flex h-[77px] w-full flex-col items-center justify-center gap-1 rounded-xl bg-white text-purple-600 shadow">
            <Pencil className="h-5 w-5" />
            <span className="text-xs font-semibold">텍스트</span>
          </button>
          <button className="flex h-[77px] w-full flex-col items-center justify-center gap-1 rounded-xl bg-white/20 text-white">
            <Camera className="h-5 w-5" />
            <span className="text-xs font-medium">사진</span>
          </button>
          <button className="flex h-[77px] w-full flex-col items-center justify-center gap-1 rounded-xl bg-white/20 text-white">
            <Mic className="h-5 w-5" />
            <span className="text-xs font-medium">음성</span>
          </button>
        </div>

        {/* 텍스트 입력창 */}
        <div className="h-[116px] w-full rounded-2xl bg-white/20 p-4 backdrop-blur-sm">
          <textarea
            className="h-full w-full resize-none bg-transparent text-sm text-white placeholder-white/60 outline-none"
            placeholder="완료 내용을 입력하세요..."
          />
        </div>
      </div>
    </div>
  );
}
