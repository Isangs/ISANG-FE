'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function KakaoCallbackPage() {
  const sp = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const code = sp.get('code');
    if (!code) return router.replace('/login');

    (async () => {
      const res = await fetch('/api/auth/kakao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      if (!res.ok) {
        console.log(
          'token exchange failed',
          await res.json().catch(() => ({})),
        );
        return router.replace('/login');
      }

      router.replace('/mypage');
    })();
  }, [sp, router]);

  return <div>로그인 처리 중…</div>;
}
