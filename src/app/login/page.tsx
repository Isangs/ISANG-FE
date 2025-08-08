'use client';

import { KakaoLoginButton } from '@/features/auth/ui/KakaoLoginButton';
export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#FAF5FF] via-[#EFF6FF] to-[#E0E7FF] p-4">
      <div className="mb-[16rem] flex flex-col items-center">
        {/* 원형 그라디언트 */}
        <div className="mb-6 h-24 w-24 rounded-full bg-gradient-to-br from-purple-400 to-pink-400" />
        <h1 className="text-3xl font-bold">Isang</h1>
        <p className="mt-1 text-gray-500">더 나은 하루를 만들어보세요</p>
      </div>

      <KakaoLoginButton />
      {/* 약관 문구 */}
      <div>
        <p className="mxt-8 text-center text-[0.8rem] text-gray-500">
          로그인하면{' '}
          <span className="font-medium text-purple-500">이용약관</span> 및{' '}
          <span className="font-medium text-purple-500">개인정보 처리방침</span>
          에 동의하게 됩니다.
        </p>
      </div>
    </div>
  );
}
