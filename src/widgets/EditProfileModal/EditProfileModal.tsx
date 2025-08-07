'use client';

import { X } from 'lucide-react';
import Image from 'next/image';

export function EditProfileModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative max-h-[75vh] w-[343px] overflow-y-auto rounded-3xl bg-white/90 p-6">
        {/* 헤더 */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">프로필</h2>
          <button onClick={onClose}>
            <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </button>
        </div>

        {/* 프로필 이미지 */}
        <div className="flex flex-col items-center">
          <div className="rounded-full bg-gradient-to-r from-purple-400 to-pink-400 p-1">
            <div className="h-[88px] w-[88px] overflow-hidden rounded-full bg-white">
              <Image
                src="/img/kakao.png"
                alt="프로필"
                width={88}
                height={88}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <p className="mt-2 text-sm font-medium text-purple-600">사진 변경</p>
        </div>

        {/* 입력 폼들 */}
        <div className="mt-6 space-y-4">
          {/* 이름 */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              이름
            </label>
            <div className="rounded-xl border border-white/20 bg-white/70 p-3 backdrop-blur-sm">
              <span className="text-sm text-black">김이상</span>
            </div>
          </div>

          {/* 닉네임 */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              닉네임
            </label>
            <div className="rounded-xl border border-white/20 bg-white/70 p-3 backdrop-blur-sm">
              <span className="text-sm text-black">@isang_achiever</span>
            </div>
          </div>

          {/* 이메일 */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              이메일
            </label>
            <input
              type="email"
              placeholder="isang@example.com"
              className="w-full rounded-xl border border-white/20 bg-white/70 p-3 text-sm text-black placeholder-gray-400 backdrop-blur-sm"
            />
          </div>

          {/* 자기소개 */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              자기소개
            </label>
            <textarea
              rows={3}
              defaultValue="매일 성장하는 개발자입니다!"
              className="w-full resize-none rounded-xl border border-white/20 bg-white/70 p-3 text-sm text-black placeholder-gray-400 backdrop-blur-sm"
            />
          </div>
        </div>

        {/* 버튼들 */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={onClose}
            className="w-1/2 rounded-xl bg-gray-200 px-4 py-3 text-sm font-medium text-gray-700"
          >
            취소
          </button>
          <button className="ml-3 w-1/2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-3 text-sm font-medium text-white">
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
