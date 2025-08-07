'use client';

type CompletionFooterProps = {
  isActive: boolean;
};

export default function CompletionFooter({ isActive }: CompletionFooterProps) {
  return (
    <div className="mt-4 flex w-full justify-center">
      <button
        disabled={!isActive}
        className={`flex h-[3.125rem] w-[20.4375rem] items-center justify-center rounded-[1rem] bg-gradient-to-r from-[#4ADE80] to-[#10B981] font-semibold text-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] transition-opacity ${
          isActive ? 'opacity-100' : 'opacity-50'
        }`}
      >
        완료하기
      </button>
    </div>
  );
}
