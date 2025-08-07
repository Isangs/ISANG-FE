'use client';

import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';
import Image from 'next/image';

interface PostCardProps {
  post: {
    author: string;
    timeAgo: string;
    badge: string;
    imageUrl: string;
    likeCount: number;
    commentCount: number;
  };
}

export default function PostCard({ post }: PostCardProps) {
  const { author, timeAgo, badge, imageUrl, likeCount, commentCount } = post;

  return (
    <div className="flex w-[343px] flex-col gap-4 rounded-2xl bg-white/70 p-4 shadow-lg backdrop-blur">
      <div className="flex items-center gap-3">
        {/* 원형 그라데이션 테두리 */}
        <div className="relative h-12 w-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 p-[2px]">
          <div className="h-full w-full rounded-full bg-white">
            <Image
              src="/kakao.png"
              alt="avatar"
              width={44}
              height={44}
              className="h-full w-full rounded-full object-cover"
            />
          </div>
        </div>

        {/* 이름 / 시간 */}
        <div>
          <p className="text-sm font-semibold text-gray-800">{author}</p>
          <p className="text-sm text-gray-500">{timeAgo}</p>
        </div>
      </div>

      {/* 태그 */}
      <div className="inline-flex w-fit items-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1 text-sm font-medium text-white">
        {badge}
      </div>

      {/* 이미지 */}
      <div className="h-[192px] w-full overflow-hidden rounded-2xl">
        <Image
          src={imageUrl}
          alt="post"
          width={311}
          height={192}
          className="h-full w-full object-cover"
        />
      </div>

      {/* 버튼 */}
      <div className="flex items-center justify-between border-t border-gray-200 pt-3">
        <div className="flex items-center gap-6">
          <button className="flex items-center gap-2 text-purple-600">
            <Heart className="h-4 w-4" />
            <span className="text-sm font-medium">{likeCount}</span>
          </button>
          <button className="flex items-center gap-2 text-gray-500">
            <MessageCircle className="h-4 w-4" />
            <span className="text-sm font-medium">{commentCount}</span>
          </button>
        </div>
        <button className="text-gray-500">
          <Share2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
