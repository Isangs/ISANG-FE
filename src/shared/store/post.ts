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
      addPost: (post) => {
        // 할일 완료 API 호출

        // 피드 리스트 조회 API 호출 후 상태 업데이트
        set;

        set((state) => ({
          posts: [post, ...state.posts],
        }));
      },
    }),
    {
      name: 'post-storage', // localStorage에 저장될 키
    },
  ),
);
