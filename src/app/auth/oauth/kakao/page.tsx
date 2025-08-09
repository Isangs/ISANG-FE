'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function RedirectComponent(){
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');

    if (!code) {
      window.location.replace('/login');
      return;
    }

    window.location.href = `/api/auth/kakao?code=${encodeURIComponent(code)}&redirect=/mypage`;
  }, [searchParams]);

  return <div className="p-6 text-gray-600">로그인 처리 중…</div>
}

export default function KakaoCallbackPage() {
  return (
    <Suspense>
      <RedirectComponent />
    </Suspense>
  )
}
