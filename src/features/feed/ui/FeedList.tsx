'use client';

import { usePostStore } from '@/shared/store/post';
import PostCard from '@/entities/user/ui/PostCard';

type Props = {
  keyword?: string;
};

export default function FeedList({ keyword = '' }: Props) {
  const posts = usePostStore((state) => state.posts);

  // keyword가 있을 때만 필터링
  const isSearching = keyword.trim() !== '';
  const filteredPosts = isSearching
    ? posts.filter((post) =>
        post.content.toLowerCase().includes(keyword.toLowerCase()),
      )
    : posts;

  const isEmpty = isSearching && filteredPosts.length === 0;

  return (
    <div className="mt-4 mb-20 flex flex-col gap-4">
      {isEmpty ? (
        <div className="flex h-[300px] flex-col items-center justify-center text-gray-500">
          <div className="mb-4">
            <svg
              className="h-10 w-10 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M16.65 16.65a7 7 0 1114 0 7 7 0 01-14 0z"
              />
            </svg>
          </div>
          <p className="text-lg font-medium">검색 결과가 없습니다</p>
          <p className="text-sm">다른 키워드로 검색해보세요</p>
        </div>
      ) : (
        filteredPosts.map((post) => <PostCard key={post.id} post={post} />)
      )}
    </div>
  );
}
