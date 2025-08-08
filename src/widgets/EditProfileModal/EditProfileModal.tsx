'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';
import { updateUser } from '@/shared/api/user';
import { User } from '@/shared/types/user';

type Props = {
  user: User;
  onClose: () => void;
  onSave: (updatedUser: User) => void;
};

export function EditProfileModal({ user, onClose, onSave }: Props) {
  const [form, setForm] = useState(user);
  const [previewUrl, setPreviewUrl] = useState(user.profileUrl); // 초기 이미지
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10); // show trigger
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsMounted(false);
      onClose();
    }, 300); // match transition time
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    // 1. 유저 정보 업데이트
    await updateUser(form);

    // 2. 프로필 이미지도 서버에 따로 업로드 요청 보내야 함 (multipart/form-data)
    // if (imageFile) {
    //   const formData = new FormData();
    //   formData.append('image', imageFile);
    //   await fetch('/api/user/upload-image', {
    //     method: 'POST',
    //     body: formData,
    //   });
    // }

    onSave(form);
    onClose();
  };

  if (!isMounted) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className={`relative max-h-[75vh] w-[343px] overflow-y-auto rounded-3xl bg-white/90 p-6 transition-all duration-300 ${
          isVisible
            ? 'translate-y-0 scale-100 opacity-100'
            : 'translate-y-4 scale-95 opacity-0'
        }`}
      >
        {/* 헤더 */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">프로필</h2>
          <button onClick={handleClose}>
            <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </button>
        </div>

        {/* 이미지 */}
        <div className="flex flex-col items-center">
          <label className="cursor-pointer">
            <div className="rounded-full bg-gradient-to-r from-purple-400 to-pink-400 p-1">
              <div className="h-[88px] w-[88px] overflow-hidden rounded-full bg-white">
                <Image
                  src={previewUrl}
                  alt="프로필"
                  width={88}
                  height={88}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
            <p className="mt-2 text-center text-sm font-medium text-purple-600">
              사진 변경
            </p>
          </label>
        </div>

        {/* 입력 폼 */}
        <div className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              이름
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-xl border bg-white/70 p-3 text-sm text-black placeholder-gray-400 backdrop-blur-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              닉네임
            </label>
            <input
              name="nickname"
              value={form.nickname}
              onChange={handleChange}
              className="w-full rounded-xl border bg-white/70 p-3 text-sm text-black placeholder-gray-400 backdrop-blur-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              이메일
            </label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-xl border bg-white/70 p-3 text-sm text-black placeholder-gray-400 backdrop-blur-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              자기소개
            </label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows={3}
              className="w-full resize-none rounded-xl border bg-white/70 p-3 text-sm text-black placeholder-gray-400 backdrop-blur-sm"
            />
          </div>
        </div>

        {/* 버튼 */}
        <div className="mt-6">
          <button
            onClick={handleSubmit}
            className="w-full rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-3 text-center text-sm font-semibold text-white transition hover:brightness-110 active:scale-95"
          >
            저장하기
          </button>
        </div>
      </div>
    </div>
  );
}
