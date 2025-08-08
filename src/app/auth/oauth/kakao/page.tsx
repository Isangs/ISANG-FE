'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function KakaoCallbackPage() {
  const sp = useSearchParams();

  useEffect(() => {
    const code = sp.get('code');

    if (!code) {
      window.location.replace('/login');
      return;
    }

    window.location.href = `/api/auth/kakao?code=${encodeURIComponent(code)}&redirect=/mypage`;
  }, [sp]);

  return <div className="p-6 text-gray-600">로그인 처리 중…</div>;
}
