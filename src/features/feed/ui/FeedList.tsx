'use client';

import { usePostStore } from '@/shared/store/post';
import PostCard from '@/entities/user/ui/PostCard';
export default function FeedList() {
  const posts = usePostStore((state) => state.posts);
  console.log('🧾 피드에 보이는 posts:', posts);
  return (
    <div className="mt-4 mb-20 flex flex-col gap-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
