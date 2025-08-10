'use client';

import { Post } from '@/entities/post/model/post';
import dayjs from 'dayjs';
import { Heart, Share2, ThumbsUp } from 'lucide-react';
import Image from 'next/image';

interface PostCardProps {
  post: Post;
  handleLikeClick: (feedId: number) => void;
  handleHeartClick: (feedId: number) => void;
}

export default function PostCard({
  post,
  handleLikeClick,
  handleHeartClick,
}: PostCardProps) {
  const wrappedHandleLikeClick = () => {
    handleLikeClick(post.id);
  };

  const wrappedHandleHeartClick = () => {
    handleHeartClick(post.id);
  };

  return (
    <div className="flex w-full flex-col gap-4 rounded-2xl bg-white/70 p-4 shadow-lg backdrop-blur">
      <div className="flex items-center gap-3">
        {/* 원형 그라데이션 테두리 */}
        <div className="relative h-12 w-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 p-[2px]">
          <div className="h-full w-full rounded-full bg-white">
            <Image
              src={post.user.profileImageUrl || '/default-avatar.png'}
              alt="avatar"
              width={44}
              height={44}
              className="h-full w-full rounded-full object-cover"
            />
          </div>
        </div>

        {/* 이름 / 시간 */}
        <div>
          <p className="text-sm font-semibold text-gray-800">
            {post.user.name}
          </p>
          <p className="text-sm text-gray-500">
            {dayjs(
              new Date(
                post.createdAt[0],
                post.createdAt[1] - 1,
                post.createdAt[2],
                post.createdAt[3],
                post.createdAt[4],
                post.createdAt[5],
              ),
            ).format('YYYY년 MM월 DD일')}
          </p>
        </div>
      </div>

      {/* 태그 */}
      <div className="inline-flex w-fit items-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1 text-sm font-medium text-white">
        {post.taskMessage}
      </div>

      {/* 본문 내용 추가 */}
      {post.content && (
        <p className="text-sm whitespace-pre-wrap text-gray-700">
          {post.content}
        </p>
      )}
      {/* 이미지 */}
      {post.profileImageUrl && (
        <div className="h-[192px] w-full overflow-hidden rounded-2xl">
          <Image
            src={post.profileImageUrl}
            alt="post"
            width={311}
            height={192}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      {/* 버튼 */}
      <div className="flex items-center justify-between border-t border-gray-200 pt-3">
        <div className="flex items-center gap-6">
          <button
            onClick={wrappedHandleHeartClick}
            className="flex items-center gap-2 text-purple-600"
          >
            <Heart
              className="h-4 w-4"
              fill={post.isPostHearted ? 'currentColor' : 'none'}
            />
            <span className="text-sm font-medium">{post.hearts}</span>
          </button>
          <button
            onClick={wrappedHandleLikeClick}
            className="flex items-center gap-2 text-gray-500"
          >
            <ThumbsUp
              className="h-4 w-4"
              fill={post.isPostHearted ? 'currentColor' : 'none'}
            />
            <span className="text-sm font-medium">{post.likes}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
