export type Post = {
  id: number;
  taskMessage: string;
  profileImageUrl: string;
  hearts: number;
  isPublic: boolean;
  content: string;
  isPostLiked: boolean;
  isPostHearted: boolean;
  likes: number;
  createdAt: number[];
  user: {
    profileImageUrl: string;
    name: string;
  };
};
