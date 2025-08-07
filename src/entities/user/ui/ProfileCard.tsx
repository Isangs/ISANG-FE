'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil, Crown, Coins } from 'lucide-react';
import { EditProfileModal } from '@/widgets/EditProfileModal/EditProfileModal';
import { User } from '@/shared/types/user';

export function ProfileCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [user, setUser] = useState<User>({
    name: '김이상',
    nickname: '@isang_achiever',
    email: 'isang@example.com',
    bio: '매일 성장하는 개발자입니다!',
  });

  return (
    <>
      <Card className="w-full max-w-xl rounded-3xl bg-white/80 p-10 shadow-md">
        <CardContent className="flex items-center justify-center gap-6">
          {/* 이미지 */}
          <div className="relative h-20 w-20 rounded-full bg-gradient-to-tr from-purple-400 to-pink-400 p-1">
            <div className="h-full w-full overflow-hidden rounded-full bg-white">
              <Image
                src="/img/kakao.png"
                alt="프로필 이미지"
                width={80}
                height={80}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* 유저 정보 */}
          <div className="flex flex-2 flex-col gap-1 whitespace-nowrap">
            <div className="text-xl font-bold text-gray-900">{user.name}</div>
            <div className="h-8 text-sm font-semibold text-gray-500">
              {user.nickname}
            </div>
            <p className="text-sm text-gray-500">{user.bio}</p>

            <div className="mt-2 flex items-center gap-4">
              <div className="flex items-center gap-1 text-sm font-medium text-black">
                <Crown className="h-4 w-4 text-yellow-500" />
                <span>레벨 15</span>
              </div>
              <div className="flex items-center gap-1 text-sm font-medium text-black">
                <Coins className="h-4 w-4 text-purple-600" />
                <span>2847점</span>
              </div>
            </div>
          </div>

          {/* 연필 버튼 */}
          <Button
            size="icon"
            onClick={() => setIsModalOpen(true)}
            className="rounded-full bg-purple-100 text-purple-500 hover:bg-purple-200"
            variant="ghost"
          >
            <Pencil size={18} />
          </Button>
        </CardContent>
      </Card>

      {isModalOpen && (
        <EditProfileModal
          user={user}
          onClose={() => setIsModalOpen(false)}
          onSave={(updatedUser) => setUser(updatedUser)}
        />
      )}
    </>
  );
}
