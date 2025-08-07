'use client';

import { mockPosts } from './lib/mockPosts';
import PostCard from '@/entities/user/ui/PostCard';
export default function FeedList() {
  return (
    <div className="mt-4 mb-20 flex flex-col gap-4">
      {mockPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
