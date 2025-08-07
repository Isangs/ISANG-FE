import { Post } from '@/entities/post/model/post';

export const mockPosts: Post[] = [
  {
    id: '1',
    author: '김민수',
    profileUrl: '/profile-kim.png',
    timeAgo: '2시간 전',
    badge: '30분 조깅 완료',
    content: '한강에서 30분 조깅 완료! 오늘도 목표 달성 💪',
    imageUrl: '/jogging.jpg',
    likeCount: 12,
    commentCount: 8,
  },
  {
    id: '2',
    author: '박지영',
    profileUrl: '/profile-park.png',
    timeAgo: '4시간 전',
    badge: '영어 단어 50개 암기',
    content: '',
    imageUrl: '/vocab.jpg',
    likeCount: 18,
    commentCount: 15,
  },
  {
    id: '4',
    author: '최서연',
    profileUrl: '/profile-choi.png',
    timeAgo: '8시간 전',
    badge: '요가 30분 수행',
    content: '',
    imageUrl: '/yoga.jpg',
    likeCount: 22,
    commentCount: 18,
  },
];
