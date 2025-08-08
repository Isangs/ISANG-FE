import Image from 'next/image';
export function KakaoLoginButton() {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

  return (
    <button
      onClick={() => (window.location.href = `${API_BASE}/auth/kakao/login`)}
      className="mb-6 flex h-[4rem] w-[21rem] items-center justify-center rounded-xl bg-yellow-400 p-4 font-medium text-black transition hover:bg-yellow-300"
    >
      <Image src="/kakao.png" alt="Kakao" width={20} height={20} />
      <span className="ml-2">Kakao로 시작하기</span>
    </button>
  );
}
