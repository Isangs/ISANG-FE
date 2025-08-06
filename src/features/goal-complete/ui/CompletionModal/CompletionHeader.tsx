import { Target } from 'lucide-react';

export function CompletionHeader() {
  return (
    <div className="mt-10 flex flex-col items-center">
      {/* 원형 아이콘 */}
      <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-purple-400">
        <Target className="h-10 w-10 text-white" />
      </div>

      {/* 타이틀 */}
      <h2 className="text-2xl font-bold text-white">30분 조깅하기</h2>

      {/* 서브 타이틀 */}
      <p className="mt-2 text-sm text-white/80">집중해서 완료해보세요!</p>
    </div>
  );
}
