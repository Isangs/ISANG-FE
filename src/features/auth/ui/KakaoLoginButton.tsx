'use client';

import Image from 'next/image';
import Link from 'next/link';

export function KakaoLoginButton() {
  return (
    <Link
      href="https://api.isang.site/auth/oauth/kakao"
      className="mb-6 flex h-[4rem] w-[21rem] items-center justify-center rounded-xl bg-yellow-400 p-4 font-medium text-black transition hover:bg-yellow-300"
    >
      <Image src="/kakao.png" alt="Kakao" width={20} height={20} />
      <span className="ml-2">Kakao로 시작하기</span>
    </Link>
  );
}
