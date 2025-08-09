import { serverInstance } from '@/lib/axios';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Post } from '@/entities/post/model/post';

export enum FeedType {
  TEXT,
  IMAGE,
}

interface PostStore {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  addPost: (post: Post, feedType: FeedType) => void;
}

export const usePostStore = create(
  persist<PostStore>(
    (set) => ({
      posts: [],
      setPosts: (posts) => set({ posts }),
      addPost: async (post, feedType) => {
        const url = `/feed/${feedType === FeedType.IMAGE ? 'image' : 'text'}/${post.id}`;
        const { data }: { data: Post[] } = await serverInstance.post(url);

        set({
          posts: data,
        });
      },
    }),
    {
      name: 'post-storage', // localStorage에 저장될 키
    },
  ),
);
