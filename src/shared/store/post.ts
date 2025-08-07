// shared/store/post.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Post } from '@/entities/post/model/post';

interface PostStore {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  addPost: (post: Post) => void;
}

export const usePostStore = create(
  persist<PostStore>(
    (set) => ({
      posts: [],
      setPosts: (posts) => set({ posts }),
      addPost: (post) =>
        set((state) => ({
          posts: [post, ...state.posts],
        })),
    }),
    {
      name: 'post-storage', // localStorage에 저장될 키
    },
  ),
);
